import { test, expect } from "vitest";
import { NodeTypes } from "shared";
import { codeGenerator } from "./codeGenerator";

test("codeGenerator", () => {
    const ast = {
        type: NodeTypes.Program,
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "add",
                    },
                    arguments: [
                        {
                            type: "NumberLiteral",
                            value: "2",
                        },
                        {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "subtract",
                            },
                            arguments: [
                                {
                                    type: "NumberLiteral",
                                    value: "3",
                                },
                                {
                                    type: "NumberLiteral",
                                    value: "3",
                                },
                            ],
                        },
                    ],
                },
            },
            {
                type: "ExpressionStatement",
                expression: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: "add",
                    },
                    arguments: [
                        {
                            type: "NumberLiteral",
                            value: "6",
                        },
                        {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "subtract",
                            },
                            arguments: [
                                {
                                    type: "NumberLiteral",
                                    value: "8",
                                },
                                {
                                    type: "NumberLiteral",
                                    value: "6",
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    };

    expect(codeGenerator(ast)).toMatchInlineSnapshot(`
      "add(2, subtract(3, 3));
      add(6, subtract(8, 6));"
    `);
});
