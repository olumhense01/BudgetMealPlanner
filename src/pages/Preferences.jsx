import React from 'react';
import { Save, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AllergyInput, Button, PreferenceToggle } from '../components/ui';
import { money } from '../utils/format';

export default function Preferences() {
  const {
    budget,
    period,
    setBudget,
    setPeriod,
    preferences,
    setPreferences,
    allergies,
    setAllergies,
    generate,
  } = useApp();
  const toggle = (p) =>
    setPreferences(
      preferences.includes(p)
        ? preferences.filter((x) => x !== p)
        : [...preferences, p],
    );
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-700">
          Personalize the engine
        </p>
        <h1 className="mt-1 text-3xl font-bold">Preferences</h1>
        <p className="mt-2 text-sm text-slate-500">
          These values directly affect plan generation and the calculations
          shown throughout the app.
        </p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="text-brand-700" />
          <div>
            <h2 className="font-bold">Budget</h2>
            <p className="text-sm text-slate-500">
              Set your available food budget.
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          {['daily', 'weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${period === p ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center rounded-xl border border-slate-200 px-4">
          <span className="font-bold">₦</span>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-3 text-xl font-bold outline-none"
          />
        </div>
        <input
          type="range"
          min="5000"
          max="200000"
          step="1000"
          value={Math.min(200000, budget)}
          onChange={(e) => setBudget(e.target.value)}
          className="mt-5 w-full accent-brand-600"
        />
        <p className="mt-2 text-xs text-slate-500">
          {money(budget)} {period} budget.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="font-bold">Food preferences</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <PreferenceToggle
            active={preferences.includes('balanced')}
            label="Balanced"
            onClick={() => toggle('balanced')}
          />
          <PreferenceToggle
            active={preferences.includes('high_protein')}
            label="High protein"
            onClick={() => toggle('high_protein')}
          />
          <PreferenceToggle
            active={preferences.includes('budget')}
            label="Budget first"
            onClick={() => toggle('budget')}
          />
          <PreferenceToggle
            active={preferences.includes('healthy')}
            label="Higher fibre / healthy"
            onClick={() => toggle('healthy')}
          />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="font-bold">Allergies</h2>
        <p className="mt-1 text-sm text-slate-500">
          Ingredients matching these terms are excluded by the planner when
          possible.
        </p>
        <AllergyInput allergies={allergies} onChange={setAllergies} />
      </section>
      <Button onClick={generate}>
        <span className="inline-flex items-center gap-2">
          <Save size={16} /> Save & regenerate plan
        </span>
      </Button>
    </div>
  );
}
