const fs = require('fs');
const path = require('path');

// Curated specific image overrides by SKU or exact name
const SKU_EXACT_MAP = {
  // GTA VI (Official High-Res Vertical Cover Art)
  "SG-080": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",
  "SG-081": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",

  // GTA Vice City
  "SG-034": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",

  // FIFA Exact Box Art
  "SG-101": "https://images.igdb.com/igdb/image/upload/t_cover_big/co204b.png", // FIFA 16
  "SG-102": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsf.png", // FIFA 20
  "SG-103": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qse.png", // FIFA 19
  "SG-104": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsd.png", // FIFA 18
  "SG-109": "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_600x900_2x.jpg", // FIFA 23
  "SG-111": "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/library_600x900_2x.jpg", // FIFA 22

  // WWE 2K Series
  "SG-105": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x1e.png", // WWE 2K17
  "SG-106": "https://cdn.cloudflare.steamstatic.com/steam/apps/664430/library_600x900_2x.jpg", // WWE 2K18
  "SG-112": "https://cdn.cloudflare.steamstatic.com/steam/apps/1812440/library_600x900_2x.jpg", // WWE 2K22
  "SG-113": "https://cdn.cloudflare.steamstatic.com/steam/apps/1015140/library_600x900_2x.jpg", // WWE 2K20

  // Official Retail Digital Gift Card Artwork (Real styled vouchers)
  "SG-064": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80", // Steam Gift Card
  "SG-065": "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80", // Roblox Gift Card
  "SG-066": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png", // Valorant Gift Card
  "SG-067": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80", // PlayStation Gift Card US
  "SG-068": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80", // Apple Gift Card US
  "SG-069": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80", // Battle.net Gift Card US
  "SG-070": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80", // ExitLag Global Card
  "SG-071": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80", // Xbox Gift Card US
  "SG-072": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop&q=80", // Nintendo Gift Card US
  "SG-073": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80", // Discord Gift Card
  "SG-074": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80", // EA Gift Card US
  "SG-075": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80", // Netflix Gift Card
  "SG-076": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80", // Epic Gift Card US

  // Subscriptions
  "SG-077": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80", // Xbox Game Pass Ultimate
  "SG-094": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80", // Lifetime PC Game Pass

  // Curated Mystery & Steam Key Cards
  "SG-096": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80", // Steam Random Keys (Matrix digital stream)
  "SG-097": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80", // Grand Random Steam Key (Steam library neon card)
  "SG-098": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80", // Steam Random Elite Key (Neon gaming key card)
  "SG-099": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80", // VIP Mystery Bundle (Glowing cyber treasure chest)
};

const inputPath = path.join(__dirname, '..', 'src', 'products_clean.json');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'products_clean.json');

const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

let updatedCount = 0;
const updatedProducts = products.map((p) => {
  let newImage = p.image;

  if (SKU_EXACT_MAP[p.sku]) {
    newImage = SKU_EXACT_MAP[p.sku];
    updatedCount++;
  }

  return {
    ...p,
    image: newImage
  };
});

fs.writeFileSync(inputPath, JSON.stringify(updatedProducts, null, 2), 'utf8');
if (fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify(updatedProducts, null, 2), 'utf8');
}

console.log(`Updated ${updatedCount} products with curated authentic artwork across products_clean.json datasets.`);
