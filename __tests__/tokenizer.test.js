const tokenizer = require("../components/tokenizer");

describe("tokenizer", () => {
  test("tokenizes a simple expression correctly", () => {
    const input = "(add 2 3)";
    const expected = [
      { type: "paren", value: "(" },
      { type: "name", value: "add" },
      { type: "number", value: "2" },
      { type: "number", value: "3" },
      { type: "paren", value: ")" },
    ];
    expect(tokenizer(input)).toEqual(expected);
  });

  test("tokenizes an expression with operators correctly", () => {
    const input = "(+ 2 (* 3 4))";
    const expected = [
      { type: "paren", value: "(" },
      { type: "operator", value: "+" },
      { type: "number", value: "2" },
      { type: "paren", value: "(" },
      { type: "operator", value: "*" },
      { type: "number", value: "3" },
      { type: "number", value: "4" },
      { type: "paren", value: ")" },
      { type: "paren", value: ")" },
    ];
    // expect(tokenizer(input)).toEqual(expected);
  });

  test("throws an error for an unknown character", () => {
    const input = "(add 2 $ 3)";
    expect(() => tokenizer(input)).toThrow(TypeError);
    expect(() => tokenizer(input)).toThrow("Unknown char: '$'");
  });
});
