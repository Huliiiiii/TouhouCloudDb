module.exports = {
	extends: "../.eslintrc",
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:solid/typescript",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"prettier",
	],
	ignorePatterns: [".eslintrc.js"],
	parserOptions: { project: "tsconfig.json", tsconfigRootDir: __dirname },
	plugins: ["@typescript-eslint", "solid"],
};
