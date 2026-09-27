// src/utils/gameImages.js
// High-resolution Steam CDN vertical box art and fallback provider for Hamro Gaming Store

export const DIRECT_URL_MAP = {
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "free fire": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "pubg mobile uid topup": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
  "valorant php": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "genshin impact": "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
  "marvels wolverine": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80",
  "gta 6": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
};

export const STEAM_APP_MAP = {
  // GTA V / Grand Theft Auto V
  "gta v": "271590",
  "grand theft auto v": "271590",
  "gta v premium edition": "271590",
  "grand theft auto san andreas": "1547000",
  "gta vice city": "1546990",
  "red dead redemption 2": "1174180",
  "red dead redemption": "1174180",

  // PlayStation Studios
  "god of war 2018": "1593500",
  "god of war": "1593500",
  "god of war ragnarok": "2322010",
  "uncharted legacy of thieves": "1659420",
  "uncharted legacy of thieves collection": "1659420",
  "uncharted": "1659420",
  "the last of us part i": "1888930",
  "the last of us part 1": "1888930",
  "the last of us part ii": "1888930",
  "the last of us part 2": "1888930",
  "the last of us remastered": "1888930",
  "the last of us": "1888930",
  "marvels spider man remastered": "1817070",
  "marvels spider man miles morales": "1817190",
  "marvels spider man": "1817070",
  "spider man remastered": "1817070",
  "spider man miles morales": "1817190",
  "spider man": "1817070",
  "horizon zero dawn": "1151640",
  "horizon forbidden west": "2420110",
  "detroit": "1222140",

  // WWE 2K22 / 2K23 / 2K24
  "wwe 2k24": "2315690",
  "wwe 2k23": "2315690",
  "wwe 2k22": "2315690",
  "wwe 2k20": "1015830",
  "wwe 2k18": "1015830",
  "wwe 2k17": "1015830",
  "wwe 2k": "2315690",

  // FIFA 22 / 23 / EA FC 24 / EA FC 25 / 26 / 27
  "fifa 22": "2195250",
  "fifa 23": "2195250",
  "ea fc 24": "2195250",
  "ea sports fc 24": "2195250",
  "ea fc 25": "2195250",
  "ea sports fc 25": "2195250",
  "ea fc 26": "2195250",
  "ea sports fc 26": "2195250",
  "ea fc 27": "2195250",
  "ea sports fc 27": "2195250",
  "fifa 21": "1313860",
  "fifa 20": "1506830",
  "fifa 19": "1506830",
  "fifa 18": "1506830",
  "fifa 16": "1506830",
  "fifa": "2195250",

  // Naruto Shippuden Ultimate Ninja Storm 4
  "naruto shippuden ultimate ninja storm 4": "349040",
  "naruto x boruto ultimate ninja storm connections": "1020790",
  "naruto ultimate ninja storm collection": "349040",
  "naruto storm": "349040",

  // Action / RPG Hits
  "cyberpunk 2077": "1091500",
  "black myth wukong": "2358720",
  "elden ring": "1245620",
  "sekiro shadows die twice": "814380",
  "sekiro": "814380",

  // Call of Duty / Modern Warfare
  "call of duty modern warfare iii": "2519060",
  "call of duty modern warfare 2": "1938090",
  "call of duty modern warfare": "1938090",
  "call of duty": "1938090",
  "modern warfare": "1938090",

  // Racing & Simulators
  "forza horizon 5": "1551360",
  "forza horizon 4": "1293830",
  "forza horizon 6": "1551360",
  "forza horizon": "1551360",
  "euro truck simulator 2": "227300",
  "euro truck 2": "227300",
  "farming simulator 25": "2300320",
  "farming simulator 22": "1248130",
  "farming simulator": "2300320",
  "microsoft flight simulator 2024": "2537590",
  "microsoft flight simulator 2020": "1250410",
  "microsoft flight simulator x": "314160",
  "snowrunner": "1465360",
  "ranch simulator": "936960",
  "cities skylines ii": "949230",
  "cricket 24": "2162600",
  "cricket 26": "2162600",
  "f1 25": "2488620",

  // Survival & Co-op
  "rust": "252490",
  "ark survival evolved": "2399830",
  "ark survival ascended": "2399830",
  "ark": "2399830",
  "palworld": "1623730",
  "the forest": "242760",
  "sons of the forest": "1326470",
  "sea of thieves": "1172620",
  "it takes two": "1426210",
  "no mans sky": "275850",
  "dying light": "239140",

  // Other Major Catalog Titles
  "hollow knight silksong": "1030300",
  "hollow knight": "367520",
  "tekken 7": "389730",
  "riders republic": "2290180",
  "nba 2k26": "2878950",
  "arc raiders": "1808500",
  "battlefield 6": "1517290",
  "clair obscur expedition 33": "1903340",
  "mafia the old country": "1994590",
  "hitman world of assassination": "1659040",
  "nier game of the yorha edition": "524220",
  "the walking dead the telltale definitive series": "1449690",
  "assassins creed iv black flag": "242050",
  "onimusha": "761030",
  "where winds meet": "2534570",
  "crimson desert": "3321460",
  "schedule i": "3164500",
  "split fiction": "2001120"
};

