import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";
test("tokenizer", () => {
    const code = `(add 1  (subtract 3  2))`;
    expect(tokenizer(code)).toMatchInlineSnapshot(`
      [
        {
          "type": 0,
          "value": "(",
        },
        {
          "type": 1,
          "value": "add",
        },
        {
          "type": 2,
          "value": "1",
        },
        {
          "type": 0,
          "value": "(",
        },
        {
          "type": 1,
          "value": "subtract",
        },
        {
          "type": 2,
          "value": "3",
        },
        {
          "type": 2,
          "value": "2",
        },
        {
          "type": 0,
          "value": ")",
        },
        {
          "type": 0,
          "value": ")",
        },
      ]
    `);
});

test("left paren", () => {
    const code = `(`;
    const tokens = [{ type: TokenTypes.Paren, value: "(" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("right paren", () => {
    const code = `)`;
    const tokens = [{ type: TokenTypes.Paren, value: ")" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("Add", () => {
    const code = `Add`;
    const tokens = [{ type: TokenTypes.Name, value: "Add" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("subtract", () => {
    const code = `subtract`;
    const tokens = [{ type: TokenTypes.Name, value: "subtract" }];
    expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
    const code = `233`;
    const tokens = [{ type: TokenTypes.Number, value: "233" }];
    expect(tokenizer(code)).toEqual(tokens);
});
