// src/utils/gameImages.js
// Maps game names to direct, high-resolution vertical box-art covers (Steam 600x900 or IGDB 2:3 vertical covers)

export const DIRECT_GAME_ART = {
  // EA Sports FC / FIFA (Year-specific)
  "fc 27": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  "fifa 23": "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_600x900_2x.jpg",
  "fifa 22": "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/library_600x900_2x.jpg",
  "fifa 21": "https://cdn.cloudflare.steamstatic.com/steam/apps/1313800/library_600x900_2x.jpg",
  "fifa 20": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsf.png",
  "fifa 19": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qse.png",
  "fifa 18": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsd.png",
  "fifa 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
  "fifa 16": "https://images.igdb.com/igdb/image/upload/t_cover_big/co204b.png",
  "fifa 15": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r79.png",
  "fifa 14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r78.png",
  "fifa 13": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png",
  "fifa 12": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",

  // WWE 2K Series (Year-specific)
  "wwe 2k24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2315690/library_600x900_2x.jpg",
  "wwe 2k23": "https://cdn.cloudflare.steamstatic.com/steam/apps/2115580/library_600x900_2x.jpg",
  "wwe 2k22": "https://cdn.cloudflare.steamstatic.com/steam/apps/1812440/library_600x900_2x.jpg",
  "wwe 2k20": "https://cdn.cloudflare.steamstatic.com/steam/apps/1015140/library_600x900_2x.jpg",
  "wwe 2k19": "https://cdn.cloudflare.steamstatic.com/steam/apps/817130/library_600x900_2x.jpg",
  "wwe 2k18": "https://cdn.cloudflare.steamstatic.com/steam/apps/664430/library_600x900_2x.jpg",
  "wwe 2k17": "https://cdn.cloudflare.steamstatic.com/steam/apps/518550/library_600x900_2x.jpg",
  "wwe 2k16": "https://cdn.cloudflare.steamstatic.com/steam/apps/385730/library_600x900_2x.jpg",
  "wwe 2k15": "https://cdn.cloudflare.steamstatic.com/steam/apps/240460/library_600x900_2x.jpg",
  "wwe 2k14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x1e.png",

  // Major Catalog & Mystery / Bundle Titles
  "gta v": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
  "grand theft auto v": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
  "gta iv": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg",
  "grand theft auto iv": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg",
  "grand theft auto vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta 6": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "grand theft auto san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "grand theft auto: san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "gta vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "grand theft auto vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "grand theft auto: vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "grand theft auto iii": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546970/library_600x900_2x.jpg",
  "the last of us part ii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us part 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us": "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",
  "god of war ragnarok": "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900_2x.jpg",
  "god of war iii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war": "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg",
  "uncharted legacy of thieves": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "uncharted 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "uncharted": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "steam random": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "mystery bundle": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "steam key": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "valorant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",

  // Additional Popular Catalog Titles
  "red dead redemption 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg",
  "red dead redemption": "https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/library_600x900_2x.jpg",
  "black myth wukong": "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg",
  "elden ring": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg",
  "sekiro": "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg",
  "cyberpunk 2077": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg",
  "forza horizon 5": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg",
  "forza horizon 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/library_600x900_2x.jpg",
  "spider man miles morales": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817190/library_600x900_2x.jpg",
  "spider man": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg",
  "horizon forbidden west": "https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/library_600x900_2x.jpg",
  "horizon zero dawn": "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg",
  "farming simulator 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2300320/library_600x900_2x.jpg",
  "farming simulator 22": "https://cdn.cloudflare.steamstatic.com/steam/apps/1248130/library_600x900_2x.jpg",
  "palworld": "https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/library_600x900_2x.jpg",
  "the forest": "https://cdn.cloudflare.steamstatic.com/steam/apps/242760/library_600x900_2x.jpg",
  "sons of the forest": "https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/library_600x900_2x.jpg",
  "sea of thieves": "https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/library_600x900_2x.jpg",
  "it takes two": "https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/library_600x900_2x.jpg",
  "snowrunner": "https://cdn.cloudflare.steamstatic.com/steam/apps/1465360/library_600x900_2x.jpg",
  "ranch simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/936960/library_600x900_2x.jpg",
  "cities skylines ii": "https://cdn.cloudflare.steamstatic.com/steam/apps/949230/library_600x900_2x.jpg",
  "cities skylines 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/949230/library_600x900_2x.jpg",
  "cities skylines": "https://cdn.cloudflare.steamstatic.com/steam/apps/949230/library_600x900_2x.jpg",
  "cricket 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2162600/library_600x900_2x.jpg",
  "cricket 26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2162600/library_600x900_2x.jpg",
  "f1 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900_2x.jpg",
  "tekken 7": "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/library_600x900_2x.jpg",
  "tekken 8": "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900_2x.jpg",
  "detroit become human": "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/library_600x900_2x.jpg",
  "detroit": "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/library_600x900_2x.jpg",
  "dying light": "https://cdn.cloudflare.steamstatic.com/steam/apps/239140/library_600x900_2x.jpg",
  "no mans sky": "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/library_600x900_2x.jpg",
  "hollow knight silksong": "https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/library_600x900_2x.jpg",
  "hollow knight": "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg",
  "onimusha": "https://cdn.cloudflare.steamstatic.com/steam/apps/761030/library_600x900_2x.jpg",
  "crimson desert": "https://cdn.cloudflare.steamstatic.com/steam/apps/3321460/library_600x900_2x.jpg",
  "riders republic": "https://cdn.cloudflare.steamstatic.com/steam/apps/2290180/library_600x900_2x.jpg",
  "nba 2k26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2878950/library_600x900_2x.jpg",
  "call of duty modern warfare iii": "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg",
  "call of duty modern warfare 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg",
  "call of duty modern warfare 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg",
  "call of duty modern warfare": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg",
  "arc raiders": "https://cdn.cloudflare.steamstatic.com/steam/apps/1808500/library_600x900_2x.jpg",
  "battlefield": "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/library_600x900_2x.jpg",
  "mafia the old country": "https://cdn.cloudflare.steamstatic.com/steam/apps/1994590/library_600x900_2x.jpg",
  "hitman world of assassination": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/library_600x900_2x.jpg",
  "hitman": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/library_600x900_2x.jpg",
  "nier": "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/library_600x900_2x.jpg",
  "the walking dead": "https://cdn.cloudflare.steamstatic.com/steam/apps/1449690/library_600x900_2x.jpg",
  "microsoft flight simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/2537590/library_600x900_2x.jpg",
  "flight simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/2537590/library_600x900_2x.jpg",
  "schedule i": "https://cdn.cloudflare.steamstatic.com/steam/apps/3164500/library_600x900_2x.jpg",
  "split fiction": "https://cdn.cloudflare.steamstatic.com/steam/apps/2001120/library_600x900_2x.jpg",
  "expedition 33": "https://cdn.cloudflare.steamstatic.com/steam/apps/1903380/library_600x900_2x.jpg",
  "clair obscur": "https://cdn.cloudflare.steamstatic.com/steam/apps/1903380/library_600x900_2x.jpg",
  "assassins creed": "https://cdn.cloudflare.steamstatic.com/steam/apps/2851900/library_600x900_2x.jpg",
  "black flag": "https://cdn.cloudflare.steamstatic.com/steam/apps/242050/library_600x900_2x.jpg",
  "rust": "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/library_600x900_2x.jpg",
  "ark survival evolved": "https://cdn.cloudflare.steamstatic.com/steam/apps/346110/library_600x900_2x.jpg",
  "euro truck simulator 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/227300/library_600x900_2x.jpg",
  "naruto shippuden ultimate ninja storm 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/349040/library_600x900_2x.jpg",
  "naruto shippuden ultimate ninja storm 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/234670/library_600x900_2x.jpg",
  "free fire": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "pubg mobile": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
  "genshin impact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2040.png",
  "fortnite": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png",
  "league of legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png"
};

