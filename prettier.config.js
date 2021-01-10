// Opciones de configuración de prettier
// https://prettier.io/docs/en/options.html
module.exports = {
  // Líneas de 120 carácteres
  printWidth: 120,
  // Forzar comas tras el último elemento de un array, objeto o parámetros de función
  trailingComma: 'all',
  // número de espacios por nivel de indentación
  tabWidth: 2,
  //evitar lineas de indentado en lugar de espacios
  useTabs: false,
  //imprimir semicolons al final de las declaraciones
  semi: true,
  //comilla simple(recomendado por es estilo de airbnb)
  singleQuote: true,
  //comilla simple en jsx
  jsxSingleQuote: true,
  //evitar que los elementos de los brackets estén en una misma linea
  jsxBracketSameLine: false,
  //engloba el contenido si excede más de los 120 caracteres
  proseWrap: 'always',
  //espaciado inicial y final para los brackets
  bracketSpacing: true,
};
