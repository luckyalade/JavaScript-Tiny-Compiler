/**
 * The main entry point for the compiler program.
 * It compiles the input code using the compiler module and logs the output and input to the console.
 * @module main
 */

// Import the compiler module
const compiler = require("./components/compiler");

// Define the input code to be compiled
const input = "(multiply 10 (divide 5 9))";

// Compile the input code using the compiler module
const output = compiler(input);

// Log the compiled output to the console
console.log("\nLisp Statement: " + input + ".");

// Log the original input code to the console
console.log("JavaScript Equivalent: " + input + ".\n");
