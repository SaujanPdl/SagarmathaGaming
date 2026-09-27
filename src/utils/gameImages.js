// src/utils/gameImages.js
// Maps game names to direct, high-resolution vertical CDN box-art covers (2:3 aspect ratio / 600x900)

export const FALLBACK_POSTER = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";
export const MINECRAFT_COVER = "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80";

// Comprehensive catalog cover dictionary: supports direct image URLs and Steam App IDs
const GAME_COVER_MAP = {
  // 1. Non-Steam & Launcher Titles (direct 2:3 vertical covers)
  "valorant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "league of legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png",
  "fortnite": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png",
  "genshin impact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2040.png",
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",

  // 2. Exact EA Sports & FIFA years (prioritized before generic sports keys)
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
  "fifa 20": "1225580",
  "fifa 19": "976310",
  "fifa 18": "782330",
  "fifa 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
  "ea sports fc": "2669320",
  "ea fc": "2669320",
  "fifa": "1811260",

  // 3. Major Steam & Console Catalog Titles
  "grand theft auto v": "271590",
  "grand theft auto": "271590",
  "gta v": "271590",
  "gta 5": "271590",
  "god of war ragnarok": "2322010",
  "god of war": "1593500",
  "uncharted legacy of thieves": "1659420",
  "uncharted": "1659420",
  "the last of us": "1888930",
  "last of us": "1888930",
  "wwe 2k24": "2315690",
  "wwe 2k23": "2315690",
  "wwe 2k22": "2315690",
  "wwe 2k20": "1015830",
  "wwe 2k": "2315690",
  "naruto shippuden ultimate ninja storm 4": "349040",
  "naruto shippuden ultimate ninja storm": "349040",
  "naruto storm 4": "349040",
  "naruto ultimate ninja storm": "349040",
  "naruto storm": "349040",
  "naruto": "349040",
  "cyberpunk 2077": "1091500",
  "cyberpunk": "1091500",
  "black myth wukong": "2358720",
  "black myth": "2358720",
  "wukong": "2358720",
  "elden ring": "1245620",
  "rust": "252490",
  "ark survival evolved": "346110",
  "ark survival": "346110",
  "ark": "346110",
  "forza horizon 5": "1551360",
  "forza horizon 4": "1293830",
  "forza horizon": "1551360",
  "euro truck simulator 2": "227300",
  "euro truck simulator": "227300",
  "euro truck": "227300",
  "spider man": "1817070",
  "red dead redemption 2": "1174180",
  "red dead redemption": "1174180",
  "sekiro shadows die twice": "814380",
  "sekiro": "814380",
  "horizon forbidden west": "2420110",
  "horizon zero dawn": "1151640",
  "farming simulator 25": "2300320",
  "farming simulator 22": "1248130",
  "farming simulator": "2300320",
  "palworld": "1623730",
  "sons of the forest": "1326470",
  "the forest": "242760",
  "sea of thieves": "1172620",
  "it takes two": "1426210",
  "snowrunner": "1465360",
  "ranch simulator": "936960",
  "cities skylines ii": "949230",
  "cities skylines 2": "949230",
  "cities skylines": "949230",
  "cricket 24": "2162600",
  "cricket 26": "2162600",
  "f1 25": "2488620",
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
  "call of duty modern warfare iii": "2519060",
  "call of duty modern warfare 3": "2519060",
  "call of duty modern warfare 2": "1938090",
  "call of duty modern warfare": "1938090",
  "arc raiders": "1808500",
  "battlefield": "1517290",
  "mafia the old country": "1994590",
  "hitman world of assassination": "1659040",
  "hitman": "1659040",
  "nier": "524220",
  "the walking dead": "1449690",
  "microsoft flight simulator": "2537590",
  "flight simulator": "2537590",
  "schedule i": "3164500",
  "split fiction": "2001120",
  "expedition 33": "1903380",
  "clair obscur": "1903380",
  "assassins creed iv black flag": "242050",
  "black flag": "242050",
  "assassins creed shadows": "2851900",
  "assassins creed": "2851900",
  "wolverine": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80",
  "gta 6": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "free fire": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "pubg mobile": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80"
};

// Clean the game title string: strip /\(.*?\)/g, PS4 Disc, PS5 Disc, Pre-Owned, Sealed, and all non-alphanumeric punctuation
export function cleanGameTitle(name) {
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

// Converts Steam app IDs to full CDN URLs or returns direct HTTP(S) URLs
const resolveCoverUrl = (target) => {
  if (!target) return FALLBACK_POSTER;
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${target}/library_600x900_2x.jpg`;
};

// Sorted dictionary keys by length in descending order (longest match first)
const sortedEntries = Object.entries(GAME_COVER_MAP).sort((a, b) => b[0].length - a[0].length);

export function getGameCover(name) {
  if (!name) return FALLBACK_POSTER;

  const rawLower = name.toLowerCase();
  if (rawLower.includes("minecraft")) {
    return MINECRAFT_COVER;
  }

  const cleaned = cleanGameTitle(name);
  if (!cleaned) return FALLBACK_POSTER;

  if (cleaned.includes("minecraft")) {
    return MINECRAFT_COVER;
  }

  // 1. Exact cleaned match
  if (GAME_COVER_MAP[cleaned]) {
    return resolveCoverUrl(GAME_COVER_MAP[cleaned]);
  }

  // 2. Longest substring match (prevents generic collisions like "fifa" matching before "fifa 18" or "fc 25")
  for (const [key, target] of sortedEntries) {
    if (cleaned.includes(key) || rawLower.includes(key)) {
      return resolveCoverUrl(target);
    }
  }

  return FALLBACK_POSTER;
}

export function getGameCoverFallback() {
  return FALLBACK_POSTER;
}
