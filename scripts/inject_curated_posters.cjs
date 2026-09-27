const fs = require('fs');
const path = require('path');

// Curated specific image overrides by SKU or exact name
const SKU_EXACT_MAP = {
  // GTA VI (Official High-Res Vertical Cover Art)
  "SG-080": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",
  "SG-081": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",

  // GTA Vice City (Fix any old mistaken co7927 reference)
  "SG-034": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",

  // Digital Gift Cards & Services (Clean, branded vector/card art, NOT physical photos of consoles or laptops)
  "SG-064": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/800px-Steam_icon_logo.svg.png",
  "SG-065": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/800px-Roblox_player_icon_black.svg.png",
  "SG-066": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "SG-067": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/800px-PlayStation_logo.svg.png",
  "SG-068": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
  "SG-069": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Battle.net_logo.svg/800px-Battle.net_logo.svg.png",
  "SG-070": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "SG-071": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/800px-Xbox_one_logo.svg.png",
  "SG-072": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/800px-Nintendo.svg.png",
  "SG-073": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Discord_color_icon_%28vector%29.svg/800px-Discord_color_icon_%28vector%29.svg.png",
  "SG-074": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Electronic-Arts-Logo.svg/800px-Electronic-Arts-Logo.svg.png",
  "SG-075": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/800px-Netflix_2015_logo.svg.png",
  "SG-076": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/800px-Epic_Games_logo.svg.png",

  // Subscriptions
  "SG-077": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/800px-Xbox_one_logo.svg.png",
  "SG-094": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/800px-Xbox_one_logo.svg.png",

  // Steam Mystery Keys & Bundles (Distinct stylized digital key graphics, NO duplicate retro computers)
  "SG-096": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80", // Steam Random Keys (Matrix Digital Art)
  "SG-097": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80", // Grand Random Steam Key (Glow Key Art)
  "SG-098": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", // Steam Random Elite Key (Cyber Neon Art)
  "SG-099": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80", // VIP Mystery Bundle (Gold/Purple Mystery)
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
  } else if (p.name.toLowerCase().includes('gta 6') || p.name.toLowerCase().includes('grand theft auto vi')) {
    newImage = "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('ea gift') || p.name.toLowerCase().includes('ea play')) {
    newImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Electronic-Arts-Logo.svg/800px-Electronic-Arts-Logo.svg.png";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('battle.net')) {
    newImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Battle.net_logo.svg/800px-Battle.net_logo.svg.png";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('apple gift card') || p.name.toLowerCase().includes('apple')) {
    newImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('vip mystery bundle')) {
    newImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('elite key')) {
    newImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('grand random')) {
    newImage = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80";
    updatedCount++;
  } else if (p.name.toLowerCase().includes('steam random keys')) {
    newImage = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80";
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
