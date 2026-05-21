import { Database, PlugZap, RefreshCcw, ShieldCheck } from "lucide-react";
import TopBar from "../components/Topbar.tsx";

function IntegrationPage() {
  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <TopBar>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Integrations</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-950">Sync pipeline status</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Milestone 1 stays local. This page shows what the next backend layer needs before Google Classroom sync is added.
          </p>
        </TopBar>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PlugZap className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Google Classroom</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Not connected yet. The next milestone will add OAuth, assignment ingestion, and attachment metadata sync.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Database className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Local persistence</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Active. Milestone 1 stores normalized assignments, attachments, and starter artifacts in a local SQLite database.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <RefreshCcw className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Sync jobs</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Planned. The future sync service will refresh assignment states, due dates, and file metadata without touching your manual notes.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Safety boundary</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The current build focuses on ingestion, triage, and starter artifacts. Submission automation and grounded chat come later.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default IntegrationPage;
