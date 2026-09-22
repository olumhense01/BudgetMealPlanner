import React from 'react';
import { Check, X } from 'lucide-react';
import { money } from '../utils/format';

export function StatCard({ icon, label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="rounded-lg bg-brand-50 p-2 text-brand-700">
          {icon}
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const styles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    dark: 'bg-slate-900 text-white hover:bg-slate-800',
    outline:
      'border border-slate-200 bg-white text-slate-700 hover:border-brand-300',
  };
  return (
    <button
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AllergyInput({ allergies, onChange }) {
  const [value, setValue] = React.useState('');
  const add = () => {
    const v = value.trim();
    if (v && !allergies.includes(v)) {
      onChange([...allergies, v]);
      setValue('');
    }
  };
  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="e.g. peanuts"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <Button variant="dark" onClick={add}>
          Add
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {allergies.map((a) => (
          <span
            key={a}
            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
          >
            {a}
            <button onClick={() => onChange(allergies.filter((x) => x !== a))}>
              <X size={13} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PreferenceToggle({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border p-4 text-left ${active ? 'border-brand-300 bg-brand-50' : 'border-slate-200 bg-white'}`}
    >
      <span className="text-sm font-semibold">{label}</span>
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border ${active ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'}`}
      >
        {active && <Check size={13} />}
      </span>
    </button>
  );
}

export { money };
