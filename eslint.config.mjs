import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  pluginReact.configs["jsx-runtime"],
  pluginReactHooks.configs.recommended,
  { plugins: { pluginReactRefresh } },
  {
    ignores: ["node_modules"],
  },
  eslintConfigPrettier,
];
