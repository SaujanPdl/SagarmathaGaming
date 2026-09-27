// src/utils/gameImages.js
// Maps game names to direct high-resolution vertical box-art covers (Steam 600x900 or IGDB 2:3 vertical covers)

export const FALLBACK_POSTER = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";
export const MINECRAFT_COVER = "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80";

// Comprehensive franchise & standalone dictionary mapping cleaned titles to Steam App IDs or direct image URLs
export const GAME_COVER_MAP = {
  // 1. EA Sports FC / FIFA (Every year MUST map to its own cover)
  "ea sports fc 27": "2669320",
  "ea fc 27": "2669320",
  "fc 27": "2669320",
  "ea sports fc 26": "2669320",
  "ea fc 26": "2669320",
  "fc 26": "2669320",
  "ea sports fc 25": "2669320",
  "ea fc 25": "2669320",
  "fc 25": "2669320",
  "ea sports fc 24": "2195250",
  "ea fc 24": "2195250",
  "fc 24": "2195250",
  "ea sports fc": "2195250",
  "ea fc": "2195250",
  "fifa 23": "1811260",
  "fifa 22": "1506830",
  "fifa 21": "1313800",
  "fifa 20": "1225580",
  "fifa 19": "976310",
  "fifa 18": "782330",
  "fifa 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
  "fifa 16": "https://images.igdb.com/igdb/image/upload/t_cover_big/co204b.png",
  "fifa 15": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r79.png",
  "fifa 14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r78.png",
  "fifa 13": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png",
  "fifa 12": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",

  // 2. WWE 2K Series
  "wwe 2k24": "2315690",
  "wwe 2k23": "2115580",
  "wwe 2k22": "1812440",
  "wwe 2k20": "1015140",
  "wwe 2k19": "817130",
  "wwe 2k18": "664430",
  "wwe 2k17": "518550",
  "wwe 2k16": "385730",
  "wwe 2k15": "240460",
  "wwe 2k14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x1e.png",

  // 3. Grand Theft Auto Series
  "grand theft auto vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta 6": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "grand theft auto v": "271590",
  "gta v": "271590",
  "gta 5": "271590",
  "grand theft auto iv": "12210",
  "gta iv": "12210",
  "gta 4": "12210",
  "grand theft auto: san andreas": "1547000",
  "grand theft auto san andreas": "1547000",
  "gta san andreas": "1547000",
  "san andreas": "1547000",
  "grand theft auto: vice city": "1546990",
  "grand theft auto vice city": "1546990",
  "gta vice city": "1546990",
  "vice city": "1546990",
  "grand theft auto iii": "1546970",
  "grand theft auto 3": "1546970",
  "gta 3": "1546970",

  // 4. God of War Series
  "god of war ragnarok": "2322010",
  "god of war iii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war": "1593500",

  // 5. Popular Shooters & Standalone Titles
  "valorant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "naruto shippuden ultimate ninja storm 4": "349040",
  "naruto shippuden ultimate ninja storm 3": "234670",
  "naruto storm 4": "349040",
  "naruto storm 3": "234670",
  "uncharted legacy of thieves": "1659420",
  "uncharted 4": "1659420",
  "the last of us part ii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us part 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us part i": "1888930",
  "the last of us part 1": "1888930",
  "the last of us": "1888930",
  "red dead redemption 2": "1174180",
  "red dead redemption": "2668510",
  "black myth wukong": "2358720",
  "black myth": "2358720",
  "wukong": "2358720",
  "elden ring": "1245620",
  "sekiro shadows die twice": "814380",
  "sekiro": "814380",
  "cyberpunk 2077": "1091500",
  "forza horizon 5": "1551360",
  "forza horizon 4": "1293830",

  // 6. Additional Catalog Games
  "spider man miles morales": "1817190",
  "marvels spider man": "1817070",
  "spider man": "1817070",
  "horizon forbidden west": "2420110",
  "horizon zero dawn": "1151640",
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
  "cities skylines 2": "949230",
  "cities skylines": "949230",
  "cricket 26": "2162600",
  "cricket 24": "2162600",
  "f1 25": "2488620",
  "f1 24": "2488620",
  "tekken 8": "1778820",
  "tekken 7": "389730",
  "detroit become human": "1222140",
  "detroit": "1222140",
  "dying light": "239140",
  "no mans sky": "275850",
  "hollow knight silksong": "1030300",
  "hollow knight": "367520",
  "onimusha": "761030",
  "crimson desert": "3321460",
  "riders republic": "2290180",
  "nba 2k26": "2878950",
  "nba 2k25": "2878950",
  "nba 2k24": "2338770",
  "call of duty modern warfare iii": "2519060",
  "call of duty modern warfare 3": "2519060",
  "call of duty modern warfare 2": "1938090",
  "call of duty modern warfare ii": "1938090",
  "call of duty modern warfare": "1938090",
  "arc raiders": "1808500",
  "battlefield 6": "1517290",
  "battlefield": "1517290",
  "mafia the old country": "1994590",
  "hitman world of assassination": "1659040",
  "hitman": "1659040",
  "nier automata": "524220",
  "nier": "524220",
  "the walking dead": "1449690",
  "microsoft flight simulator": "2537590",
  "flight simulator": "2537590",
  "schedule i": "3164500",
  "split fiction": "2001120",
  "clair obscur expedition 33": "1903380",
  "clair obscur": "1903380",
  "expedition 33": "1903380",
  "assassins creed": "2851900",
  "black flag": "242050",
  "rust": "252490",
  "ark survival evolved": "346110",
  "ark survival": "346110",
  "euro truck simulator 2": "227300",
  "euro truck simulator": "227300",
  "genshin impact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2040.png",
  "fortnite": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png",
  "league of legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png",
  "free fire": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "pubg mobile": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80"
};

// Sort all dictionary keys strictly by length in descending order
const sortedEntries = Object.entries(GAME_COVER_MAP).sort((a, b) => b[0].length - a[0].length);

// Normalize the title: lowercase, remove brackets, remove console/edition flags
export function cleanGameTitle(name) {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/\[.*?\]/g, " ")
    .replace(/\b(?:ps4|ps5)\s*(?:physical\s*)?disc\b/gi, " ")
    .replace(/\b(?:ps4|ps5)\b/gi, " ")
    .replace(/\b(?:physical\s*)?disc\b/gi, " ")
    .replace(/\b(?:standard|deluxe|premium|ultimate|international|anniversary|collector's|collectors)\s+edition\b/gi, " ")
    .replace(/\b(?:pre-owned|pre owned|sealed|pre-order|pre order)\b/gi, " ")
    .replace(/['’]/g, "")
    .replace(/[:\-–—_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveCoverUrl(value) {
  if (!value) return FALLBACK_POSTER;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${value}/library_600x900_2x.jpg`;
}

export function getGameCover(name) {
  if (!name) return FALLBACK_POSTER;

  const rawLower = name.toLowerCase();
  if (rawLower.includes("minecraft")) {
    return MINECRAFT_COVER;
  }

  const cleaned = cleanGameTitle(name);
  if (!cleaned) return FALLBACK_POSTER;

  // 1. Direct exact match in dictionary
  if (GAME_COVER_MAP[cleaned]) {
    return resolveCoverUrl(GAME_COVER_MAP[cleaned]);
  }

  // 2. Substring match evaluated by descending key length
  for (const [key, value] of sortedEntries) {
    if (cleaned.includes(key) || rawLower.includes(key)) {
      return resolveCoverUrl(value);
    }
  }

  return FALLBACK_POSTER;
}

export function getGameCoverFallback() {
  return FALLBACK_POSTER;
}