export const FALLBACK_POSTER = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";

export function cleanGameTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/ps[45]\s*(disc|game|edition)?/gi, '')
    .replace(/pre-owned|sealed|remastered|standard edition|deluxe edition|premium edition|ultimate edition/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getGameCover(title) {
  if (!title) return FALLBACK_POSTER;

  // 1. Clean extra platform / condition text
  const clean = cleanGameTitle(title);

  // 2. Specific year extraction for sports / wrestling franchises:
  const yearMatch = clean.match(/(1[2-9]|2[0-7])/);
  if (clean.includes('fifa') && yearMatch) {
    const key = `fifa ${yearMatch[1]}`;
    if (DIRECT_GAME_ART[key]) return DIRECT_GAME_ART[key];
  }
  if ((clean.includes('fc') || clean.includes('ea sports')) && yearMatch) {
    const key = `fc ${yearMatch[1]}`;
    if (DIRECT_GAME_ART[key]) return DIRECT_GAME_ART[key];
  }
  if (clean.includes('wwe') && yearMatch) {
    const key = `wwe 2k${yearMatch[1]}`;
    if (DIRECT_GAME_ART[key]) return DIRECT_GAME_ART[key];
  }

  // 3. Match keys sorted by string length descending (longest match wins first)
  const sortedKeys = Object.keys(DIRECT_GAME_ART).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (clean.includes(key)) {
      return DIRECT_GAME_ART[key];
    }
  }

  return FALLBACK_POSTER;
}

export function getGameCoverFallback() {
  return FALLBACK_POSTER;
}
