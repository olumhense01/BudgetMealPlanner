export const money = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0));

export const number = (value) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(
    Math.round(value || 0),
  );

export const percent = (value) => `${Math.round(value || 0)}%`;
