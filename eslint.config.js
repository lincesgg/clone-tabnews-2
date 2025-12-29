import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginJest from "eslint-plugin-jest";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";

// console.log(globals.browser);

export default defineConfig([
	globalIgnores([".*/", "**/package-lock.json"], "Hide file Prefixed by ."),
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		plugins: { js, jest: pluginJest },
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...pluginJest.environments.globals.globals,
			},
		},
		rules: {
			"no-unused-vars": "warn",
		},
	},
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			"react/display-name": "off",
		},
	},
	{
		files: ["**/*.json"],
		plugins: { json },
		language: "json/json",
		extends: ["json/recommended"],
	},
]);
