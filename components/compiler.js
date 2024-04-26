/**
 * Compiler function that processes input code through a series of steps:
 * 1. Tokenization using the provided tokenizer module.
 * 2. Parsing the tokens into a Lisp Abstract Syntax Tree (AST) using the parser module.
 * 3. Transforming the Lisp AST into a JavaScript AST using the transformer module.
 * 4. Generating JavaScript code from the transformed AST using the generateCode module.
 * @param {string} input - The input code to be compiled.
 * @returns {string} - The compiled JavaScript code.
 */
const tokenizer = require("../components/tokenizer");
const parser = require("../components/parser");
const transformer = require("../components/transformer");
const generateCode = require("../components/generateCode");

module.exports = function compiler(input) {
  const tokens = tokenizer(input); // Tokenize the input code
  const lispAST = parser(tokens); // Parse tokens into a Lisp AST
  const jsAST = transformer(lispAST); // Transform Lisp AST to JavaScript AST
  return generateCode(jsAST); // Generate JavaScript code from AST
};
