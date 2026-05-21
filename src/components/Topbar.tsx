import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face";

type TopBarProps = {
  searchPlaceholder?: string;
  children?: ReactNode;
};

function TopBar({ searchPlaceholder, children }: TopBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">{children}</div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {searchPlaceholder ? (
          <div className="relative min-w-[min(100%,320px)]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label={searchPlaceholder}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-full p-2.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <div
            className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-200 bg-cover bg-center shadow-sm"
            style={{ backgroundImage: `url(${AVATAR_URL})` }}
            role="img"
            aria-label="Profile photo"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
