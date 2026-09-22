import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import MealPlan from './pages/MealPlan';
import ShoppingList from './pages/ShoppingList';
import Preferences from './pages/Preferences';
import Prices from './pages/Prices';
import NotFound from './pages/NotFound';


export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
