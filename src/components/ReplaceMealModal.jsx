import React from "react";
import { X } from "lucide-react";
import { MEALS } from "../data/meals";
import { mealCost } from "../services/mealEngine";
import { money } from "../utils/format";

export default function ReplaceMealModal({slot,current,allergies,onClose,onSelect}) {
  const options=MEALS.filter(m=>m.id!==current && !allergies.some(a=>m.name.toLowerCase().includes(a.toLowerCase())));
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-brand-700">{slot}</p><h2 className="mt-1 text-2xl font-bold">Replace meal</h2></div><button onClick={onClose}><X/></button></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{options.map(m=><button key={m.id} onClick={()=>onSelect(m.id)} className="flex gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-brand-300 hover:bg-brand-50"><img src={m.image} className="h-16 w-16 rounded-lg object-cover"/><span><b className="block text-sm">{m.name}</b><span className="mt-1 block text-xs text-slate-500">{money(mealCost(m))} • {m.nutrition.protein}g protein</span></span></button>)}</div>
    </div>
  </div>
}
