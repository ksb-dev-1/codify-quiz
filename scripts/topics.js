import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Array of topics to be inserted
const topics = [
  {
    name: "Hoisting",
    description:
      "Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their scope before code execution. This means you can use functions and variables before declaring them in the code. However, only the declarations are hoisted, not the initializations (assignments).",
  },
  {
    name: "Type Coercion",
    description:
      "Type coercion is JavaScript’s automatic conversion of values from one data type to another when performing operations. It happens implicitly when different types are used together.",
  },
  {
    name: "Closures",
    description:
      "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.",
  },
  {
    name: "OOP",
    description:
      "Object-Oriented Programming (OOP) is a paradigm based on the concept of objects, which can contain data and methods.",
  },
  {
    name: "this Keyword",
    description:
      "The `this` keyword refers to the context in which a function is executed. Its value is determined by how a function is called.",
  },
  {
    name: "Variables and Scope",
    description:
      "Scope refers to the region of a program where a variable is defined and accessible. JavaScript has function scope and block scope.",
  },
  {
    name: "Objects",
    description:
      "Objects in JavaScript are collections of key-value pairs where each key is a string (or Symbol) and each value can be any data type.",
  },
  {
    name: "Promises",
    description:
      "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
  },
  {
    name: "Callbacks",
    description:
      "A callback function is a function passed into another function as an argument and is executed after the completion of that function's execution.",
  },
  {
    name: "Arrays",
    description:
      "Arrays are ordered collections of values, which can be accessed by index and can store values of different data types.",
  },
  {
    name: "AJAX",
    description:
      "Asynchronous programming allows non-blocking code execution, enabling operations like I/O to run concurrently without halting the execution of other operations.",
  },
  {
    name: "Event Loop",
    description:
      "The event loop is a fundamental concept in JavaScript that handles asynchronous callbacks and allows JavaScript to perform non-blocking I/O operations.",
  },
  {
    name: "Miscellaneous",
    description: "These are some miscellaneous questions.",
  },
];

// Function to insert topics into the database
async function addTopics() {
  try {
    let insertedCount = 0;

    // Loop through each topic and insert it if it doesn't already exist
    for (const topic of topics) {
      const existingTopic = await prisma.topic.findUnique({
        where: { name: topic.name },
      });

      if (!existingTopic) {
        await prisma.topic.create({
          data: topic,
        });
        insertedCount++;
      }
    }

    console.log(`${insertedCount} topics inserted successfully!`);
  } catch (error) {
    console.error("Error inserting topics:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

// Run the function
addTopics();
