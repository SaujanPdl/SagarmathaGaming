// Direct local image resolver - Sagarmatha Gaming Store

export const FALLBACK_POSTER = "/covers/default_poster.jpg";

export function getGameCover(nameOrProduct) {
  if (!nameOrProduct) return FALLBACK_POSTER;
  
  // If product object is passed and has a baked local cover, use it directly
  if (typeof nameOrProduct === 'object') {
    if (nameOrProduct.image) return nameOrProduct.image;
    nameOrProduct = nameOrProduct.name || '';
  }

  const t = String(nameOrProduct).toLowerCase();

  // Direct local mappings
  if (t.includes('gta 6') || t.includes('gta vi')) return '/covers/gta_6.jpg';
  if (t.includes('gta v') || t.includes('gta 5') || t.includes('grand theft auto v')) return '/covers/gta_5.jpg';
  if (t.includes('gta iv') || t.includes('grand theft auto iv')) return '/covers/gta_4.jpg';

  if (t.includes('fifa 18')) return '/covers/fifa_18.png';
  if (t.includes('fifa 19')) return '/covers/fifa_19.png';
  if (t.includes('fifa 20')) return '/covers/fifa_20.png';
  if (t.includes('fifa 21')) return '/covers/fifa_21.jpg';
  if (t.includes('fifa 22')) return '/covers/fifa_22.jpg';
  if (t.includes('fifa 23')) return '/covers/fifa_23.jpg';
  if (t.includes('fc 24')) return '/covers/fc_24.jpg';
  if (t.includes('fc 25')) return '/covers/fc_25.jpg';

  if (t.includes('wwe 2k17')) return '/covers/wwe_2k17.png';
  if (t.includes('wwe 2k18')) return '/covers/wwe_2k18.jpg';
  if (t.includes('wwe 2k19')) return '/covers/wwe_2k19.jpg';
  if (t.includes('wwe 2k20')) return '/covers/wwe_2k20.png';
  if (t.includes('wwe 2k22')) return '/covers/wwe_2k22.png';
  if (t.includes('wwe 2k23')) return '/covers/wwe_2k23.jpg';
  if (t.includes('wwe 2k24')) return '/covers/wwe_2k24.jpg';

  if (t.includes('forza horizon 5')) return '/covers/forza_horizon_5.jpg';
  if (t.includes('forza horizon 4')) return '/covers/forza_horizon_4.jpg';
  if (t.includes('palworld')) return '/covers/palworld.jpg';
  if (t.includes('flight simulator')) return '/covers/flight_simulator.jpg';
  if (t.includes('cricket')) return '/covers/cricket_24.jpg';
  if (t.includes('cities')) return '/covers/cities_skylines_2.jpg';
  if (t.includes('game pass')) return '/covers/pc_game_pass.jpg';

  if (t.includes('vip mystery')) return '/covers/vip_mystery_bundle.jpg';
  if (t.includes('elite key')) return '/covers/steam_elite_key.jpg';
  if (t.includes('grand random')) return '/covers/grand_random_key.jpg';
  if (t.includes('random key')) return '/covers/steam_random_key.jpg';

  return FALLBACK_POSTER;
}

export function getDynamicPlaceholder(name) {
  return getGameCover(name);
}