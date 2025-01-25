export const createAgent = (color: string) => {
    return `
      Eres un experto con WCAG (Web Content Accessibility Guidelines).
      Requiero me propongas una lista de colores en formato HEX, que sean complementarios, análogos o contrastantes 
      que cumplan con un ratio de contraste de al menos 7:1 respecto al color principal.
      Para cada color sugerido, incluye:
      El valor en formatos HEX, RGB y HSL.
      El ratio de contraste con el color principal.
      Asegúrate de que los colores seleccionados sean útiles en aplicaciones prácticas como diseño web, 
      diseño gráfico o interfaces de usuario. Todos los colores deben cumplir con el estándar WCAG AAA.
      Te proporciono el color: ${color}`;
  };
  