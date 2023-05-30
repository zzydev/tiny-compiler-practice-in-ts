import { ChildNode, NodeTypes, RootNode, CallExpressionNode } from "shared";

type ParentNode = RootNode | CallExpressionNode | undefined;
type Methods = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
    enter: Methods;
    exit?: Methods;
}
export interface Visitor {
    Program?: VisitorOption;
    NumberLiteral?: VisitorOption;
    StringLiteral?: VisitorOption;
    CallExpression?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
    // dfs
    function traverseArray(array: ChildNode[], parent: ParentNode) {
        array.forEach((node) => {
            traverseNode(node, parent);
        });
    }

    function traverseNode(node: RootNode | ChildNode, parent?: ParentNode) {
        // enter
        const methods = visitor[node.type];
        if (methods) {
            methods.enter(node, parent);
        }

        switch (node.type) {
            case NodeTypes.Program:
                traverseArray(node.body, node);
                break;
            case NodeTypes.CallExpression:
                traverseArray(node.params, node);
                break;
            case NodeTypes.StringLiteral:
                break;
            case NodeTypes.NumberLiteral:
                break;
            default:
                break;
        }

        // exit
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    traverseNode(rootNode);
}
