const AnalyticsCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default AnalyticsCard;
