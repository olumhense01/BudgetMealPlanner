import React, { useState } from 'react';
import {
  ArrowRight,
  CircleDollarSign,
  Flame,
  Leaf,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dayTotals } from '../services/mealEngine';
import { money } from '../utils/format';
import { StatCard, Button } from '../components/ui';
import MealCard from '../components/MealCard';

export default function Dashboard() {
  const { budget, period, totals, plan, generate } = useApp();
  const [message, setMessage] = useState('');
  const daily =
    period === 'daily'
      ? budget
      : period === 'weekly'
        ? budget / 7
        : budget / 30;
  const pct = budget ? Math.round((totals.totalCost / budget) * 100) : 0;
  const create = () => {
    generate();
    setMessage('New plan generated from your budget and preferences.');
    setTimeout(() => setMessage(''), 2500);
  };
  return (
    <div className="space-y-7">
      <section className="grid gap-5 lg:grid-cols-[1.5fr_.8fr]">
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 p-7 text-white shadow-soft lg:p-9">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-500/30 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
              <Sparkles size={14} /> Budget + nutrition intelligence
            </span>
            <h1 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Eat well without eating up your budget.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-100">
              Plan Nigerian meals using a transparent food-price baseline and
              real ingredient arithmetic.
            </p>
            <Button
              className="mt-7  text-brand-800 hover:bg-brand-50"
              onClick={create}
            >
              <span className="inline-flex items-center gap-2">
                Generate my plan <ArrowRight size={17} />
              </span>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Your {period} budget</p>
              <h2 className="mt-1 text-3xl font-bold">{money(budget)}</h2>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <CircleDollarSign />
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-slate-500">
              <span>Current plan cost</span>
              <b className="text-slate-800">{money(totals.totalCost)}</b>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${pct > 100 ? 'bg-red-500' : 'bg-brand-500'}`}
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>
          <p
            className={`mt-3 text-xs ${totals.totalCost <= budget ? 'text-slate-500' : 'text-red-600'}`}
          >
            {totals.totalCost <= budget
              ? `${money(budget - totals.totalCost)} remaining.`
              : `${money(totals.totalCost - budget)} above budget.`}
          </p>
        </div>
      </section>
      {message && (
        <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
          {message}
        </div>
      )}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Target />}
          label="Daily target"
          value={money(daily)}
          helper="Average food spend"
        />
        <StatCard
          icon={<Flame />}
          label="Daily calories"
          value={`${Math.round(totals.calories / 7)} kcal`}
          helper="From your current plan"
        />
        <StatCard
          icon={<Leaf />}
          label="Daily protein"
          value={`${Math.round(totals.protein / 7)}g`}
          helper="From your current plan"
        />
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-bold">This week</h2>
            <p className="mt-1 text-sm text-slate-500">
              Every cost below is calculated from ingredient quantities.
            </p>
          </div>
          <Link
            to="/meal-plan"
            className="text-sm font-semibold text-brand-700"
          >
            Full plan →
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {plan.map((d) => (
            <div
              key={d.day}
              className="grid gap-3 p-4 sm:grid-cols-[90px_1fr_1fr_1fr_100px] sm:items-center"
            >
              <div className="text-xs font-bold text-slate-500">{d.day}</div>
              <MealCard mealId={d.breakfast} label="Breakfast" />
              <MealCard mealId={d.lunch} label="Lunch" />
              <MealCard mealId={d.dinner} label="Dinner" />
              <div className="text-right text-sm font-bold">
                {money(dayTotals(d).cost)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
