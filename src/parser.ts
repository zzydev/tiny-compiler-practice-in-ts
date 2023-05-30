import {
    createRootNode,
    createStringLiteralNode,
    createNumberLiteralNode,
    createCallExpression,
    ChildNode,
    RootNode,
    CallExpressionNode,
} from "shared";
import { Token, TokenTypes } from "./tokenizer";

export function parser(tokens: Token[]) {
    // 创建AST根节点
    const root: RootNode = createRootNode();

    let current = 0;

    function walk(): ChildNode {
        let token = tokens[current];

        if (token.type === TokenTypes.Number) {
            current++;
            return createNumberLiteralNode(token.value);
        }

        if (token.type === TokenTypes.String) {
            current++;
            return createStringLiteralNode(token.value);
        }

        if (token.type === TokenTypes.Paren && token.value === "(") {
            token = tokens[++current];

            let node: CallExpressionNode = createCallExpression(token.value);

            token = tokens[++current];

            while (
                token.type !== TokenTypes.Paren ||
                (token.type === TokenTypes.Paren && token.value !== ")")
            ) {
                // recursive
                node.params.push(walk());
                token = tokens[current];
            }

            // skip right paren
            current++;

            return node;
        }

        throw new Error(`Unrecognisable token: ${token}`);
    }

    while (current < tokens.length) {
        // 往 RootNode 添加 ChildNode
        root.body.push(walk());
    }

    return root;
}
