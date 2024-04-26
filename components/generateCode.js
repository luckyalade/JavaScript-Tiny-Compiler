/**
 * Generates JavaScript code from an Abstract Syntax Tree (AST) node.
 * @param {object} node - The AST node for which code needs to be generated.
 * @returns {string} - The generated JavaScript code corresponding to the AST node.
 */
module.exports = function generateCode(node) {
  if (node.type === "NumericLiteral") {
    return node.value.toString(); // Convert numeric value to string
  }
  if (node.type === "Identifier") {
    return node.name; // Return the identifier name
  }
  if (node.type === "CallExpression") {
    // Generate code for the callee and arguments of the CallExpression
    return `${generateCode(node.callee)}(${node.arguments
      .map(generateCode)
      .join(", ")})`;
  }
  if (node.type === "ExpressionStatement") {
    // Generate code for the expression inside the ExpressionStatement
    return `${generateCode(node.expression)};`;
  }
  if (node.type === "Program") {
    // Generate code for each statement in the Program body
    return node.body.map(generateCode).join("\n");
  }
};
