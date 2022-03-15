const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("formatSnippetBody", function (content, indent) {
    // escape " and create array of lines
    const snippet = content.replace(/"/g, '\\"').trim().split("\n");
    const spaceIndent = indent > 0 ? indent : 2;

    const formattedSnippet = snippet.map((line, index) => {
      // count the number of leading whitespace characters (tab or spaces)
      const indentCount = line.search(/\S/) !== -1 ? line.search(/\S/) : 0;
      let newLine = line;

      if (line.charAt(0) === "\t") {
        newLine = line.replace(/\t/g, "\\t");
      } else {
        // add a \t for each space tab according to indentCount
        newLine = newLine
          .trimStart()
          .replace(/^/, "\\t".repeat(indentCount / spaceIndent));
      }
      // don't add a comma after the last line
      return index === snippet.length - 1 ? `"${newLine}"` : `"${newLine}",`;
    });

    return formattedSnippet.join("\n");
  });

  eleventyConfig.addFilter("isArray", (value) => Array.isArray(value));

  // get all subdirs under src/snippets
  const snippetDirs = fs
    .readdirSync("./src/snippets", { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  // create a collection for each subdir under src/snippets
  for (const dir of snippetDirs) {
    eleventyConfig.addCollection(`${dir}`, function (collection) {
      return collection.getFilteredByGlob(`src/snippets/${dir}/**/*.njk`);
    });
  }

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
  };
};
