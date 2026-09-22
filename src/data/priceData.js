// Price baseline: National Bureau of Statistics (NBS) Selected Food Price Watch,
// May 2026 national averages. These are reference prices, not a live market feed.
// App calculations use these unit prices and quantities; a production market API
// should replace this file/service for live prices.
//
// NBS May 2026 examples include:
// eggs ~₦261 each, brown beans ~₦1,345/kg, local rice ~₦1,905/kg,
// tomato ~₦1,561/kg, onions ~₦1,180/kg, yam ~₦2,347/tuber.
// Source: NBS Selected Food Price Watch, May 2026.

export const PRICE_META = {
  source: 'National Bureau of Statistics (NBS)',
  period: 'May 2026',
  unit: 'Nigeria national average',
  note: 'Reference baseline. Actual market prices vary by location, seller and date.',
};

export const PRICE_DATA = {
  rice: {
    id: 'rice',
    name: 'Local rice',
    unit: 'kg',
    price: 1905.43,
    category: 'Grains & Staples',
  },
  beans: {
    id: 'beans',
    name: 'Brown beans',
    unit: 'kg',
    price: 1344.93,
    category: 'Proteins',
  },
  garri: {
    id: 'garri',
    name: 'White garri',
    unit: 'kg',
    price: 813.24,
    category: 'Grains & Staples',
  },
  yam: {
    id: 'yam',
    name: 'Yam tuber',
    unit: 'tuber',
    price: 2347.09,
    category: 'Grains & Staples',
  },
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    unit: 'kg',
    price: 1560.56,
    category: 'Vegetables',
  },
  onion: {
    id: 'onion',
    name: 'Onion',
    unit: 'kg',
    price: 1180.01,
    category: 'Vegetables',
  },
  egg: {
    id: 'egg',
    name: 'Egg',
    unit: 'each',
    price: 261.14,
    category: 'Proteins',
  },
  chicken: {
    id: 'chicken',
    name: 'Frozen chicken',
    unit: 'kg',
    price: 6309,
    category: 'Proteins',
  },
  beef: {
    id: 'beef',
    name: 'Boneless beef',
    unit: 'kg',
    price: 7171.41,
    category: 'Proteins',
  },
  fish: {
    id: 'fish',
    name: 'Titus/frozen fish',
    unit: 'kg',
    price: 8112,
    category: 'Proteins',
  },
  plantain: {
    id: 'plantain',
    name: 'Ripe plantain',
    unit: 'kg',
    price: 1492.63,
    category: 'Vegetables',
  },
  sweetPotato: {
    id: 'sweetPotato',
    name: 'Sweet potato',
    unit: 'kg',
    price: 695,
    category: 'Grains & Staples',
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    unit: 'kg',
    price: 2080.49,
    category: 'Vegetables',
  },
  oats: {
    id: 'oats',
    name: 'Oats',
    unit: 'kg',
    price: 4500,
    category: 'Grains & Staples',
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut',
    unit: 'kg',
    price: 2800,
    category: 'Proteins',
  },
  vegetableOil: {
    id: 'vegetableOil',
    name: 'Vegetable oil',
    unit: 'litre',
    price: 3151,
    category: 'Pantry',
  },
  palmOil: {
    id: 'palmOil',
    name: 'Palm oil',
    unit: 'litre',
    price: 3276,
    category: 'Pantry',
  },
};

export const ingredient = (priceId, quantity, label = null) => ({
  priceId,
  quantity,
  label,
});

export const PRICE_DATA_ARRAY = Object.values(PRICE_DATA);
