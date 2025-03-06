import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function insertQuestions() {
  try {
    // Fetch all topics from the database
    const topics = await prisma.topic.findMany();

    // Sample questions with topicId dynamically mapped
    const questions = [
      // 1
      {
        qNo: 1,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Groot';\n  let age = 21;\n}\n\nsayHi();",
        options: {
          a: "Groot and undefined",
          b: "Groot and ReferenceError",
          c: "ReferenceError and 21",
          d: "undefined and ReferenceError",
        },
        correctOption: "d",
        explanation:
          "In the code, the `var` keyword for `name` is hoisted and initialized with `undefined`, so `console.log(name)` outputs `undefined`. The `let` keyword for `age` is also hoisted but is not initialized until its declaration is encountered, so accessing `age` before its declaration throws a ReferenceError.",
        topicId: topics.find((topic) => topic.name === "Hoisting")?.id,
        difficulty: "MEDIUM",
      },
      // 2
      {
        qNo: 2,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}",
        options: {
          a: "0 1 2 and 0 1 2",
          b: "0 1 2 and 3 3 3",
          c: "3 3 3 and 0 1 2",
        },
        correctOption: "c",
        explanation:
          "The first loop uses `var`, which is function-scoped, so by the time the `setTimeout` callback executes, `i` has already been incremented to 3. The second loop uses `let`, which is block-scoped, so each iteration of the loop has its own `i` variable, resulting in 0, 1, 2 being logged as expected.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 3
      {
        qNo: 3,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());",
        options: {
          a: "20 and 62.83185307179586",
          b: "20 and NaN",
          c: "20 and 63",
          d: "NaN and 63",
        },
        correctOption: "b",
        explanation:
          "The `diameter` method correctly calculates the diameter based on `this.radius`, so it outputs 20. The `perimeter` property is an arrow function, which does not have its own `this` context and inherits it from the outer scope (global in this case). Thus, `this.radius` is `undefined` and results in `NaN`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
      },
      // 4
      {
        qNo: 4,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet: "+true;\n!'Groot';",
        options: {
          a: "1 and false",
          b: "false and NaN",
          c: "false and false",
        },
        correctOption: "a",
        explanation:
          "The expression `+true` converts `true` to a number, which results in `1`. The expression `!'Groot'` converts the non-empty string 'Groot' to a boolean, and then applies the logical NOT operator, resulting in `false`.",
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
        difficulty: "EASY",
      },
      // 5
      {
        qNo: 5,
        question: "Which of the following expressions are valid?",
        codeSnippet:
          "const bird = {\n  size: 'small',\n};\n\nconst mouse = {\n  name: 'Mickey',\n  small: true,\n};",
        options: {
          a: "mouse.bird.size is not valid",
          b: "mouse[bird.size] is not valid",
          c: "mouse[bird['size']] is not valid",
          d: "All of them are valid",
        },
        correctOption: "a",
        explanation:
          "In the given code, `mouse.bird.size` is not valid because `bird` is an object and `mouse` does not have a property named `bird`. However, `mouse[bird.size]` and `mouse[bird['size']]` are valid expressions and will return `true` because `bird.size` evaluates to 'small', which is a valid property of the `mouse` object.",
        topicId: topics.find((topic) => topic.name === "OOP")?.id,
        difficulty: "MEDIUM",
      },
      // 6
      {
        qNo: 6,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);",
        options: {
          a: "Hello",
          b: "Hey!",
          c: "undefined",
          d: "ReferenceError",
          e: "TypeError",
        },
        correctOption: "a",
        explanation:
          "In the given code, `d` is assigned the same object reference as `c`. When `c.greeting` is changed to 'Hello', `d.greeting` also reflects this change because `d` points to the same object as `c`. Hence, `d.greeting` will output 'Hello'.",
        topicId: topics.find((topic) => topic.name === "OOP")?.id,
        difficulty: "EASY",
      },
      // 7
      {
        qNo: 7,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);",
        options: {
          a: "true false true",
          b: "false false true",
          c: "true false false",
          d: "false true true",
        },
        correctOption: "c",
        explanation:
          "In JavaScript, `a == b` is `true` because the `==` operator performs type coercion, so the `Number` object `b` is coerced to a primitive value for the comparison. However, `a === b` is `false` because `===` checks for both value and type, and `a` is a primitive number while `b` is an object. Finally, `b === c` is `false` because `b` is an object and `c` is a primitive number, so they are not strictly equal.",
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 8
      {
        qNo: 8,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "class Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = 'green' } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: 'purple' });\nconsole.log(freddie.colorChange('orange'));",
        options: {
          a: "orange",
          b: "purple",
          c: "green",
          d: "TypeError",
        },
        correctOption: "d",
        explanation:
          "The `colorChange` method is a static method, so it should be called on the class itself, not on an instance of the class. Calling it on the instance `freddie` results in a TypeError because `colorChange` is not a method of the instance.",
        topicId: topics.find((topic) => topic.name === "OOP")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 9
      {
        qNo: 9,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);",
        options: {
          a: "{}",
          b: "ReferenceError: greetign is not defined",
          c: "undefined",
        },
        correctOption: "a",
        explanation:
          "In the code, `greetign` is assigned an empty object, despite the typo. The variable `greetign` is not declared, but JavaScript will not throw a ReferenceError for undeclared variables assigned a value in this manner. The typo does not cause any runtime error and `console.log(greetign)` will output `{}`.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "EASY",
      },
      // 10
      {
        qNo: 10,
        question: "What will be the result of the following JavaScript code?",
        codeSnippet:
          "function bark() {\n  console.log('Woof!');\n}\n\nbark.animal = 'dog';",
        options: {
          a: "Nothing, this is totally fine!",
          b: "SyntaxError. You cannot add properties to a function this way.",
          c: '"Woof" gets logged.',
          d: "ReferenceError",
        },
        correctOption: "a",
        explanation:
          "In JavaScript, functions are objects and can have properties assigned to them. Adding `bark.animal = 'dog';` is valid and does not produce a SyntaxError. Therefore, the function `bark` can have a property `animal` with the value `'dog'` assigned to it. The `console.log('Woof!')` will still execute if the function is called, but it does not affect the function's property assignment.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 11
      {
        qNo: 11,
        question: "What are the three phases of event propagation?",
        codeSnippet: "",
        options: {
          a: "Target > Capturing > Bubbling",
          b: "Bubbling > Target > Capturing",
          c: "Target > Bubbling > Capturing",
          d: "Capturing > Target > Bubbling",
        },
        correctOption: "d",
        explanation:
          "In event propagation, the three phases are Capturing (or Capture phase), Target, and Bubbling. The event starts from the outermost element and captures down to the target element (Capturing phase), then it processes the event at the target element, and finally bubbles up from the target element to the outermost element (Bubbling phase).",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "EASY",
      },
      // 12
      {
        qNo: 12,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet: "function sum(a, b) {\n  return a + b;\n}\n\nsum(1, '2');",
        options: {
          a: "NaN",
          b: "TypeError",
          c: '"12"',
          d: "3",
        },
        correctOption: "c",
        explanation:
          "In JavaScript, when using the `+` operator with a number and a string, the number is coerced into a string, and concatenation occurs. Therefore, `1 + '2'` results in the string '12'.",
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
        difficulty: "EASY",
      },
      // 13
      {
        qNo: 13,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function getPersonInfo(one, two, three) {\n  console.log(one);\n  console.log(two);\n  console.log(three);\n}\n\nconst person = 'Groot';\nconst age = 21;\n\ngetPersonInfo`${person} is ${age} years old`;",
        options: {
          a: '"Groot" 21 ["", " is ", " years old"]',
          b: '["", " is ", " years old"] "Groot" 21',
          c: '"Groot" ["", " is ", " years old"] 21',
        },
        correctOption: "b",
        explanation:
          'In the code, `getPersonInfo`${person} is ${age} years old`` is using template literals. This syntax results in the first argument being an array of strings, while the subsequent arguments are the interpolated values. Therefore, `getPersonInfo` receives the array `["", " is ", " years old"]` as the first parameter and the values `"Groot"` and `21` as the subsequent parameters.',
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "MEDIUM",
      },
      // 14
      {
        qNo: 14,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function checkAge(data) {\n  if (data === { age: 18 }) {\n    console.log('You are an adult!');\n  } else if (data == { age: 18 }) {\n    console.log('You are still an adult.');\n  } else {\n    console.log(`Hmm.. You don't have an age I guess`);\n  }\n}\n\ncheckAge({ age: 18 });",
        options: {
          a: "You are an adult!",
          b: "You are still an adult.",
          c: "Hmm.. You don't have an age I guess",
        },
        correctOption: "c",
        explanation:
          "In JavaScript, objects are compared by reference, not by value. The condition `data === { age: 18 }` is always `false` because a new object is created each time, which will not be the same reference as the object passed in the function call. Similarly, `data == { age: 18 }` also fails for the same reason. Thus, the else block executes, printing `Hmm.. You don't have an age I guess`.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 15
      {
        qNo: 15,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function getAge(...args) {\n  console.log(typeof args);\n}\n\ngetAge(21);",
        options: {
          a: "number",
          b: "array",
          c: "object",
          d: "NaN",
        },
        correctOption: "c",
        explanation:
          "The `...args` syntax in the function parameters collects all arguments into an array. Thus, `typeof args` returns 'object' because arrays in JavaScript are a type of object.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "EASY",
      },
      // 16
      {
        qNo: 16,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function getAge() {\n  'use strict';\n  age = 21;\n  console.log(age);\n}\n\ngetAge();",
        options: {
          a: "21",
          b: "ReferenceError",
          c: "undefined",
          d: "TypeError",
        },
        correctOption: "b",
        explanation:
          "In strict mode, assigning a value to a variable that has not been declared will throw a `ReferenceError`. Here, `age` is not declared with `let`, `const`, or `var`, so it results in a `ReferenceError`.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "MEDIUM",
      },
      // 17
      {
        qNo: 17,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet: "const sum = eval('10*10+5');",
        options: {
          a: "105",
          b: '"105"',
          c: "TypeError",
          d: '"10*10+5"',
        },
        correctOption: "a",
        explanation:
          "The `eval` function evaluates the string expression '10*10+5' as a JavaScript expression and returns the result. In this case, it evaluates to 105.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 18
      {
        qNo: 18,
        question: "What is the lifespan of data stored in `sessionStorage`?",
        codeSnippet: "sessionStorage.setItem('cool_secret', 123);",
        options: {
          a: "Forever, the data doesn't get lost.",
          b: "When the user closes the tab.",
          c: "When the user closes the entire browser, not only the tab.",
          d: "When the user shuts off their computer.",
        },
        correctOption: "c",
        explanation:
          "Data stored in `sessionStorage` persists only for the duration of the page session, which lasts as long as the browser tab or window is open. When the user closes the entire browser or the tab, the data is cleared.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "EASY",
      },
      // 19
      {
        qNo: 19,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet: "var num = 8;\nvar num = 10;\n\nconsole.log(num);",
        options: {
          a: "8",
          b: "10",
          c: "SyntaxError",
          d: "ReferenceError",
        },
        correctOption: "b",
        explanation:
          "In JavaScript, using `var` allows for variable redeclaration within the same scope without causing an error. The second declaration overwrites the first one, so `num` will be `10` when logged.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "EASY",
      },
      // 20
      {
        qNo: 20,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const obj = { 1: 'a', 2: 'b', 3: 'c' };\nconst set = new Set([1, 2, 3, 4, 5]);\n\nobj.hasOwnProperty('1');\nobj.hasOwnProperty(1);\nset.has('1');\nset.has(1);",
        options: {
          a: "false true false true",
          b: "false true true true",
          c: "true true false true",
          d: "true true true true",
        },
        correctOption: "a",
        explanation:
          "For objects, `hasOwnProperty` checks for property names as strings. Thus, `obj.hasOwnProperty('1')` returns `false` because the key is a number, not a string. `obj.hasOwnProperty(1)` returns `true` as the property `1` exists. For sets, `set.has('1')` returns `false` because `'1'` (string) is not the same as `1` (number), and `set.has(1)` returns `true` because `1` is in the set.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "MEDIUM",
      },
      // 21
      {
        qNo: 21,
        question:
          "The JavaScript global execution context creates two things for you: the global object, and the 'this' keyword.",
        options: {
          a: "true",
          b: "false",
          c: "it depends",
        },
        correctOption: "a",
        explanation:
          "In JavaScript, the global execution context indeed creates the global object (e.g., `window` in browsers) and sets up the `this` keyword to refer to that global object. Therefore, the statement is true.",
        topicId: topics.find((topic) => topic.name === "Miscellaneous")?.id,
        difficulty: "EASY",
      },
      // 22
      {
        qNo: 22,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let counter = 0;\n\nfunction add() {\n  let counter = 0;\n  counter += 1;\n}\n\nconsole.log(add());",
        options: {
          a: "0",
          b: "1",
          c: "undefined",
          d: "ReferenceError",
        },
        correctOption: "c",
        explanation:
          "The function `add` defines a local variable `counter` which shadows the outer `counter` variable. Inside the function, the local `counter` is incremented but is not returned or logged. The `console.log(add())` statement logs the return value of `add`, which is `undefined` because `add` does not explicitly return any value.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "EASY",
      },
      // 23
      {
        qNo: 23,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function add() {\n  let counter = 0;\n\n  function plus() {\n    counter += 1;\n  }\n\n  plus();\n\n  return counter;\n}\n\nconsole.log(add());\nconsole.log(add());\nconsole.log(add());",
        options: {
          a: "1 1 1",
          b: "1 2 3",
          c: "0 0 0",
          d: "1 1 1 1",
        },
        correctOption: "a",
        explanation:
          "Each call to the `add` function creates a new `counter` variable initialized to `0`. The `plus` function increments this local `counter` by `1`, so each call to `add` returns `1`. As a result, each `console.log(add())` prints `1`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "EASY",
      },
      // 24
      {
        qNo: 24,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const add = (function () {\n  let counter = 0;\n  return function () {\n    counter += 1;\n    return counter;\n  };\n})();\n\nconsole.log(add());\nconsole.log(add());\nconsole.log(add());",
        options: {
          a: "1 1 1",
          b: "0 1 2",
          c: "1 2 3",
          d: "0 0 0",
        },
        correctOption: "c",
        explanation:
          "The `add` function is a closure that retains the `counter` variable's state between calls. Each time `add()` is invoked, `counter` is incremented by `1` and returned. Therefore, the first call logs `1`, the second call logs `2`, and the third call logs `3`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "EASY",
      },
      // 25
      {
        qNo: 25,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function init1 () {\n  var name = 'Mozilla';\n\n  function displayName () {\n    console.log(name); \n  }\n\n  displayName();\n}\n\ninit1();\n\nvar userName = 'John';\n\nfunction init2 () {\n  var name = 'Mozilla';\n\n  function displayName (num) {\n    console.log(name, num, userName);\n  }\n\n  return displayName;\n}\n\ninit2()(2);",
        options: {
          a: "Mozilla\nMozilla 2 John",
          b: "Mozilla\nMozilla 2 undefined",
          c: "undefined\nundefined John",
          d: "undefined\nundefined undefined",
        },
        correctOption: "a",
        explanation:
          "In `init1`, `name` is logged from the inner function `displayName`, which outputs 'Mozilla'. In `init2`, `name` is logged along with the `num` argument and the global `userName`. Since `init2` is called with `(2)`, it logs 'Mozilla 2 John'.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 26
      {
        qNo: 26,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function makeAdder (x) {\n  return function (y) {\n    return x + y;\n  };\n}\n\nconst add5 = makeAdder(5);\nconst add10 = makeAdder(10);\n\nconsole.log(add5(2));\nconsole.log(add10(2));",
        options: {
          a: "5\n10",
          c: "7\n7",
          d: "10\n12",
          d: "7\n12",
        },
        correctOption: "d",
        explanation:
          "The `makeAdder` function creates a closure that remembers the value of `x`. When `add5` is called with `2`, it adds `5` to `2`, resulting in `7`. Similarly, when `add10` is called with `2`, it adds `10` to `2`, resulting in `12`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "EASY",
      },
      // 27
      {
        qNo: 27,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const e = 10;\n\nfunction sum (a) {\n  return function (b) {\n    return function (c) {\n      return function (d) {\n        return a + b + c + d + e;\n      };\n    };\n  };\n}\n\nconsole.log(sum(1)(2)(3)(4));",
        options: {
          a: "10",
          b: "20",
          c: "30",
          d: "40",
        },
        correctOption: "b",
        explanation:
          "The function `sum` creates a series of nested functions that each take a parameter and return a new function. When `sum(1)(2)(3)(4)` is evaluated, it calculates `1 + 2 + 3 + 4 + 10`, which results in `20`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 28
      {
        qNo: 28,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let count = 0;\n\n(function printCount () {\n  if (count == 0) {\n    let count = 1;\n    console.log(count);\n  }\n  console.log(count);\n})();",
        options: {
          a: "0 0",
          b: "1 0",
          c: "0 1",
          d: "1 1",
        },
        correctOption: "b",
        explanation:
          "Inside the `printCount` function, the `let count = 1` creates a block-scoped variable `count` that shadows the outer `count` variable. Therefore, the first `console.log(count)` prints `1`. The second `console.log(count)` prints `0` because it refers to the outer `count` variable.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "MEDIUM",
      },
      // 29
      {
        qNo: 29,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "for (var i = 0; i < 5; i++) {\n  function wrap (i) {\n    setTimeout(function () {\n      console.log(i)\n    }, i * 1000)\n  }\n  wrap(i)\n}",
        options: {
          a: "0 1 2 3 4, each after 1 second",
          b: "0 1 2 3 4, all at once after 5 seconds",
          c: "4 4 4 4 4, each after 1 second",
          d: "0 1 2 3 4, each after increasing intervals",
        },
        correctOption: "a",
        explanation:
          "The code uses a `for` loop with a `var` declaration for `i`, but the function `wrap` creates a new scope for each iteration, passing the current value of `i` to `setTimeout`. This means that the value of `i` is captured correctly for each iteration, and the numbers 0 through 4 are printed at increasing intervals (0s, 1s, 2s, 3s, 4s).",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 30
      {
        qNo: 30,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "var num = 10;\n\nvar add = function () {\n  console.log(num); // undefined\n\n  var num = 20;\n};\n\nadd();",
        options: {
          a: "10",
          b: "20",
          c: "undefined",
          d: "ReferenceError",
        },
        correctOption: "c",
        explanation:
          "Due to JavaScript's hoisting behavior, the `var num` declaration inside the `add` function is hoisted to the top of its scope. However, the assignment (`num = 20`) is not hoisted. As a result, the `console.log(num)` prints `undefined` because the variable `num` is declared but not yet assigned a value.",
        topicId: topics.find((topic) => topic.name === "Hoisting")?.id,
        difficulty: "EASY",
      },
      // 31
      {
        qNo: 31,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "var a = 10;\na = 20;\nconsole.log(a);\n\nlet b = 10;\nb = 20;\nconsole.log(b);\n\nconst c = 10;\nc = 20;\nconsole.log(c);",
        options: {
          a: "20 20 20",
          b: "10 10 10",
          c: "20 20 TypeError",
          d: "20 10 TypeError",
        },
        correctOption: "c",
        explanation:
          "Variables declared with `var` and `let` can be reassigned, so `a` and `b` both change to 20, and their values are printed. However, variables declared with `const` cannot be reassigned after their initial assignment, so attempting to assign a new value to `c` results in a `TypeError`.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "EASY",
      },
      // 32
      {
        qNo: 32,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "console.log(d);\n\nconsole.log(e);\nlet e = 10;\n\nconsole.log(g);\nconst g = 20;\n\nconsole.log(f);\nvar f = 10;",
        options: {
          a: "ReferenceError, ReferenceError, ReferenceError, undefined",
          b: "undefined, ReferenceError, ReferenceError, undefined",
          c: "ReferenceError, ReferenceError, ReferenceError, undefined",
          d: "undefined, 10, 20, undefined",
        },
        correctOption: "c",
        explanation:
          "Variables declared with `let` and `const` are hoisted but not initialized, leading to a `ReferenceError` if accessed before initialization. `var` is hoisted and initialized with `undefined`, so `console.log(f)` will print `undefined`. However, `d`, `e`, and `g` will all throw a `ReferenceError` since they are not defined before they are logged.",
        topicId: topics.find((topic) => topic.name === "Hoisting")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 33
      {
        qNo: 33,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function add (a) {\n  return function (b) {\n    if (b) return add(a + b)\n    else return a\n  }\n}\n\nconsole.log(add(1)(2)(3)(4)(5)())",
        options: {
          a: "NaN",
          b: "undefined",
          c: "15",
          d: "Error",
        },
        correctOption: "c",
        explanation:
          "The function `add` uses recursion and closure to keep adding values together. When `add(1)(2)(3)(4)(5)()` is called, the result is 15 because the function continues adding the arguments until `b` is `undefined`, at which point it returns the accumulated sum `a`.",
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
        difficulty: "MEDIUM",
      },
      // 34
      {
        qNo: 34,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const user = {\n  name: 'John',\n  age: 30\n}\n\nconsole.log(user.name)\nconsole.log(user['age'])\n\nuser.name = 'John'\n\nconsole.log(user.name)\n\ndelete user.age\n\nconsole.log(user)",
        options: {
          a: "'John', 30, 'John', { name: 'John' }",
          b: "'John', 30, 'John', { name: 'John', age: 30 }",
          c: "'John', 30, 'John', { age: 30 }",
          d: "Error",
        },
        correctOption: "a",
        explanation:
          "The code first logs the `name` and `age` properties of the `user` object, which are 'John' and 30, respectively. The `name` property is then updated to 'John'. Finally, the `age` property is deleted, so the `user` object only contains the `name` property with the value 'John'.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 35
      {
        qNo: 35,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const func = (function (a) {\n  delete a\n  return a\n})(5)\n\nconsole.log(func)",
        options: {
          a: "undefined",
          b: "null",
          c: "5",
          d: "Error",
        },
        correctOption: "c",
        explanation:
          "In JavaScript, `delete` is used to remove properties from objects, not to delete local variables or function parameters. Therefore, `delete a` does nothing in this case, and `a` retains its value of 5, which is returned and logged.",
        topicId: topics.find((topic) => topic.name === "Variables and Scope")
          ?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 36
      {
        qNo: 36,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const user = {\n  'first name': 'John'\n}\n\nconsole.log(user['first name'])\n\ndelete user['first name']",
        options: {
          a: "John",
          b: "undefined",
          c: "null",
          d: "Error",
        },
        correctOption: "a",
        explanation:
          "The code defines an object `user` with a property `first name` and assigns it the value `'John'`. The value of `user['first name']` is logged, which outputs `'John'`. The `delete` statement then removes the `first name` property from the object, but this action does not produce any output.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 37
      {
        qNo: 37,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let property = 'firstName'\nlet value = 'John'\n\nlet person = {\n  [property]: value\n}\n\nconsole.log(person)\nconsole.log(person.firstName)\nconsole.log(person[property])",
        options: {
          a: "{ firstName: 'John' } \n undefined \n undefined",
          b: "{ firstName: 'John' } \n undefined \n John",
          c: "{ firstName: 'John' } \n John \n undefined",
          d: "{ firstName: 'John' } \n John \n John",
        },
        correctOption: "d",
        explanation:
          "The `person` object is created with a property `firstName` whose value is `'John'`, using computed property names. `console.log(person)` outputs the whole object `{ firstName: 'John' }`. `console.log(person.firstName)` outputs the value of the `firstName` property, which is `'John'`. `console.log(person[property])` also accesses the `firstName` property using the variable `property`, which is `'firstName'`, so it also outputs `'John'`. Hence, all outputs are `'John'`.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 38
      {
        qNo: 38,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let user = {\n  name: 'John',\n  age: 30\n}\n\nfor (let key in user) {\n  console.log(key) \n  console.log(user[key]) \n}",
        options: {
          a: "name \n John \n age \n 30",
          b: "John \n name \n 30 \n age",
          c: "name \n age \n John \n 30",
          d: "John \n age \n name \n 30",
        },
        correctOption: "a",
        explanation:
          "The `for...in` loop iterates over the enumerable properties of the `user` object. It first logs the property key (e.g., `name`), then logs the value associated with that key (e.g., `John`). This happens for each property in the object. Therefore, it prints `name` and `John`, followed by `age` and `30`.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 39
      {
        qNo: 39,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const obj = { a: 'one', b: 'two', a: 'three' }\nconsole.log(obj)",
        options: {
          a: "{ a: 'one', b: 'two' }",
          b: "{ a: 'three', b: 'two' }",
          c: "{ a: 'three' }",
          d: "{ a: 'one', b: 'two', a: 'three' }",
        },
        correctOption: "b",
        explanation:
          "In JavaScript, if an object literal contains duplicate keys, the last value assigned to that key will overwrite the previous values. Therefore, the `a` key's value is overwritten by `'three'`, resulting in the final object `{ a: 'three', b: 'two' }`.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 40
      {
        qNo: 40,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "let nums = {\n  a: 100,\n  b: 200,\n  title: 'My nums'\n}\n\nfunction multiply (obj) {\n  for (let key in obj) {\n    if (typeof obj[key] === 'number') {\n      obj[key] *= 2\n    }\n  }\n}\n\nmultiply(nums)\n\nconsole.log(nums)",
        options: {
          a: "{ a: 200, b: 400, title: 'My nums' }",
          b: "{ a: 100, b: 200, title: 'My nums' }",
          c: "{ a: 200, b: 200, title: 'My nums' }",
          d: "{ a: 100, b: 400, title: 'My nums' }",
        },
        correctOption: "a",
        explanation:
          "The `multiply` function iterates over each property of the `nums` object. It checks if the value of each property is a number and, if so, multiplies it by 2. Therefore, `a` and `b` are multiplied by 2, resulting in `{ a: 200, b: 400, title: 'My nums' }`. The `title` property remains unchanged because it's a string.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "EASY",
      },
      // 41
      {
        qNo: 41,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const a = {}\nconst b = { key: 'b' }\nconst c = { key: 'c' }\n\na[b] = 123\n\nconsole.log(a)\n\na[c] = 456\n\nconsole.log(a)\nconsole.log(a[b])",
        options: {
          a: "{ '[object Object]': 123 } { '[object Object]': 456 } 456",
          b: "{ '[object Object]': 456 } { '[object Object]': 456 } 123",
          c: "{ '[object Object]': 123 } { '[object Object]': 123 } 123",
          d: "{ '[object Object]': 456 } { '[object Object]': 456 } undefined",
        },
        correctOption: "a",
        explanation:
          "In JavaScript, object keys are always converted to strings. When you use objects `b` and `c` as keys, they are converted to the string '[object Object]'. Therefore, when `a[b]` is set to 123, it sets `a['[object Object]']` to 123. When `a[c]` is set to 456, it overwrites the same key '[object Object]' with the value 456. Hence, `a[b]` retrieves the value 456.",
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
        difficulty: "HARD",
        isPremium: true,
      },
      // 42
      {
        qNo: 42,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "function Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst member = new Person('Groot', 'Hallie');\nPerson.getFullName = function() {\n  return `${this.firstName} ${this.lastName}`;\n};\n\nconsole.log(member.getFullName());",
        options: {
          a: "TypeError",
          b: "SyntaxError",
          c: "Groot Hallie",
          d: "undefined undefined",
        },
        correctOption: "a",
        explanation:
          "The method `getFullName` is added to the `Person` constructor function, not to the instances of `Person`. When `member.getFullName()` is called, it attempts to access `this.firstName` and `this.lastName` from the `Person` function context rather than from the `member` instance. This results in a `TypeError` because `this.firstName` and `this.lastName` are not defined in the context of the `getFullName` method.",
        topicId: topics.find((topic) => topic.name === "this Keyword")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 43
      {
        qNo: 43,
        question: "What will be the output of the following JavaScript code?",
        codeSnippet:
          "const shape = {\n  radius: 10,\n  diameter () {\n    return this.radius * 2\n  },\n  perimeter: () => 2 * Math.PI * this.radius\n}\n\nconsole.log(shape.diameter())\nconsole.log(shape.perimeter())",
        options: {
          a: "20 NaN",
          b: "20 62.83185307179586",
          c: "NaN NaN",
          d: "20 NaN",
        },
        correctOption: "a",
        explanation:
          "In the `shape` object, the `diameter` method is a regular function and correctly uses `this` to access the `radius` property, so it returns `20`. The `perimeter` method is an arrow function, which does not have its own `this` context. Instead, it inherits `this` from its surrounding context, which is not the `shape` object. Therefore, `this.radius` is `undefined`, leading to `NaN` when calculating the perimeter.",
        topicId: topics.find((topic) => topic.name === "this Keyword")?.id,
        difficulty: "MEDIUM",
        isPremium: true,
      },
      // 44
      {
        qNo: 44,
        question: "What is a closure in JavaScript?",
        codeSnippet: `function outer() {\n let outerVar = 'I am outer'; \n return function inner() {\n console.log(outerVar) \n}
    }`,
        options: {
          a: "A function that has access to variables from its outer function even after the outer function has finished executing.",
          b: "A function that cannot access variables from outside its own scope.",
          c: "A function that is passed as an argument to another function.",
          d: "A function that returns another function.",
        },
        correctOption: "a",
        explanation:
          "A closure allows a function to access variables from its outer function after the outer function has executed.",
        difficulty: "MEDIUM",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
      },
      // 45
      {
        qNo: 45,
        question: "What is the output of the following code?",
        codeSnippet: `function outer() {\n  let outerVar = 'I am outer';\n  function inner() {\n    console.log(outerVar);\n  }\n  return inner;\n}\nconst closure = outer();\nclosure();`,
        options: {
          a: "undefined",
          b: "I am outer",
          c: "ReferenceError",
          d: "null",
        },
        correctOption: "b",
        explanation:
          "The inner function has access to `outerVar` even after the `outer` function has finished executing, due to closure.",
        difficulty: "MEDIUM",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Closures")?.id,
      },
      // 46
      {
        qNo: 46,
        question: "What is a constructor function in JavaScript?",
        codeSnippet: `function Person(name, age) {\n this.name = name; \n this.age = age; \n}`,
        options: {
          a: "A function that creates new objects.",
          b: "A function that defines a class.",
          c: "A function that is called when an object is instantiated.",
          d: "Both A and C.",
        },
        correctOption: "d",
        explanation:
          "A constructor function is used to create objects and can be used with the `new` keyword.",
        difficulty: "MEDIUM",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "OOP")?.id,
      },
      // 47
      {
        qNo: 47,
        question: "What will the following code log?",
        codeSnippet: `function Person(name, age) {\n  this.name = name;\n  this.age = age;\n}\nconst person1 = new Person('John', 25);\nconsole.log(person1.name);`,
        options: {
          a: "undefined",
          b: "John",
          c: "this",
          d: "null",
        },
        correctOption: "b",
        explanation:
          "The `new` keyword invokes the constructor function and assigns `name` and `age` properties to the new object.",
        difficulty: "EASY",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "OOP")?.id,
      },
      // 48
      {
        qNo: 48,
        question: "What will be the output of the following code?",
        codeSnippet: `let obj = {\n  name: 'John',\n  getName: function() {\n    return this.name;\n  }\n};\nconsole.log(obj.getName());`,
        options: {
          a: "undefined",
          b: "John",
          c: "this",
          d: "null",
        },
        correctOption: "b",
        explanation:
          "The `this` keyword refers to the object (`obj`) when accessed within a method of that object.",
        difficulty: "EASY",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "this Keyword")?.id,
      },
      // 49
      {
        qNo: 49,
        question: "What will be the output of the following code?",
        codeSnippet: `let obj = {\n  name: 'John',\n  getName: () => {\n    return this.name;\n  }\n};\nconsole.log(obj.getName());`,
        options: {
          a: "undefined",
          b: "John",
          c: "this",
          d: "null",
        },
        correctOption: "a",
        explanation:
          "In arrow functions, `this` is lexically bound to the surrounding context (the global object in this case).",
        difficulty: "MEDIUM",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "this Keyword")?.id,
      },
      // 50
      {
        qNo: 50,
        question: "What is the output of the following promise code?",
        codeSnippet: `let promise = new Promise((resolve, reject) => {\n  resolve('Hello World');\n});\npromise.then((message) => {\n  console.log(message);`,
        options: {
          a: "undefined",
          b: "Hello World",
          c: "Promise",
          d: "null",
        },
        correctOption: "b",
        explanation:
          "The promise resolves with 'Hello World', and the `then` method logs it to the console.",
        difficulty: "EASY",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Promises")?.id,
      },
      // 51
      {
        qNo: 51,
        question: "What will the following code log?",
        codeSnippet: `function fetchData(callback) {\n  setTimeout(() => {\n    callback('Data loaded');\n  }, 1000);\n}\nfetchData(function(message) {\n  console.log(message);`,
        options: {
          a: "undefined",
          b: "Data loaded",
          c: "null",
          d: "Error",
        },
        correctOption: "b",
        explanation:
          "The `fetchData` function uses a callback and after 1 second, it logs 'Data loaded'.",
        difficulty: "EASY",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Callbacks")?.id,
      },
      // 52
      {
        qNo: 52,
        question: "What will the following code output?",
        codeSnippet: `console.log([] + []);`,
        options: {
          a: "[]",
          b: "''",
          c: "undefined",
          d: "TypeError",
        },
        correctOption: "b",
        explanation:
          "When using the `+` operator with arrays, JavaScript converts them to strings. An empty array converts to an empty string, so `[] + []` results in `''`.",
        difficulty: "HARD",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
      },

      // 53
      {
        qNo: 53,
        question: "What will the following code log?",
        codeSnippet: `const a = {}\nconst b = { key: 'b' }\nconst c = { key: 'c' }\na[b] = 123\na[c] = 456\nconsole.log(a[b]);`,
        options: {
          a: "123",
          b: "456",
          c: "undefined",
          d: "Error",
        },
        correctOption: "b",
        explanation:
          "When using objects as keys in another object, JavaScript converts the object keys to strings (`[object Object]`). Both `b` and `c` become the same key, so `a[b]` is overwritten by `a[c]`.",
        difficulty: "HARD",
        isPremium: true,
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
      },

      // 54
      {
        qNo: 54,
        question: "What will the following code output?",
        codeSnippet: `let x = 1;\nif (function f() {}) {\n  x += typeof f;\n}\nconsole.log(x);`,
        options: {
          a: "1undefined",
          b: "1function",
          c: "Error",
          d: "1",
        },
        correctOption: "a",
        explanation:
          "The function `f` is declared inside the `if` condition, which is truthy. However, `f` is not accessible outside the `if` block, so `typeof f` returns `'undefined'`.",
        difficulty: "HARD",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Functions")?.id,
      },
      // 55
      {
        qNo: 55,
        question: "What will the following code log?",
        codeSnippet: `console.log(typeof null, typeof undefined, null === undefined);`,
        options: {
          a: "object, undefined, true",
          b: "object, undefined, false",
          c: "null, undefined, true",
          d: "null, undefined, false",
        },
        correctOption: "b",
        explanation:
          "`typeof null` returns `'object'` due to a historical bug in JavaScript. `typeof undefined` returns `'undefined'`. `null === undefined` is `false` because they are different types.",
        difficulty: "HARD",
        isPremium: true,
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
      },

      // 56
      {
        qNo: 56,
        question: "What will the following code output?",
        codeSnippet: `const arr = [1, 2, 3];\narr[10] = 99;\nconsole.log(arr[6]);`,
        options: {
          a: "undefined",
          b: "null",
          c: "6",
          d: "Error",
        },
        correctOption: "a",
        explanation:
          "When you set an index beyond the current length of the array, JavaScript fills the gaps with empty slots. Accessing these slots returns `undefined`.",
        difficulty: "HARD",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Arrays")?.id,
      },

      // 57
      {
        qNo: 57,
        question: "What will the following code log?",
        codeSnippet: `console.log(0.1 + 0.2 === 0.3);`,
        options: {
          a: "true",
          b: "false",
          c: "NaN",
          d: "Error",
        },
        correctOption: "b",
        explanation:
          "Due to floating-point precision errors in JavaScript, `0.1 + 0.2` does not equal `0.3` exactly.",
        difficulty: "HARD",
        isPremium: true,
        topicId: topics.find((topic) => topic.name === "Type Coercion")?.id,
      },

      // 58
      {
        qNo: 58,
        question: "What will the following code output?",
        codeSnippet: `const obj = {\n  a: 1,\n  b: 2,\n  getA() {\n    console.log(this.a);\n  },\n  getB() {\n    console.log(this.b);\n  },\n};\nobj.getA().getB();`,
        options: {
          a: "1, 2",
          b: "undefined, undefined",
          c: "1, TypeError",
          d: "TypeError",
        },
        correctOption: "c",
        explanation:
          "`obj.getA()` logs `1`, but it returns `undefined`, so calling `getB()` on `undefined` throws a TypeError.",
        difficulty: "HARD",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "this Keyword")?.id,
      },

      // 59
      {
        qNo: 59,
        question: "What will the following code log?",
        codeSnippet: `const arr = [1, 2, 3];\narr.forEach(async (num) => {\n  await Promise.resolve();\n  console.log(num);\n});\nconsole.log('Done');`,
        options: {
          a: "1, 2, 3, Done",
          b: "Done, 1, 2, 3",
          c: "1, Done, 2, 3",
          d: "Done",
        },
        correctOption: "b",
        explanation:
          "The `forEach` loop does not wait for the `await` inside it, so 'Done' is logged first, followed by the numbers.",
        difficulty: "HARD",
        isPremium: true,
        topicId: topics.find((topic) => topic.name === "Event Loop")?.id,
      },

      // 60
      {
        qNo: 60,
        question: "What will the following code output?",
        codeSnippet: `const obj = {\n  a: 1,\n  b: 2,\n};\nObject.freeze(obj);\nobj.a = 3;\nconsole.log(obj.a);`,
        options: {
          a: "1",
          b: "3",
          c: "undefined",
          d: "Error",
        },
        correctOption: "a",
        explanation:
          "`Object.freeze` prevents modifications to the object, so `obj.a` remains `1`.",
        difficulty: "HARD",
        isPremium: false,
        topicId: topics.find((topic) => topic.name === "Objects")?.id,
      },

      // 61
      {
        qNo: 61,
        question: "What will the following code log?",
        codeSnippet: `const arr = [1, 2, 3];\nconst [x, , y] = arr;\nconsole.log(x, y);`,
        options: {
          a: "1, 2",
          b: "1, 3",
          c: "2, 3",
          d: "Error",
        },
        correctOption: "b",
        explanation:
          "Array destructuring assigns `x` to the first element (`1`) and `y` to the third element (`3`). The second element is skipped.",
        difficulty: "HARD",
        isPremium: true,
        topicId: topics.find((topic) => topic.name === "Arrays")?.id,
      },
    ];

    //Check if topicId is undefined and log
    questions.forEach((question, index) => {
      if (!question.topicId) {
        console.log(question.options);
        console.log(
          `Topic not found for question at index ${index}:`,
          question.question
        );
      }
    });

    // Filter out questions with invalid or missing topicId
    const validQuestions = questions.filter((question) => question.topicId);

    // Insert the valid questions into the database
    if (validQuestions.length > 0) {
      await prisma.question.createMany({
        data: validQuestions, // Pass the valid questions under the `data` key
      });
      console.log(`${validQuestions.length} questions inserted successfully!`);
    }
  } catch (err) {
    console.error("Error inserting questions:", err);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

insertQuestions();
