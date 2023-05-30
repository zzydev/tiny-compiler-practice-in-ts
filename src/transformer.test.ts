import { RootNode, NodeTypes } from "shared";
import { it, expect } from "vitest";
import { transformer } from "./transformer";
it("transformer", () => {
    const oldAST: RootNode = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: "add",
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

    const newAST = {
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

    expect(transformer(oldAST)).toEqual(newAST);
});
