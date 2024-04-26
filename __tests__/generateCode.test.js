const generateCode = require("../components/generateCode");

describe("generateCode", () => {
  it("should generate code for NumericLiteral node", () => {
    const node = { type: "NumericLiteral", value: 42 };
    const expectedCode = "42";

    const generatedCode = generateCode(node);

    expect(generatedCode).toBe(expectedCode);
  });

  it("should generate code for Identifier node", () => {
    const node = { type: "Identifier", name: "foo" };
    const expectedCode = "foo";

    const generatedCode = generateCode(node);

    expect(generatedCode).toBe(expectedCode);
  });

  it("should generate code for CallExpression node", () => {
    const node = {
      type: "CallExpression",
      callee: { type: "Identifier", name: "add" },
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 },
      ],
    };
    const expectedCode = "add(2, 3)";

    const generatedCode = generateCode(node);

    expect(generatedCode).toBe(expectedCode);
  });

  it("should generate code for ExpressionStatement node", () => {
    const node = {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: { type: "Identifier", name: "console.log" },
        arguments: [{ type: "Identifier", name: "message" }],
      },
    };
    const expectedCode = "console.log(message);";

    const generatedCode = generateCode(node);

    expect(generatedCode).toBe(expectedCode);
  });

  it("should generate code for Program node", () => {
    const node = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: { type: "Identifier", name: "foo" },
        },
        {
          type: "ExpressionStatement",
          expression: { type: "Identifier", name: "bar" },
        },
      ],
    };
    const expectedCode = "foo;\nbar;";

    const generatedCode = generateCode(node);

    expect(generatedCode).toBe(expectedCode);
  });
});
