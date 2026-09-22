import { ingredient } from "./priceData";

export const MEALS = [
  {
    id:"m1",
    name:"Jollof Rice & Chicken",
    mealType:["lunch","dinner"],
    tags:["balanced","high protein"],
    prepMinutes:45,
    servings:1,
    nutrition:{ calories:650, protein:36, carbs:82, fat:18, fiber:7 },
    ingredients:[
      ingredient("rice",0.25),
      ingredient("chicken",0.18),
      ingredient("tomato",0.12),
      ingredient("onion",0.04),
      ingredient("vegetableOil",0.03)
    ],
    image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m2",
    name:"Beans & Plantain",
    mealType:["lunch","dinner"],
    tags:["budget","high fiber","filling"],
    prepMinutes:50,
    servings:1,
    nutrition:{ calories:590, protein:21, carbs:94, fat:13, fiber:16 },
    ingredients:[
      ingredient("beans",0.22),
      ingredient("plantain",0.25),
      ingredient("onion",0.03),
      ingredient("palmOil",0.02)
    ],
    image:"https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m3",
    name:"Yam & Egg Sauce",
    mealType:["breakfast","lunch","dinner"],
    tags:["quick","balanced"],
    prepMinutes:30,
    servings:1,
    nutrition:{ calories:570, protein:24, carbs:75, fat:18, fiber:7 },
    ingredients:[
      ingredient("yam",0.45),
      ingredient("egg",3),
      ingredient("tomato",0.12),
      ingredient("onion",0.04),
      ingredient("vegetableOil",0.02)
    ],
    image:"https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m4",
    name:"Rice & Beans",
    mealType:["lunch","dinner"],
    tags:["budget","high fiber"],
    prepMinutes:45,
    servings:1,
    nutrition:{ calories:540, protein:19, carbs:96, fat:6, fiber:12 },
    ingredients:[
      ingredient("rice",0.20),
      ingredient("beans",0.15),
      ingredient("onion",0.03),
      ingredient("palmOil",0.015)
    ],
    image:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m5",
    name:"Oats, Banana & Groundnut",
    mealType:["breakfast"],
    tags:["breakfast","quick","budget"],
    prepMinutes:10,
    servings:1,
    nutrition:{ calories:455, protein:15, carbs:66, fat:15, fiber:9 },
    ingredients:[
      ingredient("oats",0.08),
      ingredient("plantain",0.08,"Banana/fruit equivalent"),
      ingredient("groundnut",0.025)
    ],
    image:"https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m6",
    name:"Jollof Spaghetti",
    mealType:["lunch","dinner"],
    tags:["quick","budget"],
    prepMinutes:30,
    servings:1,
    nutrition:{ calories:590, protein:20, carbs:86, fat:16, fiber:6 },
    ingredients:[
      ingredient("rice",0.12,"Spaghetti equivalent staple"),
      ingredient("tomato",0.14),
      ingredient("onion",0.04),
      ingredient("egg",2)
    ],
    image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m7",
    name:"Eba & Egusi-style Vegetable Soup",
    mealType:["lunch","dinner"],
    tags:["protein","filling"],
    prepMinutes:50,
    servings:1,
    nutrition:{ calories:680, protein:29, carbs:75, fat:28, fiber:10 },
    ingredients:[
      ingredient("garri",0.18),
      ingredient("groundnut",0.05,"Egusi/seed equivalent"),
      ingredient("tomato",0.08),
      ingredient("onion",0.04)
    ],
    image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
  },
  {
    id:"m8",
    name:"Sweet Potato & Fish",
    mealType:["lunch","dinner"],
    tags:["high protein","healthy"],
    prepMinutes:35,
    servings:1,
    nutrition:{ calories:540, protein:38, carbs:58, fat:17, fiber:8 },
    ingredients:[
      ingredient("sweetPotato",0.45),
      ingredient("fish",0.16),
      ingredient("carrot",0.08),
      ingredient("onion",0.03)
    ],
    image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80"
  }
];

export const getMeal = id => MEALS.find(m => m.id === id);
