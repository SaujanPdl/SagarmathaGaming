const fs = require('fs');
const path = require('path');

// Exact cover mapping dictionary
const COVERS_MAP = {
  // Non-Steam & Launcher Titles
  "valorant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "league of legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png",
  "fortnite": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png",
  "genshin impact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2040.png",
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "pubg mobile": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r42.png",
  "free fire": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2y2j.png",
  "clash royale": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y7a.png",
  "clash of clans": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2m4e.png",
  "mobile legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co294f.png",
  "blood strike": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7dps.png",
  "wuthering waves": "https://images.igdb.com/igdb/image/upload/t_cover_big/co876v.png",
  "where winds meet": "https://images.igdb.com/igdb/image/upload/t_cover_big/co52b1.png",
  "roblox": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2083.png",

  // Distinct year-specific FIFA & EA Sports covers
  "ea sports fc 27": "2669320",
  "ea sports fc 26": "2669320",
  "ea sports fc 25": "2669320",
  "ea sports fc 24": "2195250",
  "fc 27": "2669320",
  "fc 26": "2669320",
  "fc 25": "2669320",
  "fc 24": "2195250",
  "fifa 23": "1811260",
  "fifa 22": "1506830",
  "fifa 21": "1313800",
  "fifa 20": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsf.png",
  "fifa 19": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qse.png",
  "fifa 18": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsd.png",
  "fifa 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
  "fifa 16": "https://images.igdb.com/igdb/image/upload/t_cover_big/co204b.png",
  "fifa 15": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r79.png",
  "fifa 14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r78.png",
  "ea sports fc": "2669320",
  "ea fc": "2669320",
  "fifa": "1811260",

  // Physical Console Discs & Major Titles
  "god of war ragnarok": "2322010",
  "god of war 2018": "1593500",
  "god of war": "1593500",
  "the last of us part ii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2124.png",
  "the last of us remastered": "1888930",
  "the last of us": "1888930",
  "last of us": "1888930",
  "uncharted legacy of thieves": "1659420",
  "uncharted": "1659420",
  "naruto shippuden ultimate ninja storm 4": "349040",
  "naruto ultimate ninja storm": "349040",
  "wwe 2k24": "2315690",
  "wwe 2k22": "2315690",
  "wwe 2k20": "1015140",
  "wwe 2k18": "https://cdn.cloudflare.steamstatic.com/steam/apps/664430/library_600x900_2x.jpg",
  "wwe 2k17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x1e.png",
  "wwe 2k": "2315690",
  "spider man": "1817070",
  "grand theft auto v": "271590",
  "grand theft auto": "271590",
  "gta v": "271590",
  "gta 5": "271590",
  "gta 6": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",
  "grand theft auto vi": "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png",
  "wolverine": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3v9w.png",

  // Major Steam Catalog Titles
  "cyberpunk 2077": "1091500",
  "black myth wukong": "2358720",
  "elden ring": "1245620",
  "rust": "252490",
  "ark survival evolved": "346110",
  "ark survival": "346110",
  "forza horizon 5": "1551360",
  "forza horizon 4": "1293830",
  "forza horizon 6": "1551360",
  "forza horizon": "1551360",
  "euro truck simulator 2": "227300",
  "euro truck simulator": "227300",
  "euro truck": "227300",
  "red dead redemption 2": "1174180",
  "red dead redemption": "1174180",
  "sekiro": "814380",
  "horizon forbidden west": "2420110",
  "horizon zero dawn": "1151640",
  "farming simulator 25": "2300320",
  "farming simulator 22": "1248130",
  "palworld": "1623730",
  "sons of the forest": "1326470",
  "the forest": "242760",
  "sea of thieves": "1172620",
  "it takes two": "1426210",
  "snowrunner": "1465360",
  "ranch simulator": "936960",
  "cities skylines ii": "949230",
  "cities skylines": "949230",
  "cricket 24": "2162600",
  "cricket 26": "2162600",
  "f1 25": "2488620",
  "tekken 7": "389730",
  "detroit": "1222140",
  "dying light": "239140",
  "no mans sky": "275850",
  "hollow knight silksong": "1030300",
  "hollow knight": "367520",
  "onimusha": "761030",
  "crimson desert": "3321460",
  "riders republic": "2290180",
  "nba 2k26": "2878950",
  "call of duty modern warfare iii": "2519060",
  "call of duty modern warfare 2": "1938090",
  "call of duty modern warfare": "1938090",
  "arc raiders": "1808500",
  "battlefield": "1517290",
  "mafia the old country": "1994590",
  "hitman world of assassination": "1659040",
  "nier": "524220",
  "the walking dead": "1449690",
  "microsoft flight simulator": "2537590",
  "schedule i": "3164500",
  "split fiction": "2001120",
  "expedition 33": "1903380",
  "clair obscur": "1903380",
  "assassins creed iv black flag": "242050",
  "black flag": "242050",
  "assassins creed shadows": "2851900",
  "assassins creed": "2851900",

  // Gift Card Aesthetics
  "discord": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80",
  "steam gift card": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "playstation gift card": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80",
  "xbox gift card": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80",
  "apple gift card": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
  "netflix gift card": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
  "nintendo gift card": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "epic gift card": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "exitlag": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "game pass": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80"
};

