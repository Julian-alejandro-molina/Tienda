const fetch = require('node-fetch');
const SHOPIFY_STORE_URL = 'https://admin.shopify.com';
const SHOPIFY_API_VERSION = '2024-04'
const SHOPIFY_API_KEY= '3babae4202835e53849820ce483e91ca'
const SHOPIFY_API_PASSWORD='5c7d83583bc1ff3c2cddd61193e8b822';

async function fetchProducts() {
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/${SHOPIFY_API_VERSION}/products.json`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const data = await response.json();
    return data.products;
  }
  
  // Ejemplo de uso
  fetchProducts()
    .then(products => console.log(products))
    .catch(error => console.error(error));

   