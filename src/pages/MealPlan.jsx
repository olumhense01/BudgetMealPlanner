import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getMeal } from "../data/meals";
import { dayTotals } from "../services/mealEngine";
import { money } from "../utils/format";
import { Button } from "../components/ui";
import MealCard from "../components/MealCard";
import ReplaceMealModal from "../components/ReplaceMealModal";

export default function MealPlan() {
  const {plan,totals,budget,allergies,generate,replaceMeal}=useApp();
  const [replace,setReplace]=useState(null);
  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-brand-700">Your calculated plan</p><h1 className="mt-1 text-3xl font-bold">Meal Plan</h1><p className="mt-2 text-sm text-slate-500">7 days • {totals.mealCount} meals • {money(totals.totalCost)} calculated total</p></div><Button onClick={generate}><span className="inline-flex items-center gap-2"><Sparkles size={16}/> Regenerate</span></Button></div>
    <div className={`rounded-xl border px-4 py-3 text-sm ${totals.totalCost<=budget?"border-brand-200 bg-brand-50 text-brand-800":"border-red-200 bg-red-50 text-red-800"}`}>{totals.totalCost<=budget?`Plan is within your ${money(budget)} ${budget===0?"":"budget"}. Remaining: ${money(Math.max(0,budget-totals.totalCost))}.`.replace("$",""): `Plan is ${money(totals.totalCost-budget)} above your ${money(budget)} budget. Use Generate or replace meals to reduce cost.`}</div>
    <div className="grid gap-4 lg:grid-cols-2">{plan.map(d=><div key={d.day} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"><div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4"><div><h3 className="font-bold">{d.day}</h3><p className="text-xs text-slate-500">{dayTotals(d).calories} kcal • {dayTotals(d).protein}g protein</p></div><span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{money(dayTotals(d).cost)}</span></div><div className="space-y-3 p-4">{[["breakfast","Breakfast"],["lunch","Lunch"],["dinner","Dinner"]].map(([slot,label])=><MealCard key={slot} mealId={d[slot]} label={label} onReplace={()=>setReplace({day:d.day,slot,current:d[slot]})}/>)}</div></div>)}</div>
    {replace&&<ReplaceMealModal slot={replace.slot} current={replace.current} allergies={allergies} onClose={()=>setReplace(null)} onSelect={id=>{replaceMeal(replace.day,replace.slot,id);setReplace(null)}}/>}
  </div>;
}
