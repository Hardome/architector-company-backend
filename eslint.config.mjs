import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
// import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/tests", "**/global.test.d.ts", "**/build"]), {
    extends: compat.extends("plugin:@typescript-eslint/eslint-recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    linterOptions: {
        reportUnusedDisableDirectives: true,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 11,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: __dirname,
            createDefaultProgram: true,
        },
    },

    rules: {
        "@typescript-eslint/prefer-for-of": 2,
        "@typescript-eslint/no-empty-interface": 2,

        "@typescript-eslint/no-magic-numbers": [2, {
            ignoreEnums: true,
            ignore: [1, -1, 0],
            ignoreArrayIndexes: true,
            ignoreReadonlyClassProperties: true,
            ignoreNumericLiteralTypes: true,
        }],

        "@typescript-eslint/no-misused-new": 2,
        "@typescript-eslint/consistent-type-assertions": 2,
        // "@typescript-eslint/no-throw-literal": 2,
        "@typescript-eslint/no-this-alias": 2,
        "@typescript-eslint/unbound-method": 2,
        "@typescript-eslint/no-use-before-define": 2,
        "@typescript-eslint/prefer-readonly": 2,

        "@typescript-eslint/array-type": [2, {
            default: "array",
        }],

        "@typescript-eslint/no-unnecessary-boolean-literal-compare": 2,
        // "@typescript-eslint/semi": 2,
        "use-isnan": 2,
        "no-undef-init": 2,
        "max-lines": [2, 400],

        "no-unused-expressions": [2, {
            allowShortCircuit: true,
            allowTernary: true,
        }],

        "no-empty": 2,
        "no-unsafe-finally": 2,
        "no-fallthrough": 2,
        "no-template-curly-in-string": 2,
        "no-cond-assign": 2,
        "no-new-func": 2,
        "no-sequences": 2,
        "no-duplicate-case": 2,
        "no-console": 2,
        "constructor-super": 2,
        "rest-spread-spacing": [2, "never"],
        "object-shorthand": [2, "always"],
        "space-before-blocks": 2,
        "operator-linebreak": [2, "after"],

        "object-curly-newline": [2, {
            consistent: true,
        }],

        "newline-per-chained-call": [2, {
            ignoreChainWithDepth: 2,
        }],

        "new-parens": 2,
        "function-paren-newline": [2, "consistent"],
        "array-bracket-newline": [2, "consistent"],
        "array-element-newline": [2, "consistent"],
        "no-sync": 2,
        "@typescript-eslint/no-shadow": 2,
        "no-useless-return": 2,
        "no-useless-concat": 2,
        "no-useless-catch": 2,
        "no-return-await": 2,
        "no-return-assign": 2,
        "no-new-wrappers": 2,
        "no-loop-func": 2,
        "no-caller": 2,
        "array-callback-return": 2,
        "no-setter-return": 2,
        "no-import-assign": 2,
        "no-async-promise-executor": 2,
        "no-dupe-else-if": 2,
        "require-atomic-updates": 0,
        "block-scoped-var": 2,
        curly: [2, "all"],
        "dot-location": [2, "property"],

        "dot-notation": [2, {
            allowPattern: "^[a-z]+(_[a-z]+)+$",
        }],

        eqeqeq: [2, "always", {
            null: "ignore",
        }],

        "max-classes-per-file": [2, 1],

        "no-else-return": [2, {
            allowElseIf: true,
        }],

        "no-empty-function": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-floating-decimal": 2,
        "no-labels": 2,

        "no-implicit-coercion": [2, {
            allow: ["!!", "~"],
        }],

        "no-invalid-this": 0,
        "prefer-const": 2,
        "prefer-template": 2,
        "no-useless-computed-key": 2,
        "no-useless-rename": 2,
        "prefer-arrow-callback": 2,
        "no-throw-literal": 2,
        yoda: 2,
        "array-bracket-spacing": 2,
        "block-spacing": [2, "always"],
        "brace-style": 2,
        camelcase: 2,
        "comma-dangle": 2,
        "comma-spacing": 2,
        "comma-style": 2,
        "computed-property-spacing": 2,
        "func-call-spacing": 2,
        "jsx-quotes": [2, "prefer-single"],

        "key-spacing": [2, {
            mode: "strict",
            beforeColon: false,
        }],

        "keyword-spacing": [2, {
            overrides: {
                catch: {
                    after: false,
                },
            },
        }],

        "max-nested-callbacks": [2, 3],
        "new-cap": 2,
        "no-lonely-if": 2,
        "no-multi-assign": 2,

        "no-multiple-empty-lines": [2, {
            max: 1,
        }],

        "no-nested-ternary": 2,
        "no-trailing-spaces": 2,

        "no-unneeded-ternary": [2, {
            defaultAssignment: false,
        }],

        "no-whitespace-before-property": 2,
        "object-curly-spacing": 2,
        "operator-assignment": [2, "always"],
        "prefer-object-spread": 2,
        semi: "off",
        "semi-spacing": 2,
        "semi-style": 2,
        "space-before-function-paren": [2, "never"],
        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,
        "wrap-regex": 2,

        "arrow-body-style": [2, "as-needed", {
            requireReturnForObjectLiteral: true,
        }],

        "arrow-parens": [2, "always"],

        "arrow-spacing": [2, {
            before: true,
            after: true,
        }],

        "generator-star-spacing": [2, {
            before: false,
            after: true,
        }],

        "no-duplicate-imports": 2,
        "no-useless-constructor": 2,
        "no-var": 2,
        "max-len": [2, 100],

        quotes: [2, "single", {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],

        "no-tabs": 2,
        "no-unreachable": 2,
        "no-multi-spaces": 2,
        "no-proto": 2,

        "prefer-destructuring": [2, {
            object: true,
            array: false,
        }],

        "prefer-rest-params": 2,
        "prefer-spread": 2,
        "symbol-description": 2,
        "template-curly-spacing": [2, "never"],
        "no-useless-escape": 0,

        indent: [2, 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
        }],

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let", "var"],
            next: "*",
        }, {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            }, {
                blankLine: "always",
                prev: "*",
                next: "return",
            }],

        "global-require": 2,
        "no-path-concat": 2,
    },
},/* {
    files: ["test/**"],

    plugins: {
        jest,
    },

    rules: {
        "@typescript-eslint/unbound-method": 0,
        "jest/unbound-method": 2,
    },
}*/]);