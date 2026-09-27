// src/utils/gameImages.js
// Maps game names to direct high-resolution vertical box-art covers (Steam 600x900, IGDB 2:3 vertical covers, or dynamic SVG)

export const DIRECT_ART = {
  // Gift Cards & Wallets
  "roblox": "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
  "steam gift card": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "steam wallet": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "playstation gift card": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
  "psn card": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
  "xbox gift card": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80",
  "apple gift card": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
  "google play": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&auto=format&fit=crop&q=80",
  "discord nitro": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80",
  "discord": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80",
  "nintendo": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop&q=80",
  "battle.net": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "exitlag": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "netflix": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
  "ea gift card": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
  "epic gift card": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "xbox game pass": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80",
  "game pass": "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80",

  // Minecraft Variants
  "minecraft": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "minecraft java": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",
  "minecraft bedrock": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80",

  // Mystery Keys & Bundles
  "vip mystery bundle": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80",
  "steam random elite key": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  "grand random steam key": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  "steam random key": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  "steam random keys": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  "mystery bundle": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80",
  "steam key": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",

  // EA Sports FC / FIFA (Every year maps to its own distinct cover)
  "fc 27": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "ea sports fc 27": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "ea sports fc 26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "ea sports fc 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg",
  "fc 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  "ea sports fc 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  "ea sports fc": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  "ea fc": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
  "fifa 23": "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_600x900_2x.jpg",
  "fifa 22": "https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/library_600x900_2x.jpg",
  "fifa 21": "https://cdn.cloudflare.steamstatic.com/steam/apps/1313800/library_600x900_2x.jpg",
  "fifa 20": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qsf.png",
  "fifa 19": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qse.png",
  "fifa 18": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7i.png",
  "fifa 17": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
  "fifa 16": "https://images.igdb.com/igdb/image/upload/t_cover_big/co204b.png",
  "fifa 15": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r79.png",
  "fifa 14": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r78.png",
  "fifa 13": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png",
  "fifa 12": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",

  // WWE 2K Series
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

  // Grand Theft Auto Series
  "grand theft auto vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta vi": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "gta 6": "https://images.igdb.com/igdb/image/upload/t_cover_big/co7927.png",
  "grand theft auto v": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
  "gta v": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
  "gta 5": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
  "grand theft auto iv": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg",
  "gta iv": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg",
  "gta 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg",
  "grand theft auto san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "gta san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "san andreas": "https://cdn.cloudflare.steamstatic.com/steam/apps/1547000/library_600x900_2x.jpg",
  "grand theft auto vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "gta vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "vice city": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546990/library_600x900_2x.jpg",
  "grand theft auto iii": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546970/library_600x900_2x.jpg",
  "grand theft auto 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546970/library_600x900_2x.jpg",
  "gta 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/1546970/library_600x900_2x.jpg",

  // God of War Series
  "god of war ragnarok": "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900_2x.jpg",
  "god of war iii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war 3": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8c.png",
  "god of war": "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg",

  // Popular Shooters & Action Titles
  "valorant": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
  "uncharted legacy of thieves": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "uncharted 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "uncharted": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/library_600x900_2x.jpg",
  "the last of us part ii": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us part 2": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.png",
  "the last of us part i": "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",
  "the last of us part 1": "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",
  "the last of us": "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",
  "red dead redemption 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg",
  "red dead redemption": "https://cdn.cloudflare.steamstatic.com/steam/apps/2668510/library_600x900_2x.jpg",
  "black myth wukong": "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg",
  "black myth": "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg",
  "wukong": "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg",
  "elden ring": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg",
  "sekiro shadows die twice": "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg",
  "sekiro": "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg",
  "cyberpunk 2077": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg",
  "forza horizon 6": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg",
  "forza horizon 5": "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg",
  "forza horizon 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/library_600x900_2x.jpg",
  "spider man miles morales": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817190/library_600x900_2x.jpg",
  "marvels spider man": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg",
  "spider man": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg",
  "horizon forbidden west": "https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/library_600x900_2x.jpg",
  "horizon zero dawn": "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg",
  "marvels wolverine": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3v9w.png",
  "wolverine": "https://images.igdb.com/igdb/image/upload/t_cover_big/co3v9w.png",
  "farming simulator 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2300320/library_600x900_2x.jpg",
  "farming simulator 22": "https://cdn.cloudflare.steamstatic.com/steam/apps/1248130/library_600x900_2x.jpg",
  "farming simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/2300320/library_600x900_2x.jpg",
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
  "cricket 26": "https://cdn.cloudflare.steamstatic.com/steam/apps/2162600/library_600x900_2x.jpg",
  "cricket 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2162600/library_600x900_2x.jpg",
  "f1 25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900_2x.jpg",
  "f1 24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900_2x.jpg",
  "tekken 8": "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900_2x.jpg",
  "tekken 7": "https://cdn.cloudflare.steamstatic.com/steam/apps/389730/library_600x900_2x.jpg",
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
  "nba 2k25": "https://cdn.cloudflare.steamstatic.com/steam/apps/2878950/library_600x900_2x.jpg",
  "nba 2k24": "https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/library_600x900_2x.jpg",
  "call of duty modern warfare iii": "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg",
  "call of duty modern warfare 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg",
  "call of duty modern warfare 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg",
  "call of duty modern warfare ii": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg",
  "call of duty modern warfare": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg",
  "arc raiders": "https://cdn.cloudflare.steamstatic.com/steam/apps/1808500/library_600x900_2x.jpg",
  "battlefield": "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/library_600x900_2x.jpg",
  "mafia the old country": "https://cdn.cloudflare.steamstatic.com/steam/apps/1994590/library_600x900_2x.jpg",
  "hitman world of assassination": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/library_600x900_2x.jpg",
  "hitman": "https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/library_600x900_2x.jpg",
  "nier automata": "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/library_600x900_2x.jpg",
  "nier": "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/library_600x900_2x.jpg",
  "the walking dead": "https://cdn.cloudflare.steamstatic.com/steam/apps/1449690/library_600x900_2x.jpg",
  "microsoft flight simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/2537590/library_600x900_2x.jpg",
  "flight simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/2537590/library_600x900_2x.jpg",
  "schedule i": "https://cdn.cloudflare.steamstatic.com/steam/apps/3164500/library_600x900_2x.jpg",
  "split fiction": "https://cdn.cloudflare.steamstatic.com/steam/apps/2001120/library_600x900_2x.jpg",
  "clair obscur expedition 33": "https://cdn.cloudflare.steamstatic.com/steam/apps/1903380/library_600x900_2x.jpg",
  "clair obscur": "https://cdn.cloudflare.steamstatic.com/steam/apps/1903380/library_600x900_2x.jpg",
  "expedition 33": "https://cdn.cloudflare.steamstatic.com/steam/apps/1903380/library_600x900_2x.jpg",
  "assassins creed": "https://cdn.cloudflare.steamstatic.com/steam/apps/2851900/library_600x900_2x.jpg",
  "black flag": "https://cdn.cloudflare.steamstatic.com/steam/apps/242050/library_600x900_2x.jpg",
  "rust": "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/library_600x900_2x.jpg",
  "ark survival evolved": "https://cdn.cloudflare.steamstatic.com/steam/apps/346110/library_600x900_2x.jpg",
  "ark survival": "https://cdn.cloudflare.steamstatic.com/steam/apps/346110/library_600x900_2x.jpg",
  "euro truck simulator 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/227300/library_600x900_2x.jpg",
  "euro truck simulator": "https://cdn.cloudflare.steamstatic.com/steam/apps/227300/library_600x900_2x.jpg",
  "naruto shippuden ultimate ninja storm 4": "https://cdn.cloudflare.steamstatic.com/steam/apps/349040/library_600x900_2x.jpg",
  "naruto shippuden ultimate ninja storm 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/234670/library_600x900_2x.jpg",
  "naruto": "https://cdn.cloudflare.steamstatic.com/steam/apps/349040/library_600x900_2x.jpg",
  "genshin impact": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2040.png",
  "fortnite": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png",
  "league of legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png",
  "free fire": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x18.png",
  "pubg mobile": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x17.png",
  "clash royale": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r3k.png",
  "clash of clans": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2044.png",
  "wuthering waves": "https://images.igdb.com/igdb/image/upload/t_cover_big/co843a.png",
  "mobile legends": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2949.png"
};

