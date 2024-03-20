module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {},
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
		{
			env: { node: true, es2021: true },
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json",
				ecmaVersion: "latest",
				sourceType: "module",
			},
			extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked", "prettier"],
			rules: {
				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
				"@typescript-eslint/consistent-type-definitions": "off",
			},
		},
	],
};
