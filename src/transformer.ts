import { NodeTypes, RootNode } from "shared";
import { traverser } from "./traverser";
export function transformer(ast: RootNode) {
    const newAst = {
        type: NodeTypes.Program,
        body: [],
    };

    //the context is a reference from the old ast to the new ast.
    ast._context = newAst.body;

    traverser(ast, {
        CallExpression: {
            enter(node, parent) {
                if (node.type === NodeTypes.CallExpression) {
                    let expression: any = {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: node.name,
                        },
                        arguments: [],
                    };

                    node._context = expression.arguments;

                    if (parent?.type !== NodeTypes.CallExpression) {
                        expression = {
                            type: "ExpressionStatement",
                            expression,
                        };
                    }

                    parent?._context?.push(expression);
                }
            },
        },

        NumberLiteral: {
            enter(node, parent) {
                if (node.type === NodeTypes.NumberLiteral) {
                    const numberNode: any = {
                        type: "NumberLiteral",
                        value: node.value,
                    };

                    parent?._context?.push(numberNode);
                }
            },
        },
    });

    return newAst;
}
