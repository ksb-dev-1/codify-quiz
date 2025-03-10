"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function fetchTopicsFromDB(userId: string) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const topics = await prisma.topic.findMany({
    select: { id: true, name: true },
  });

  return { success: true, topics };
}

// Cached function
const fetchTopicsServerAction = unstable_cache(
  fetchTopicsFromDB,
  ["topics"], // This is the tag that must match in revalidateTag
  {
    revalidate: false, // Keeps data cached indefinitely
    tags: ["topics"], // Explicitly add tags
  }
);

export default fetchTopicsServerAction;
