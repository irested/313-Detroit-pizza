const fs = require("fs");

// Pas besoin de require("node-fetch") avec Node.js v18+

const API_URL = "https://demoapi.hiboutik.com/api/products";
const TOKEN = ""; // Remplace par ton token API

async function fetchProducts() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  const products = await response.json();

  // Sauvegarde tous les produits dans un fichier JSON
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  console.log("Fichier products.json créé avec succès.");
}

fetchProducts().catch(console.error);
