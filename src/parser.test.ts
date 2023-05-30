import { describe, expect, it } from "vitest";
import { NodeTypes } from "shared";
import { parser } from "./parser";
import { TokenTypes } from "./tokenizer";

describe("parser", () => {
    it("number", () => {
        const tokens = [{ type: TokenTypes.Number, value: "6" }];

        const ast = {
            type: NodeTypes.Program,
            body: [
                {
                    type: NodeTypes.NumberLiteral,
                    value: "6",
                },
            ],
        };
        expect(parser(tokens)).toEqual(ast);
    });

    it("string", () => {
        const tokens = [{ type: TokenTypes.String, value: "awili" }];

        const ast = {
            type: NodeTypes.Program,
            body: [
                {
                    type: NodeTypes.StringLiteral,
                    value: "awili",
                },
            ],
        };
        expect(parser(tokens)).toEqual(ast);
    });

    it("transform tokens to ast", () => {
        const tokens = [
            { type: TokenTypes.Paren, value: "(" },
            { type: TokenTypes.Name, value: "ADD" },
            { type: TokenTypes.Number, value: "6" },
            { type: TokenTypes.Paren, value: "(" },
            { type: TokenTypes.Name, value: "subtract" },
            { type: TokenTypes.Number, value: "8" },
            { type: TokenTypes.Number, value: "6" },
            { type: TokenTypes.Paren, value: ")" },
            { type: TokenTypes.Paren, value: ")" },
        ];
        const ast = {
            type: NodeTypes.Program,
            body: [
                {
                    type: NodeTypes.CallExpression,
                    name: "ADD",
                    params: [
                        {
                            type: NodeTypes.NumberLiteral,
                            value: "6",
                        },
                        {
                            type: NodeTypes.CallExpression,
                            name: "subtract",
                            params: [
                                {
                                    type: NodeTypes.NumberLiteral,
                                    value: "8",
                                },
                                {
                                    type: NodeTypes.NumberLiteral,
                                    value: "6",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        expect(parser(tokens)).toEqual(ast);
    });
});
