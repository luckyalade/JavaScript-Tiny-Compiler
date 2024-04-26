/**
 * Tokenizes the input string into tokens based on predefined patterns.
 * @param {string} input - The input string to tokenize.
 * @returns {Array} - An array of tokens representing different parts of the input.
 * @throws {TypeError} - If an unknown character is encountered during tokenization.
 */
module.exports = function tokenizer(input) {
  const LETTERS = /[a-z]/i; // Regular expression pattern for letters
  const WHITESPACE = /\s/; // Regular expression pattern for whitespace
  const NUMBERS = /\d/; // Regular expression pattern for numbers
  const OPERATORS = /[+\-*\/]/; // Regular expression pattern for operators (add more operators if needed)

  const tokens = [];
  let current = 0;

  while (current < input.length) {
    let char = input[current];

    if (char === "(" || char === ")") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }

    if (LETTERS.test(char)) {
      let value = "";
      while (current < input.length && LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "name",
        value,
      });
      continue;
    }

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (NUMBERS.test(char)) {
      let value = "";
      while (current < input.length && NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }

    if (OPERATORS.test(char)) {
      tokens.push({
        type: "operator",
        value: char,
      });
      current++;
      continue;
    }

    throw new TypeError(`Unknown char: '${char}'`);
  }

  return tokens;
};
