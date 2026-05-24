const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
};

export default LoadingSkeleton;
