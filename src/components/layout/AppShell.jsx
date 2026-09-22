import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Bell, CalendarDays, ChevronDown, Home, Menu, Settings, ShoppingBasket, Store, Utensils, X } from "lucide-react";

const nav = [
  {to:"/", label:"Dashboard", icon:Home, end:true},
  {to:"/meal-plan", label:"Meal Plan", icon:CalendarDays},
  {to:"/shopping-list", label:"Shopping List", icon:ShoppingBasket},
  {to:"/prices", label:"Food Prices", icon:Store},
  {to:"/preferences", label:"Preferences", icon:Settings}
];

export default function AppShell() {
  const [open,setOpen] = useState(false);
  return <div className="min-h-screen bg-slate-50">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2" onClick={()=>setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><Utensils size={20}/></span>
          <span><b className="block text-sm leading-4">Budget Meal</b><small className="text-xs text-slate-500">Planner</small></span>
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(n=><NavLink key={n.to} end={n.end} to={n.to} className={({isActive})=>`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${isActive?"bg-brand-50 text-brand-700":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><n.icon size={17}/>{n.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-slate-200 p-2.5 text-slate-500 sm:block"><Bell size={18}/></button>
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3 sm:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">F</span><span className="text-sm font-medium">Fred</span><ChevronDown size={14}/></div>
          <button onClick={()=>setOpen(v=>!v)} className="rounded-lg p-2 md:hidden">{open?<X/>:<Menu/>}</button>
        </div>
      </div>
      {open && <div className="border-t border-slate-100 bg-white p-3 md:hidden">{nav.map(n=><NavLink key={n.to} end={n.end} to={n.to} onClick={()=>setOpen(false)} className={({isActive})=>`mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${isActive?"bg-brand-50 text-brand-700":"text-slate-600"}`}><n.icon size={18}/>{n.label}</NavLink>)}</div>}
    </header>
    <main className="mx-auto max-w-7xl px-4 py-7 lg:px-8 lg:py-9"><Outlet/></main>
  </div>
}
