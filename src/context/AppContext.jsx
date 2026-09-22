import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { aggregateShopping, generatePlan, planTotals } from "../services/mealEngine";

const AppContext = createContext(null);

const defaultState = {
  budget: 20000,
  period: "weekly",
  preferences: ["balanced"],
  allergies: [],
  plan: [
    {day:"Monday", breakfast:"m5", lunch:"m4", dinner:"m3"},
    {day:"Tuesday", breakfast:"m5", lunch:"m1", dinner:"m2"},
    {day:"Wednesday", breakfast:"m5", lunch:"m6", dinner:"m7"},
    {day:"Thursday", breakfast:"m3", lunch:"m4", dinner:"m8"},
    {day:"Friday", breakfast:"m5", lunch:"m2", dinner:"m1"},
    {day:"Saturday", breakfast:"m3", lunch:"m6", dinner:"m7"},
    {day:"Sunday", breakfast:"m5", lunch:"m8", dinner:"m1"}
  ],
  checked: {}
};

function load() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem("bmp-v2") || "{}") };
  } catch { return defaultState; }
}

export function AppProvider({ children }) {
  const [state,setState] = useState(load);

  useEffect(() => {
    localStorage.setItem("bmp-v2", JSON.stringify(state));
  }, [state]);

  const totals = useMemo(() => planTotals(state.plan), [state.plan]);
  const shopping = useMemo(() => aggregateShopping(state.plan), [state.plan]);

  const update = patch => setState(s => ({...s,...patch}));

  const generate = () => {
    const plan = generatePlan({
      budget: Number(state.budget),
      period: state.period,
      preferences: state.preferences,
      allergies: state.allergies
    });
    update({plan});
    return plan;
  };

  const replaceMeal = (day, slot, mealId) => {
    setState(s => ({
      ...s,
      plan: s.plan.map(d => d.day === day ? {...d,[slot]:mealId} : d)
    }));
  };

  const toggleShopping = id => {
    setState(s => ({
      ...s,
      checked: {...s.checked,[id]:!s.checked[id]}
    }));
  };

  const value = {
    ...state,
    totals,
    shopping,
    setBudget: budget => update({budget:Number(budget)}),
    setPeriod: period => update({period}),
    setPreferences: preferences => update({preferences}),
    setAllergies: allergies => update({allergies}),
    generate,
    replaceMeal,
    toggleShopping,
    reset: () => setState(defaultState)
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
