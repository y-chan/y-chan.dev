// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/** @type {ConfigData} */
module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:perfectionist/recommended-natural",
    // "plugin:tailwindcss/recommended",
  ],
  plugins: ["@typescript-eslint", "perfectionist"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    // v6 で recommended から削除されたものを有効化
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
    // v6 で strict に移動したルールを有効化
    "@typescript-eslint/no-non-null-assertion": "warn",
    // v6 で recommended に追加されたルールを無効化
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    // stylistic を有効にしたため v5 の recommended にないルールを無効化
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/ban-tslint-comment": "off",
    "@typescript-eslint/class-literal-property-style": "off",
    "@typescript-eslint/consistent-generic-constructors": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-confusing-non-null-assertion": "off",
    "@typescript-eslint/prefer-for-of": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./", "../", "~/"],
      },
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        type: "natural",
        order: "asc",
        "nullable-last": true,
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "error",
    "indent": ["error", 2],
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      env: {
        "astro/astro": true,
      },
      rules: {
        // override/add rules settings here, such as:
        "astro/no-set-html-directive": "error",
        "astro/no-unused-css-selector": "error",
        "astro/prefer-class-list-directive": "error",
        "perfectionist/sort-astro-attributes": [
          "error",
          {
            type: "natural",
            order: "asc",
            groups: ["multiline", "unknown", ["shorthand", "astro-shorthand"]],
          },
        ],
        "semi": "off",
        "astro/semi": [
          "error",
          "never",
          { "beforeStatementContinuationChars": "never" }
        ],
        "indent": ["error", 2],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        "react/self-closing-comp": [
          "error",
          {
            component: true,
            html: true,
          },
        ],
        "semi": ["error", "never", {"beforeStatementContinuationChars": "never"}],
        "semi-spacing": ["error", {"after": true, "before": false}],
        "semi-style": ["error", "first"],
        "no-extra-semi": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
      },
    },
    // ...
  ],
  ignorePatterns: [".eslintrc.cjs"],
}
