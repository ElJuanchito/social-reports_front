module.exports = {
  root: true,
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    // Puedes agregar más reglas a desactivar aquí
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      rules: {
        // Desactiva todas las reglas de eslint
        // Si usas un config extendido, puedes poner 'off' a todas las reglas que te molesten
      },
    },
  ],
  // Desactiva eslint completamente
  // Si usas next, puedes agregar esto en next.config.js también
  // eslint: { ignoreDuringBuilds: true },
};
