const menuData = require("./menu-data.json");

module.exports = () => {
  // Keep all pizzas, just generate slugs
  return menuData.map((item) => ({
    ...item,
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
  }));
};
