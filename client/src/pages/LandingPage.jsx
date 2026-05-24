import { Link } from "react-router-dom";

const features = [
  { title: "Task boards", description: "Track work with simple Todo, In Progress, and Done columns." },
  { title: "Clean workflow", description: "Use one dashboard, one board page, and one modal for task details." },
  { title: "Quick analytics", description: "See simple counts without building a giant reporting engine." },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#e2e8f0_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_50%,_#0f172a_100%)]">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-brand-600">Kanvix</h1>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-full px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Login
            </Link>
            <Link to="/register" className="rounded-full bg-brand-600 px-5 py-2 text-sm font-medium text-white">
              Sign up
            </Link>
          </div>
        </header>

        <section className="grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Jira-inspired project tracker</p>
            <h2 className="mt-4 text-5xl font-bold leading-tight text-slate-900 dark:text-white">
              Manage tasks without the extra complexity.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Kanvix helps you manage projects, update task status, and keep your workflow visible with a simple MERN app structure.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/register" className="rounded-2xl bg-brand-600 px-6 py-3 font-medium text-white">
                Start building
              </Link>
              <Link to="/login" className="rounded-2xl border border-slate-300 px-6 py-3 font-medium dark:border-slate-700">
                Log in
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="grid gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
