import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg md:hidden dark:border-slate-700"
            aria-label="Open navigation menu"
          >
            ...
          </button>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Kanvix</p>
            <h1 className="text-xl font-semibold">Simplified task workflow</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 sm:px-4"
          aria-label={theme === "light" ? "Enable dark mode" : "Enable light mode"}
        >
          <span className="sm:hidden">{theme === "light" ? "D" : "L"}</span>
          <span className="hidden sm:inline">{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
