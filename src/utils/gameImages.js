// src/utils/gameImages.js
// Comprehensive Steam App ID Dictionary and Image Resolver

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";

export const STEAM_APP_MAP = {
  // FIFA 22: 1506830
  "fifa 22": "1506830",

  // FIFA 23 / EA FC 24 / EA FC 25: 2195250
  "fifa 23": "2195250",
  "ea fc 24": "2195250",
  "ea sports fc 24": "2195250",
  "ea fc 25": "2195250",
  "ea sports fc 25": "2195250",
  "ea fc 26": "2195250",
  "ea sports fc 26": "2195250",
  "ea fc 27": "2195250",
  "ea sports fc 27": "2195250",
  "ea fc": "2195250",
  "fifa 21": "1313860",
  "fifa 20": "1506830",
  "fifa 19": "1506830",
  "fifa 18": "1506830",
  "fifa 16": "1506830",
  "fifa": "2195250",

  // WWE 2K22 / 2K23 / 2K24: 2315690
  "wwe 2k24": "2315690",
  "wwe 2k23": "2315690",
  "wwe 2k22": "2315690",
  "wwe 2k20": "1015830",
  "wwe 2k18": "1015830",
  "wwe 2k17": "1015830",
  "wwe 2k": "2315690",
  "wwe": "2315690",

  // Naruto Shippuden Ultimate Ninja Storm 4: 349040
  "naruto shippuden ultimate ninja storm 4": "349040",
  "naruto x boruto ultimate ninja storm connections": "1020790",
  "naruto ultimate ninja storm": "349040",
  "naruto storm": "349040",
  "naruto": "349040",

  // God of War Ragnarok: 2322010 (must come before God of War)
  "god of war ragnarok": "2322010",
  "god of war ragnarök": "2322010",

  // God of War: 1593500
  "god of war 2018": "1593500",
  "god of war": "1593500",

  // Uncharted Legacy of Thieves: 1659420
  "uncharted legacy of thieves collection": "1659420",
  "uncharted legacy of thieves": "1659420",
  "uncharted": "1659420",

  // GTA V / Grand Theft Auto: 271590
  "gta v": "271590",
  "grand theft auto v": "271590",
  "gta 5": "271590",
  "grand theft auto san andreas": "1547000",
  "gta vice city": "1546990",
  "grand theft auto": "271590",
  "gta": "271590",

  // The Last of Us: 1888930
  "the last of us part i": "1888930",
  "the last of us part ii": "1888930",
  "the last of us remastered": "1888930",
  "the last of us": "1888930",
  "last of us": "1888930",

  // Spider-Man: 1817070
  "marvels spider man remastered": "1817070",
  "marvels spider man miles morales": "1817190",
  "marvels spider man": "1817070",
  "spider man remastered": "1817070",
  "spider man miles morales": "1817190",
  "spider man": "1817070",
  "spiderman": "1817070",

  // Cyberpunk 2077: 1091500
  "cyberpunk 2077": "1091500",
  "cyberpunk": "1091500",

  // Black Myth Wukong: 2358720
  "black myth wukong": "2358720",
  "wukong": "2358720",

  // Elden Ring: 1245620
  "elden ring": "1245620",

  // Rust: 252490
  "rust": "252490",

  // Ark: 346110
  "ark survival ascended": "2399830",
  "ark survival evolved": "346110",
  "ark": "346110",

  // Forza Horizon 5: 1551360
  "forza horizon 5": "1551360",
  "forza horizon 4": "1293830",
  "forza horizon 6": "1551360",
  "forza horizon": "1551360",
  "forza": "1551360",

  // Euro Truck Simulator 2: 227300
  "euro truck simulator 2": "227300",
  "euro truck 2": "227300",
  "euro truck": "227300",

  // Additional catalog hits
  "red dead redemption 2": "1174180",
  "red dead redemption": "1174180",
  "sekiro shadows die twice": "814380",
  "sekiro": "814380",
  "horizon zero dawn": "1151640",
  "horizon forbidden west": "2420110",
  "call of duty modern warfare iii": "2519060",
  "call of duty modern warfare 2": "1938090",
  "call of duty modern warfare": "1938090",
  "call of duty": "1938090",
  "modern warfare": "1938090",
  "farming simulator 25": "2300320",
  "farming simulator 22": "1248130",
  "farming simulator": "2300320",
  "palworld": "1623730",
  "the forest": "242760",
  "sons of the forest": "1326470",
  "sea of thieves": "1172620",
  "it takes two": "1426210",
  "snowrunner": "1465360",
  "ranch simulator": "936960",
  "cities skylines ii": "949230",
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
  "schedule i": "3164500",
  "split fiction": "2001120"
};

export function cleanGameTitle(name) {
  if (!name) return '';
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ') // Strip any text inside parentheses: (Sealed), (Pre-Owned), etc.
    .replace(/\b(?:ps4|ps5)\s*(?:physical\s*)?disc\b/g, ' ')
    .replace(/\s*(?:\/|\b)(?:ps4|ps5)(?:\s*\/\s*(?:ps4|ps5))?\b/g, ' ')
    .replace(/\b(?:physical\s*)?disc\b/g, ' ')
    .replace(/\b(?:standard|deluxe|premium|ultimate|international|anniversary|40th anniversary|resynced deluxe|2026 season|pro international)\s+edition\b/g, ' ')
    .replace(/\benhanced rockstar key\b/g, ' ')
    .replace(/\bpre[- ]?order\b/g, ' ')
    .replace(/\+\s*(?:all dlcs|the man of honor dlc)\b/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getGameCover(name) {
  if (!name) return FALLBACK_IMAGE;

  // Minecraft specific image
  if (name.toLowerCase().includes('minecraft')) {
    return "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80";
  }

  const cleaned = cleanGameTitle(name);

  // 1. Exact cleaned match
  if (STEAM_APP_MAP[cleaned]) {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${STEAM_APP_MAP[cleaned]}/library_600x900_2x.jpg`;
  }

  // 2. Substring matching with keys sorted by length descending
  const sortedKeys = Object.keys(STEAM_APP_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (cleaned.includes(key)) {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${STEAM_APP_MAP[key]}/library_600x900_2x.jpg`;
    }
  }

  // 3. Unsplash gaming fallback
  return FALLBACK_IMAGE;
}

export function getGameCoverFallback() {
  return FALLBACK_IMAGE;
}
