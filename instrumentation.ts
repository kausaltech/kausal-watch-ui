export const register = async () => {
  if (process.env.NODE_ENV !== 'production') return;
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node');
  }
};
