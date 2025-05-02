const menuData = require("./menu-data.json");

module.exports = () => {
  return menuData
    .filter((item) => item.topSell) // Only include top-sell pizzas
    .map((item) => ({
      ...item,
      slug: item.name.toLowerCase().replace(/\s+/g, "-"), // Add a slug field
    }));
};
