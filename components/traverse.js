/**
 * Traverses an Abstract Syntax Tree (AST) and applies visitor methods based on node types.
 * @param {object} ast - The Abstract Syntax Tree to traverse.
 * @param {object} visitors - An object containing visitor methods keyed by node types.
 */
module.exports = function traverse(ast, visitors) {
  /**
   * Recursive function to walk through AST nodes and apply visitor methods.
   * @param {object} node - The current node being processed during traversal.
   * @param {object} parent - The parent node of the current node being processed.
   */
  function walkNode(node, parent) {
    const method = visitors[node.type];
    if (method) {
      method(node, parent);
    }
    if (node.type === "Program") {
      walkNodes(node.body, node);
    } else if (node.type === "CallExpression") {
      walkNodes(node.params, node);
    }
  }

  /**
   * Iterates through an array of nodes and calls walkNode for each node.
   * @param {array} nodes - The array of nodes to traverse.
   * @param {object} parent - The parent node of the nodes being traversed.
   */
  function walkNodes(nodes, parent) {
    nodes.forEach((node) => walkNode(node, parent));
  }

  // Start traversal from the root node
  walkNode(ast, null);
};
