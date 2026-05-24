import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { projectOptions } from "../utils/constants";

const navLinkClassName = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-sm transition ${
    isActive
      ? "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"
      : "hover:bg-slate-100 dark:hover:bg-slate-800"
  }`;

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose?.();
  };

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform dark:border-slate-800 dark:bg-slate-900 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex`}
      >
        <div className="mb-8 flex items-center justify-between">
          <NavLink to="/" onClick={onClose} className="text-2xl font-bold text-brand-600">
            Kanvix
          </NavLink>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm md:hidden dark:border-slate-700"
          >
            Close
          </button>
        </div>
        <nav className="space-y-2">
          <NavLink to="/dashboard" onClick={onClose} className={navLinkClassName}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" onClick={onClose} className={navLinkClassName}>
            Profile
          </NavLink>
          <div className="px-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Projects</p>
          </div>
          {projectOptions.map((project) => (
            <NavLink
              key={project.id}
              to={`/board/${project.id}`}
              onClick={onClose}
              className={navLinkClassName}
            >
              {project.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Workspace</p>
            <p className="mt-2 font-semibold">Kanvix</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-brand-600"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
