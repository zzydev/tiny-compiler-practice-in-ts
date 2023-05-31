import { test, expect } from "vitest";
import { compiler } from "./compiler";
test("compiler", () => {
    const code = `(eq 5 (add 2 3))`;

    expect(compiler(code)).toMatchInlineSnapshot('"eq(5, add(2, 3));"');
});
