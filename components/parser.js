/**
 * Parses a stream of tokens into an Abstract Syntax Tree (AST) representing the program structure.
 * @param {array} tokens - An array of tokens to be parsed.
 * @returns {object} - The parsed Abstract Syntax Tree (AST) representing the program.
 * @throws {TypeError} - If an unknown or unexpected token is encountered during parsing.
 */
module.exports = function parser(tokens) {
  let current = 0;

  /**
   * Recursive function to walk through the tokens and construct the AST.
   * @returns {object} - The AST node corresponding to the current token.
   * @throws {TypeError} - If an unknown or unexpected token is encountered.
   */
  function walk() {
    let token = tokens[current];
    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      const expression = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (token.value !== ")") {
        expression.params.push(walk());
        token = tokens[current];
      }
      current++;
      return expression;
    }
    throw new TypeError(`Unknown token: '${token}'`);
  }

  // Construct the AST with the root Program node
  const ast = {
    type: "Program",
    body: [walk()],
  };

  return ast;
};
