import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { PRICE_DATA_ARRAY, PRICE_META } from '../data/priceData';
import { money } from '../utils/format';

export default function Prices() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">
          Transparent price intelligence
        </p>
        <h1 className="mt-1 text-3xl font-bold">Food Prices</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          The planner does not invent a meal cost. It multiplies ingredient
          quantity by a stored unit price. This page shows the price baseline
          used by every calculation.
        </p>
      </div>
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-900">
        <div className="flex gap-3">
          <Info className="shrink-0" />
          <div>
            <b>
              {PRICE_META.source} • {PRICE_META.period}
            </b>
            <p className="mt-1">{PRICE_META.note}</p>
          </div>
        </div>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          <span>Ingredient</span>
          <span>Unit</span>
          <span className="text-right">Unit price</span>
        </div>
        {PRICE_DATA_ARRAY.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-slate-100 px-5 py-4 text-sm last:border-0"
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-slate-500">₦/{item.unit}</span>
            <b className="text-right">{money(item.price)}</b>
          </div>
        ))}
      </section>
      <div className="text-xs text-slate-500">
        Source: National Bureau of Statistics, Selected Food Price Watch, May
        2026. For a production deployment, connect a market-price API/feed and
        timestamp every update.
      </div>
    </div>
  );
}
