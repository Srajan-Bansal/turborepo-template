import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.Config} */
const config = {
	root: true,
	extends: [
		'@repo/eslint-config/index.js',
		js.configs.recommended,
		...tseslint.configs.recommended,
	],
	files: ['**/*.{ts,tsx}'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
	},
	plugins: {
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
	},
	rules: {
		...reactHooks.configs.recommended.rules,
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
	ignores: ['dist'],
};

export default tseslint.config(config);