const FALLBACK_POSTER = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";

function cleanTitle(name) {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(?:PS4|PS5)\s*(?:Physical\s*)?Disc\b/gi, " ")
    .replace(/\b(?:PS4|PS5)\b/gi, " ")
    .replace(/\b(?:Physical\s*)?Disc\b/gi, " ")
    .replace(/\b(?:Standard|Deluxe|Premium|Ultimate|International|Anniversary|Collector's)\s+Edition\b/gi, " ")
    .replace(/\b(?:Pre-Owned|Pre Owned|Sealed|Pre-Order|Pre Order)\b/gi, " ")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveCover(val) {
  if (!val) return FALLBACK_POSTER;
  if (val.startsWith("http://") || val.startsWith("https://")) return val;
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${val}/library_600x900_2x.jpg`;
}

const sortedKeys = Object.entries(COVERS_MAP).sort((a, b) => b[0].length - a[0].length);

function getExactCover(name) {
  const rawLower = name.toLowerCase();
  if (rawLower.includes("minecraft")) {
    return "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80";
  }

  const cleaned = cleanTitle(name);

  if (COVERS_MAP[cleaned]) {
    return resolveCover(COVERS_MAP[cleaned]);
  }

  for (const [key, val] of sortedKeys) {
    if (cleaned.includes(key) || rawLower.includes(key)) {
      return resolveCover(val);
    }
  }

  return FALLBACK_POSTER;
}

// Read products_clean.json
const inputPath = path.join(__dirname, '..', 'src', 'products_clean.json');
const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

let steamMatches = 0;
let staticMatches = 0;
let fallbackMatches = 0;

const enriched = products.map((p) => {
  const coverUrl = getExactCover(p.name);
  if (coverUrl.includes("steamstatic.com")) steamMatches++;
  else if (coverUrl === FALLBACK_POSTER) fallbackMatches++;
  else staticMatches++;

  return {
    ...p,
    image: coverUrl
  };
});

fs.writeFileSync(inputPath, JSON.stringify(enriched, null, 2), 'utf8');

// Also update src/data/products_clean.json if it exists
const dataPath = path.join(__dirname, '..', 'src', 'data', 'products_clean.json');
if (fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify(enriched, null, 2), 'utf8');
}

console.log(`Successfully enriched ${enriched.length} products:`);
console.log(`- Steam vertical library covers: ${steamMatches}`);
console.log(`- Direct static covers: ${staticMatches}`);
console.log(`- Fallbacks: ${fallbackMatches}`);