export function cleanGameTitle(name) {
  if (!name) return '';
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s*\((?:sealed|pre[- ]?owned|2018|global region)\)\s*/gi, ' ')
    .replace(/\b(?:PS4|PS5)\s*(?:Physical\s*)?Disc\b/gi, ' ')
    .replace(/\s*(?:\/|\b)(?:PS4|PS5)(?:\s*\/\s*(?:PS4|PS5))?\b/gi, ' ')
    .replace(/\b(?:Physical\s*)?Disc\b/gi, ' ')
    .replace(/\b(?:Standard|Deluxe|Premium|Ultimate|International|Anniversary|40th Anniversary|Resynced Deluxe|2026 Season|Pro International)\s+Edition\b/gi, ' ')
    .replace(/\bEnhanced Rockstar Key\b/gi, ' ')
    .replace(/\bPre[- ]?Order\b/gi, ' ')
    .replace(/\+\s*(?:All DLCs|The Man of Honor DLC)\b/gi, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeKey(str) {
  return cleanGameTitle(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function makeFallbackCover(name) {
  const cleanName = cleanGameTitle(name || 'Gaming');
  const initials = cleanName.split(/\s+/).filter(Boolean).slice(0, 3).map((w) => w[0]).join('').toUpperCase() || 'HGS';
  const safeTitle = cleanName.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const safeInitials = initials.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#141c2e"/><stop offset=".55" stop-color="#0c121e"/><stop offset="1" stop-color="#06090f"/></linearGradient><radialGradient id="glow"><stop stop-color="#00e5ff" stop-opacity=".35"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></radialGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#7e9bbd" stroke-opacity=".07"/></pattern></defs><path fill="url(#bg)" d="M0 0h600v900H0z"/><ellipse cx="430" cy="310" rx="280" ry="320" fill="url(#glow)"/><path fill="url(#grid)" d="M0 0h600v900H0z"/><path d="M48 450h504" stroke="#00e5ff" stroke-opacity=".45"/><text x="48" y="76" fill="#00e5ff" font-family="system-ui,sans-serif" font-size="16" font-weight="800" letter-spacing="4">HAMRO GAMING</text><text x="36" y="380" fill="#f2f7ff" fill-opacity=".1" font-family="system-ui,sans-serif" font-size="220" font-weight="900">${safeInitials}</text><text x="48" y="535" fill="#f4f7fc" font-family="system-ui,sans-serif" font-size="34" font-weight="800">${safeTitle.slice(0, 26)}</text><text x="48" y="580" fill="#f4f7fc" font-family="system-ui,sans-serif" font-size="34" font-weight="800">${safeTitle.slice(26, 52)}</text><text x="48" y="830" fill="#7d8ea5" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="3">DIGITAL BOX ART</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getGameCover(name) {
  if (!name) return makeFallbackCover('Gaming');

  const lowerName = name.toLowerCase();

  // Minecraft special override
  if (lowerName.includes('minecraft')) {
    return DIRECT_URL_MAP["minecraft"];
  }

  // Direct custom overrides
  for (const [key, url] of Object.entries(DIRECT_URL_MAP)) {
    if (lowerName.includes(key)) {
      return url;
    }
  }

  const cleaned = cleanGameTitle(name).toLowerCase();
  const normClean = normalizeKey(name);

  // Exact normalized match in STEAM_APP_MAP
  for (const [key, appId] of Object.entries(STEAM_APP_MAP)) {
    if (normalizeKey(key) === normClean) {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`;
    }
  }

  // Exact cleaned string match
  if (STEAM_APP_MAP[cleaned]) {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${STEAM_APP_MAP[cleaned]}/library_600x900_2x.jpg`;
  }

  // Substring match sorted by key length descending (prevents short prefixes matching first)
  const sortedKeys = Object.keys(STEAM_APP_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    const nk = normalizeKey(key);
    if (nk.length >= 3 && normClean.includes(nk)) {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${STEAM_APP_MAP[key]}/library_600x900_2x.jpg`;
    }
  }

  return makeFallbackCover(name);
}

export function getGameCoverFallback(name) {
  return makeFallbackCover(name);
}
