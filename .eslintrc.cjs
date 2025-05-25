module.exports = {
  root: true,
  extends: [],
  rules: {},
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      rules: {
        // Desactiva todas las reglas de eslint
      },
    },
  ],
  ignorePatterns: ['**/*'], // Ignora todos los archivos
};
