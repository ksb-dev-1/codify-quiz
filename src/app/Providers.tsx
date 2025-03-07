"use client";

import ProgressBar from "@/components/ProgressBar";
// 3rd party libraries
import { SessionProvider } from "next-auth/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      <ProgressBar />
      {children}
      <Toaster />
      {/* </QueryClientProvider> */}
    </SessionProvider>
  );
}
