import React from "react";
import { Clock3, Flame, RefreshCw } from "lucide-react";
import { getMeal } from "../data/meals";
import { mealCost } from "../services/mealEngine";
import { money } from "../utils/format";

export default function MealCard({mealId,label,onReplace}) {
  const meal=getMeal(mealId);
  if(!meal) return null;
  return <div className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3">
    <img src={meal.image} alt="" className="h-20 w-20 rounded-lg object-cover"/>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">{label}</span><b className="text-sm">{money(mealCost(meal))}</b></div>
      <h3 className="mt-1 truncate text-sm font-bold">{meal.name}</h3>
      <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500"><span className="inline-flex items-center gap-1"><Flame size={12}/>{meal.nutrition.calories} kcal</span><span>{meal.nutrition.protein}g protein</span><span className="inline-flex items-center gap-1"><Clock3 size={12}/>{meal.prepMinutes} min</span></div>
    </div>
    {onReplace && <button onClick={onReplace} className="self-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-700" title="Replace"><RefreshCw size={16}/></button>}
  </div>
}
