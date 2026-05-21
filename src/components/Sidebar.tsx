import {
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  Network,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export type SidebarNavId = "painel" | "tarefas" | "integracoes" | "arquivo";

export type SidebarProps = {
  onNovaConsulta: () => void;
};

const NAV_ITEMS: {
  id: SidebarNavId;
  label: string;
  to: string;
  end?: boolean;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "painel", label: "Dashboard", to: "/", end: true, icon: LayoutDashboard },
  { id: "tarefas", label: "Assignments", to: "/tarefas", icon: FileText },
  { id: "integracoes", label: "Integrations", to: "/integracoes", icon: Network },
  { id: "arquivo", label: "Archive", to: "/arquivo", icon: History },
];

function Sidebar({ onNovaConsulta }: SidebarProps) {
  return (
    <aside className="flex h-full min-h-0 w-72 shrink-0 flex-col border-r border-slate-200/90 bg-slate-50 px-5 py-8">
      <div className="px-1">
        <p className="text-xl font-bold tracking-tight text-indigo-600">Nexo</p>
        <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Assignment Ops
        </p>
      </div>

      <nav className="mt-10 flex flex-col gap-1 px-0.5" aria-label="Primary navigation">
        {NAV_ITEMS.map(({ id, label, to, end, icon: Icon }) => (
          <NavLink
            key={id}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-700",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-5 w-5 shrink-0 stroke-[1.75] ${isActive ? "text-indigo-600" : "text-slate-500"}`}
                  aria-hidden
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex min-h-0 flex-col">
        <div className="mb-6 border-t border-slate-200" aria-hidden />
        <button
          type="button"
          onClick={onNovaConsulta}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          + Add Manual Assignment
        </button>

        <nav className="mt-8 flex flex-col gap-1 px-0.5" aria-label="Support and account">
          <a
            href="#support"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100/80 hover:text-slate-700"
          >
            <HelpCircle className="h-5 w-5 shrink-0 stroke-[1.75] text-slate-500" aria-hidden />
            Support
          </a>
          <a
            href="#account"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100/80 hover:text-slate-700"
          >
            <User className="h-5 w-5 shrink-0 stroke-[1.75] text-slate-500" aria-hidden />
            Account
          </a>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
