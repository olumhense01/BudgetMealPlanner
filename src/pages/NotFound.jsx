import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <p className="text-sm font-bold text-brand-700">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-500">
          The page you're looking for does not exist.
        </p>
        <Link to="/" className="mt-5 inline-block">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
