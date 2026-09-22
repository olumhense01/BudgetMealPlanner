import React, { useMemo } from 'react';
import { Check, ShoppingBasket } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { money } from '../utils/format';
import { Button } from '../components/ui';

export default function ShoppingList() {
  const { shopping, checked, toggleShopping } = useApp();
  const groups = useMemo(
    () =>
      ['Proteins', 'Grains & Staples', 'Vegetables', 'Pantry']
        .map((category) => ({
          category,
          items: shopping.filter((x) => x.category === category),
        }))
        .filter((x) => x.items.length),
    [shopping],
  );
  const checkedCount = shopping.filter((x) => checked[x.id]).length;
  const total = shopping.reduce((s, x) => s + x.cost, 0);
  const allChecked = () =>
    shopping.forEach((x) => !checked[x.id] && toggleShopping(x.id));
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">
          Generated from your plan
        </p>
        <h1 className="mt-1 text-3xl font-bold">Shopping List</h1>
        <p className="mt-2 text-sm text-slate-500">
          Quantities are aggregated across all 21 meals. Costs use the same
          price baseline as the meal plan.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
        <div className="space-y-4">
          {groups.map((g) => (
            <section
              key={g.category}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
            >
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-bold">{g.category}</h2>
                <p className="text-xs text-slate-500">
                  {g.items.length} ingredients
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {g.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 px-5 py-4"
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={() => toggleShopping(item.id)}
                      className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span
                      className={`flex-1 text-sm ${checked[item.id] ? 'text-slate-400 line-through' : ''}`}
                    >
                      {item.name}
                      <small className="ml-2 text-xs text-slate-400">
                        {item.quantity} {item.unit}
                      </small>
                    </span>
                    <b className="text-sm">{money(item.cost)}</b>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-slate-900 p-6 text-white lg:sticky lg:top-24">
          <ShoppingBasket />
          <p className="mt-5 text-sm text-slate-400">Estimated basket total</p>
          <h2 className="mt-1 text-3xl font-bold">{money(total)}</h2>
          <div className="my-6 h-px bg-white/10" />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Ingredients</span>
              <span>{shopping.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Checked</span>
              <span>
                {checkedCount}/{shopping.length}
              </span>
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-brand-500 hover:bg-brand-400"
            onClick={allChecked}
          >
            <span className="inline-flex items-center gap-2">
              <Check size={16} /> Mark all bought
            </span>
          </Button>
        </aside>
      </div>
    </div>
  );
}
