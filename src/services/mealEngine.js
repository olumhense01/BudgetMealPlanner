import { MEALS, getMeal } from '../data/meals';
import { PRICE_DATA } from '../data/priceData';

export const ingredientCost = (item) => {
  const price = PRICE_DATA[item.priceId];
  return price ? price.price * item.quantity : 0;
};

export const mealCost = (meal) =>
  meal.ingredients.reduce((sum, item) => sum + ingredientCost(item), 0);

export const mealNutrition = (meal) => ({ ...meal.nutrition });

export const planTotals = (plan) => {
  const meals = plan
    .flatMap((day) => [
      getMeal(day.breakfast),
      getMeal(day.lunch),
      getMeal(day.dinner),
    ])
    .filter(Boolean);

  return {
    totalCost: meals.reduce((sum, m) => sum + mealCost(m), 0),
    calories: meals.reduce((sum, m) => sum + m.nutrition.calories, 0),
    protein: meals.reduce((sum, m) => sum + m.nutrition.protein, 0),
    carbs: meals.reduce((sum, m) => sum + m.nutrition.carbs, 0),
    fat: meals.reduce((sum, m) => sum + m.nutrition.fat, 0),
    fiber: meals.reduce((sum, m) => sum + m.nutrition.fiber, 0),
    mealCount: meals.length,
  };
};

export const dayTotals = (day) => {
  const meals = [
    getMeal(day.breakfast),
    getMeal(day.lunch),
    getMeal(day.dinner),
  ].filter(Boolean);
  return {
    cost: meals.reduce((s, m) => s + mealCost(m), 0),
    calories: meals.reduce((s, m) => s + m.nutrition.calories, 0),
    protein: meals.reduce((s, m) => s + m.nutrition.protein, 0),
  };
};

export const generatePlan = ({
  budget,
  period,
  preferences = [],
  allergies = [],
}) => {
  const weeklyBudget =
    period === 'daily'
      ? budget * 7
      : period === 'monthly'
        ? (budget / 30) * 7
        : budget;
  const dailyTarget = weeklyBudget / 7;
  const excluded = allergies.map((a) => a.toLowerCase().trim()).filter(Boolean);

  let pool = MEALS.filter(
    (m) =>
      !excluded.some(
        (a) =>
          m.name.toLowerCase().includes(a) ||
          m.ingredients.some((i) =>
            (PRICE_DATA[i.priceId]?.name || '').toLowerCase().includes(a),
          ),
      ),
  );

  if (!pool.length) pool = MEALS;

  const score = (meal) => {
    let s = 0;
    if (preferences.includes('high_protein')) s += meal.nutrition.protein * 3;
    if (preferences.includes('healthy'))
      s += meal.nutrition.fiber * 2 - meal.nutrition.fat * 0.25;
    if (preferences.includes('budget')) s -= mealCost(meal) / 100;
    if (preferences.includes('balanced'))
      s += meal.nutrition.protein + meal.nutrition.fiber;
    return s;
  };

  const breakfast = pool
    .filter((m) => m.mealType.includes('breakfast'))
    .sort((a, b) => score(b) - score(a));
  const main = pool
    .filter((m) => !m.mealType.includes('breakfast'))
    .sort((a, b) => score(b) - score(a));
  const cheapest = [...pool].sort((a, b) => mealCost(a) - mealCost(b));

  const pick = (arr, index, maxCost = Infinity) => {
    const affordable = arr.filter((m) => mealCost(m) <= maxCost);
    return (affordable.length ? affordable : arr.length ? arr : cheapest)[
      index % (affordable.length || arr.length || cheapest.length)
    ].id;
  };

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return days.map((day, index) => {
    const used = [];
    const breakfastId = pick(
      breakfast.length ? breakfast : cheapest,
      index,
      dailyTarget * 0.35,
    );
    used.push(breakfastId);
    const lunchId = pick(
      main.length ? main : cheapest,
      index * 2 + 1,
      dailyTarget * 0.65,
    );
    used.push(lunchId);
    const dinnerId = pick(
      main.length ? main : cheapest,
      index * 3 + 2,
      dailyTarget * 0.65,
    );
    return { day, breakfast: breakfastId, lunch: lunchId, dinner: dinnerId };
  });
};

export const aggregateShopping = (plan) => {
  const map = {};
  plan.forEach((day) =>
    [day.breakfast, day.lunch, day.dinner].forEach((id) => {
      const meal = getMeal(id);
      if (!meal) return;
      meal.ingredients.forEach((item) => {
        const p = PRICE_DATA[item.priceId];
        if (!p) return;
        if (!map[item.priceId])
          map[item.priceId] = {
            id: item.priceId,
            name: p.name,
            unit: p.unit,
            quantity: 0,
            cost: 0,
            category: p.category,
          };
        map[item.priceId].quantity += item.quantity;
      });
    }),
  );

  return Object.values(map).map((item) => ({
    ...item,
    quantity: Math.round(item.quantity * 100) / 100,
    cost: item.quantity * PRICE_DATA[item.id].price,
  }));
};
