module.exports = {
	extends: "../.eslintrc",
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ["plugin:n/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
	},
	tsconfigPaths: ["./tsconfig.json"],
	rules: {},
};
