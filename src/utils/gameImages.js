// src/utils/gameImages.js
// Maps game names to direct, high-resolution vertical CDN box-art covers (600x900)

const STEAM_APP_MAP = {
  "ARK Survival Evolved": "346110",
  "Riders Republic": "2290180",
  "EA FC 26": "2195250",
  "Euro Truck Simulator 2": "227300",
  "EA FC 25": "2195250",
  "It Takes Two": "1426210",
  "NBA 2K26": "2878950",
  "Rust": "252490",
  "Red Dead Redemption 2": "1174180",
  "GTA V Premium Edition": "271590",
  "GTA V": "271590",
  "Call of Duty: Modern Warfare": "1938090",
  "Call of Duty: Modern Warfare 2": "1938090",
  "Call of Duty: Modern Warfare III": "2519060",
  "ARC Raiders": "1808500",
  "Battlefield 6": "1517290",
  "F1 25: 2026 Season Edition": "2488620",
  "F1 25": "2488620",
  "EA SPORTS FC 27 Ultimate Edition": "2195250",
  "EA SPORTS FC 27 Standard Edition PS4/PS5": "2195250",
  "Tekken 7": "389730",
  "Ranch Simulator": "936960",
  "Dying Light – Anniversary Edition": "239140",
  "WWE 2K20": "1015830",
  "Detroit": "1222140",
  "Hollow Knight": "367520",
  "The Forest": "242760",
  "WWE 2K24": "2315690",
  "Microsoft Flight Simulator X": "314160",
  "Sons of the Forest": "1326470",
  "SnowRunner": "1465360",
  "GTA Vice City": "1546990",
  "Grand Theft Auto: San Andreas": "1547000",
  "Horizon Forbidden West": "2420110",
  "Hollow Knight: Silksong": "1030300",
  "Cyberpunk 2077 Ultimate Edition": "1091500",
  "Black Myth: Wukong Deluxe Edition": "2358720",
  "NARUTO Ultimate Ninja STORM Collection": "2878950",
  "Mafia: The Old Country Deluxe Edition + The Man of Honor DLC": "1994590",
  "HITMAN World of Assassination Deluxe Edition + All DLCs": "1659040",
  "NieR: Game of the YoRHa Edition": "524220",
  "The Walking Dead: The Telltale Definitive Series": "1449690",
  "Farming Simulator 25": "2300320",
  "Palworld": "1623730",
  "Sea of Thieves 2026 Deluxe Edition": "1172620",
  "No Man's Sky": "275850",
  "Forza Horizon 4 Ultimate Edition": "1293830",
  "Forza Horizon 5 Premium Edition": "1551360",
  "Cities: Skylines II": "949230",
  "Cricket 24 International Edition": "2162600",
  "Microsoft Flight Simulator 2024": "2537590"
};

const DIRECT_URL_MAP = {
  "Free Fire": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
  "PUBG Mobile UID Topup": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
  "Valorant PHP": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "Genshin Impact": "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
  "Minecraft Java & Bedrock Edition Premium New Account": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "God of War Ragnarök PS5 Disc (Sealed)": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "Marvel's Wolverine PS5": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80",
  "GTA 6 Standard Edition Pre-Order": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
};

const LAST_OF_US_COVER = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80";

function cleanGameTitle(name) {
  return name
    .replace(/\s*\((?:sealed|pre[- ]?owned)\)\s*/gi, '')
    .replace(/\b(?:PS4|PS5)\s*(?:Physical\s*)?Disc\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeFallbackCover(name) {
  const cleanName = cleanGameTitle(name || 'Gaming')
  const initials = cleanName.split(/\s+/).filter(Boolean).slice(0, 3).map((word) => word[0]).join('').toUpperCase() || 'GG'
  const safeTitle = cleanName.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const safeInitials = initials.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#18223a"/><stop offset=".58" stop-color="#101725"/><stop offset="1" stop-color="#080c14"/></linearGradient><radialGradient id="light"><stop stop-color="#00e5ff" stop-opacity=".42"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></radialGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#a9bdd9" stroke-opacity=".08"/></pattern></defs><path fill="url(#background)" d="M0 0h600v900H0z"/><ellipse cx="430" cy="330" rx="300" ry="360" fill="url(#light)"/><path fill="url(#grid)" d="M0 0h600v900H0z"/><path d="M48 465h504" stroke="#00e5ff" stroke-opacity=".6"/><text x="48" y="82" fill="#00e5ff" font-family="Arial,sans-serif" font-size="19" font-weight="800" letter-spacing="5">HAMRO GAMING</text><text x="35" y="400" fill="#f2f7ff" fill-opacity=".12" font-family="Arial,sans-serif" font-size="236" font-weight="900">${safeInitials}</text><text x="48" y="555" fill="#f4f7fc" font-family="Arial,sans-serif" font-size="36" font-weight="800">${safeTitle.slice(0, 29)}</text><text x="48" y="604" fill="#f4f7fc" font-family="Arial,sans-serif" font-size="36" font-weight="800">${safeTitle.slice(29, 58)}</text><text x="48" y="842" fill="#b4c4da" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="4">DIGITAL GAME COVER</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getGameCover(name) {
  if (!name) return makeFallbackCover('Gaming');

  const cleanName = cleanGameTitle(name)

  // 1. Direct custom override
  if (DIRECT_URL_MAP[name]) return DIRECT_URL_MAP[name];
  if (DIRECT_URL_MAP[cleanName]) return DIRECT_URL_MAP[cleanName];
  if (/\bthe last of us\b/i.test(cleanName)) return LAST_OF_US_COVER;

  // 2. Steam App Match
  for (const [title, appId] of Object.entries(STEAM_APP_MAP)) {
    if (cleanName.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(cleanName.toLowerCase())) {
      return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`;
    }
  }

  // 3. Category/Genre based fallback aesthetic
  return "https://images.unsplash.com/photo-1612287232049-74d3fb361dc9?w=600&auto=format&fit=crop&q=80";
}

export function getGameCoverFallback(name) {
  return makeFallbackCover(name)
}