// Aliases for backward compatibility
export const GAME_COVER_MAP = DIRECT_ART;
export const MINECRAFT_COVER = DIRECT_ART["minecraft"];

// XML escape helper for safe SVG text rendering
function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Text wrapping helper for SVG cards
function wrapSvgText(text, maxCharsPerLine = 16, maxLines = 4) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if ((currentLine + " " + word).length <= maxCharsPerLine) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Dynamic SVG Fallback:
 * Returns a high-res, styled 2:3 vertical SVG data URI with a dark gaming gradient,
 * subtle glowing grid, geometric mountain/gamepad watermark, and the centered item title.
 * Permanently eliminates the repeated esports photo.
 */
export function getDynamicPlaceholder(title) {
  const displayTitle = (title || "Sagarmatha Gaming")
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/\b(?:ps4|ps5|pc|steam)\b/gi, "")
    .replace(/\b(?:standard|deluxe|premium|ultimate|edition)\b/gi, "")
    .replace(/\b(?:pre-order|pre order|uid topup|nepal region)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim() || "Sagarmatha Gaming";

  const lines = wrapSvgText(displayTitle.toUpperCase(), 16, 4);
  const lineHeight = 38;
  const totalTextHeight = lines.length * lineHeight;
  const startY = 440 - (totalTextHeight / 2) + 20;
  const lineY = startY + totalTextHeight + 15;

  const tspans = lines
    .map((line, idx) => `<tspan x="300" dy="${idx === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="45%" stop-color="#0d1322" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#8b5cf6" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0" />
    </radialGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" stroke-width="0.75" stroke-opacity="0.06" />
    </pattern>
  </defs>

  <!-- Background Layer -->
  <rect width="600" height="900" fill="url(#bgGrad)" />
  <circle cx="300" cy="420" r="300" fill="url(#glowGrad)" />
  <rect width="600" height="900" fill="url(#gridPattern)" />

  <!-- Mountain Peak Geometry (Sagarmatha) -->
  <polygon points="100,640 300,340 500,640" fill="none" stroke="#06b6d4" stroke-width="2" stroke-opacity="0.12" />
  <polygon points="200,640 300,480 400,640" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-opacity="0.1" />
  <polygon points="30,680 180,450 330,680" fill="none" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.06" />
  <polygon points="270,680 420,450 570,680" fill="none" stroke="#818cf8" stroke-width="1" stroke-opacity="0.06" />

  <!-- Gamepad Watermark -->
  <g transform="translate(230, 250) scale(0.7)" opacity="0.09" stroke="#38bdf8" stroke-width="6" fill="none">
    <rect x="0" y="30" width="200" height="120" rx="40" />
    <circle cx="50" cy="90" r="22" />
    <path d="M 50 78 L 50 102 M 38 90 L 62 90" stroke-width="5" />
    <circle cx="150" cy="75" r="9" fill="#38bdf8" />
    <circle cx="130" cy="95" r="9" fill="#38bdf8" />
    <circle cx="170" cy="95" r="9" fill="#38bdf8" />
    <circle cx="150" cy="115" r="9" fill="#38bdf8" />
  </g>

  <!-- Top Brand Header -->
  <rect x="175" y="80" width="250" height="34" rx="17" fill="#13192b" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="1" />
  <text x="300" y="102" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">SAGARMATHA GAMES</text>

  <!-- Centered Clean Product Title -->
  <text x="300" y="${startY}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" fill="#ffffff" font-size="28" letter-spacing="1">
    ${tspans}
  </text>

  <!-- Glowing Accent Divider Line -->
  <rect x="220" y="${lineY}" width="160" height="4" rx="2" fill="url(#accentGrad)" />

  <!-- Bottom Badge -->
  <rect x="200" y="785" width="200" height="32" rx="16" fill="#111827" fill-opacity="0.9" stroke="#334155" stroke-width="1" />
  <text x="300" y="806" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" letter-spacing="2.5" text-anchor="middle">VERIFIED PRODUCT</text>
</svg>
`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Replaced static esports photo with branded dynamic SVG placeholder
export const FALLBACK_POSTER = getDynamicPlaceholder("Sagarmatha Gaming Store");

// Normalize the title: lowercase, remove brackets, remove console/edition flags
export function cleanGameTitle(title) {
  if (!title) return "";
  return title
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

/**
 * Returns the exact vertical cover for a given product or game title.
 * If unmatched, returns a high-resolution, styled dynamic SVG placeholder.
 */
export function getGameCover(title) {
  if (!title) return getDynamicPlaceholder("Sagarmatha Gaming");

  const clean = cleanGameTitle(title);
  const rawLower = title.toLowerCase();

  // 1. Gift card, wallet & subscription keywords
  if (clean.includes("roblox") || rawLower.includes("roblox")) return DIRECT_ART["roblox"];
  if (clean.includes("minecraft") || rawLower.includes("minecraft")) {
    if (clean.includes("java")) return DIRECT_ART["minecraft java"];
    if (clean.includes("bedrock")) return DIRECT_ART["minecraft bedrock"];
    return DIRECT_ART["minecraft"];
  }
  if (clean.includes("steam wallet") || clean.includes("steam gift card") || clean.includes("steam card")) {
    return DIRECT_ART["steam gift card"];
  }
  if (clean.includes("playstation gift") || clean.includes("psn card") || clean.includes("psn") || clean.includes("playstation card") || clean.includes("playstation network")) {
    return DIRECT_ART["playstation gift card"];
  }
  if (clean.includes("xbox gift") || clean.includes("xbox card")) {
    return DIRECT_ART["xbox gift card"];
  }
  if (clean.includes("apple gift") || clean.includes("apple card") || clean.includes("itunes")) {
    return DIRECT_ART["apple gift card"];
  }
  if (clean.includes("google play")) return DIRECT_ART["google play"];
  if (clean.includes("discord")) return DIRECT_ART["discord nitro"];
  if (clean.includes("nintendo")) return DIRECT_ART["nintendo"];
  if (clean.includes("battle.net") || clean.includes("battlenet")) return DIRECT_ART["battle.net"];
  if (clean.includes("exitlag")) return DIRECT_ART["exitlag"];
  if (clean.includes("netflix")) return DIRECT_ART["netflix"];
  if (clean.includes("ea gift")) return DIRECT_ART["ea gift card"];
  if (clean.includes("epic gift") || clean.includes("epic card")) return DIRECT_ART["epic gift card"];
  if (clean.includes("game pass")) return DIRECT_ART["xbox game pass"];

  // 2. Mystery Keys & Bundles
  if (clean.includes("vip mystery")) return DIRECT_ART["vip mystery bundle"];
  if (clean.includes("elite key")) return DIRECT_ART["steam random elite key"];
  if (clean.includes("grand random")) return DIRECT_ART["grand random steam key"];
  if (clean.includes("random key")) return DIRECT_ART["steam random key"];

  // 3. Franchise Year Extraction (FIFA / EA Sports FC / WWE)
  const yearMatch = clean.match(/(1[2-9]|2[0-7])/);
  if (clean.includes("fifa") && yearMatch) {
    const key = `fifa ${yearMatch[1]}`;
    if (DIRECT_ART[key]) return DIRECT_ART[key];
  }
  if ((clean.includes("fc") || clean.includes("ea sports")) && yearMatch) {
    const key = `fc ${yearMatch[1]}`;
    if (DIRECT_ART[key]) return DIRECT_ART[key];
  }
  if (clean.includes("wwe") && yearMatch) {
    const key = `wwe 2k${yearMatch[1]}`;
    if (DIRECT_ART[key]) return DIRECT_ART[key];
  }

  // 4. Match keys sorted by descending key length
  const sortedKeys = Object.keys(DIRECT_ART).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (clean.includes(key) || rawLower.includes(key)) {
      return DIRECT_ART[key];
    }
  }

  // 5. Unmatched -> High-res styled Dynamic SVG Placeholder
  return getDynamicPlaceholder(title);
}

export function getGameCoverFallback(title = "Sagarmatha Gaming Store") {
  return getDynamicPlaceholder(title);
}
