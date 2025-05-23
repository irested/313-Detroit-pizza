export async function onRequest(context) {
  const username = context.env.HIBOUTIK_USER;
  const password = context.env.HIBOUTIK_PASS;
  const account = context.env.HIBOUTIK_ACCOUNT;

  const endpoint = "https://app.hiboutik.com/api/products/";

  const auth = btoa(`${username}:${password}`); // encode en base64

  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${auth}`,
        "X-Hiboutik-Account": account,
      },
    });

    if (!res.ok) {
      return new Response("Erreur API Hiboutik", { status: 500 });
    }

    const data = await res.json();

    // Optionnel : filtrer les produits visibles (ex : "menu")
    const menu = data.filter((p) => p.visible === "1");

    return new Response(JSON.stringify(menu), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Erreur serveur: ${error.message}`, { status: 500 });
  }
}
