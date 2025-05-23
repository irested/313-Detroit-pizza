const Image = require("@11ty/eleventy-img");

async function imageShortcode(
  src,
  alt,
  widths = [400],
  sizes = "100vw",
  className = "",
  eager = false
) {
  // Optimize image processing based on file type and location
  const imageOptions = {
    widths: [...widths],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    svgShortCircuit: true,
    filenameFormat: function (id, src, width, format) {
      const extension = format === "jpeg" ? "jpg" : format;
      return `${id}-${width}.${extension}`;
    },
  };

  // For SVG files, don't process them
  if (src.toLowerCase().endsWith(".svg")) {
    imageOptions.formats = ["svg"];
    imageOptions.svgShortCircuit = true;
  }

  let metadata = await Image(src, imageOptions);

  let imageAttributes = {
    alt,
    sizes,
    loading: eager ? "eager" : "lazy",
    decoding: eager ? "sync" : "async",
    class: className,
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // Permet de copier les fichiers statiques comme le CSS et les images
  eleventyConfig.addPassthroughCopy({
    "./src/css/styles.css": "css/styles.css",
  });
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/_data");

  // Redirige la page index.md pour qu'elle soit générée à la racine
  eleventyConfig.addPassthroughCopy("src/pages/index.md");

  // Add find filter
  eleventyConfig.addFilter("find", function (array, key, value) {
    return array.find((item) => item[key] === value);
  });

  // Add today's day number to global data
  eleventyConfig.addGlobalData("today", () => {
    return new Date().getDay();
  });

  // Add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

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
