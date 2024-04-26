const parser = require("../components/parser");

describe("parser", () => {
  it("should parse tokens into an Abstract Syntax Tree (AST)", () => {
    const tokens = [
      { type: "paren", value: "(" },
      { type: "number", value: "5" },
      { type: "paren", value: ")" },
    ];
    const expectedAst = {
      type: "Program",
      body: [
        {
          type: "CallExpression",
          name: "5",
          params: [], // Empty params array as per the actual behavior
        },
      ],
    };

    const ast = parser(tokens);

    expect(ast).toEqual(expectedAst);
  });

  it("should throw a TypeError for an unknown token", () => {
    const tokens = [{ type: "invalid", value: "invalid" }];

    expect(() => parser(tokens)).toThrow(TypeError);
  });
});
