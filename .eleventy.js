module.exports = function (eleventyConfig) {
  // Permet de copier les fichiers statiques comme le CSS et les images
  eleventyConfig.addPassthroughCopy({
    "./src/css/styles.css": "css/styles.css",
  });
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  // Redirige la page index.md pour qu'elle soit générée à la racine
  eleventyConfig.addPassthroughCopy("src/pages/index.md");

  // Configuration du dossier d'entrée et de sortie
  return {
    dir: {
      input: "src", // Dossier source
      output: "_site", // Dossier de sortie
      includes: "_includes",
      data: "_data",
    },
    passthroughFileCopy: true, // Assure-toi de copier tous les fichiers
  };
};
