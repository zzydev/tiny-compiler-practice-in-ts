import { expect, test } from "vitest";
import { NodeTypes, RootNode } from "shared";
import { traverser, Visitor } from "./traverser";

test("traverser", () => {
    const ast: RootNode = {
        type: NodeTypes.Program,
        body: [
            {
                type: NodeTypes.CallExpression,
                name: "add",
                params: [
                    {
                        type: NodeTypes.NumberLiteral,
                        value: "1",
                    },
                    {
                        type: NodeTypes.CallExpression,
                        name: "append",
                        params: [
                            {
                                type: NodeTypes.StringLiteral,
                                value: "foo",
                            },
                            {
                                type: NodeTypes.StringLiteral,
                                value: "bar",
                            },
                        ],
                    },
                ],
            },
        ],
    };

    const Res: Array<Array<string | NodeTypes>> = [];
    const visitor: Visitor = {
        Program: {
            enter(node) {
                Res.push(["program-enter", node.type, ""]);
            },
            exit(node) {
                Res.push(["program-exit", node.type, ""]);
            },
        },

        CallExpression: {
            enter(node, parent) {
                Res.push(["callExpression-enter", node.type, parent!.type]);
            },
            exit(node, parent) {
                Res.push(["callExpression-exit", node.type, parent!.type]);
            },
        },

        StringLiteral: {
            enter(node, parent) {
                Res.push(["stringLiteral-enter", node.type, parent!.type]);
            },
            exit(node, parent) {
                Res.push(["stringLiteral-exit", node.type, parent!.type]);
            },
        },

        NumberLiteral: {
            enter(node, parent) {
                Res.push(["numberLiteral-enter", node.type, parent!.type]);
            },
            exit(node, parent) {
                Res.push(["numberLiteral-exit", node.type, parent!.type]);
            },
        },
    };

    traverser(ast, visitor);

    expect(Res).toMatchFileSnapshot("traverser.snap.js");
});
