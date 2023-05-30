export enum NodeTypes {
    Program = "Program",
    NumberLiteral = "NumberLiteral",
    StringLiteral = "StringLiteral",
    CallExpression = "CallExpression",
}

export type ChildNode =
    | NumberLiteralNode
    | StringLiteralNode
    | CallExpressionNode;

export interface Node {
    type: NodeTypes;
}

export interface NumberLiteralNode extends Node {
    type: NodeTypes.NumberLiteral;
    value: string;
}

export interface StringLiteralNode extends Node {
    type: NodeTypes.StringLiteral;
    value: string;
}

export interface CallExpressionNode extends Node {
    name: string;
    type: NodeTypes.CallExpression;
    params: ChildNode[];
}

export interface RootNode extends Node {
    body: ChildNode[];
    type: NodeTypes.Program;
}

export function createStringLiteralNode(value): StringLiteralNode {
    return {
        type: NodeTypes.StringLiteral,
        value,
    };
}

export function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: [],
    };
}

export function createNumberLiteralNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value,
    };
}

export function createCallExpression(name): CallExpressionNode {
    return {
        name,
        type: NodeTypes.CallExpression,
        params: [],
    };
}
