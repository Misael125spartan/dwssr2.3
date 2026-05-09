import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // 1. Ignorar builds del front y dependencias
    ignores: ["node_modules/**", "dist/**"]
  },
  // 2. Configuración para el backend: server/**
  {
    files: ["server/**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node }
    }
  },
  // 3. Configuración para el frontend: src/**
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser }
    }
  }
];