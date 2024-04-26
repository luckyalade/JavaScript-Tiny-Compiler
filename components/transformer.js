/**
 * Transformer function that converts an original AST (Abstract Syntax Tree) into a JavaScript AST.
 * This transformation involves mapping specific node types from the original AST to JavaScript AST nodes.
 * @param {object} originalAST - The original Abstract Syntax Tree to be transformed.
 * @returns {object} - The transformed JavaScript Abstract Syntax Tree.
 */

const traverse = require("./traverse");
module.exports = function transformer(originalAST) {
  const jsAST = {
    type: "Program",
    body: [],
  };

  let position = jsAST.body;

  /**
   * Traverses the original AST and maps node types to JavaScript AST nodes.
   * @param {object} node - The current node being processed during traversal.
   * @param {object} parent - The parent node of the current node being processed.
   */
  traverse(originalAST, {
    /**
     * Maps NumberLiteral nodes to NumericLiteral nodes in JavaScript AST.
     * @param {object} node - NumberLiteral node from the original AST.
     */
    NumberLiteral(node) {
      position.push({
        type: "NumericLiteral",
        value: node.value,
      });
    },
    /**
     * Maps CallExpression nodes to CallExpression or ExpressionStatement nodes in JavaScript AST.
     * @param {object} node - CallExpression node from the original AST.
     * @param {object} parent - The parent node of the CallExpression node.
     */
    CallExpression(node, parent) {
      let expression = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: node.name,
        },
        arguments: [],
      };
      const prevPosition = position;
      position = expression.arguments;
      if (parent.type !== "CallExpression") {
        expression = {
          type: "ExpressionStatement",
          expression,
        };
      }
      prevPosition.push(expression);
    },
  });

  return jsAST;
};
