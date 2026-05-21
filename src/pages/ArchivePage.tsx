import { BookOpenText, Files, Layers3 } from "lucide-react";
import TopBar from "../components/Topbar.tsx";

function ArchivePage() {
  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <TopBar>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Archive</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-950">Artifact archive placeholder</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            This section will hold saved outlines, checklists, and study artifacts once the generation pipeline is attached to the assignment detail page.
          </p>
        </TopBar>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Files className="h-8 w-8 text-blue-600" strokeWidth={1.75} />
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Assignment outputs</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Outlines, checklists, and notes generated per assignment will land here once the next milestone is wired.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Layers3 className="h-8 w-8 text-emerald-600" strokeWidth={1.75} />
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Reusable templates</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Concept map scaffolds and drafting templates will eventually be reusable across similar assignment types.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <BookOpenText className="h-8 w-8 text-violet-600" strokeWidth={1.75} />
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Study memory</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Later milestones can preserve prior notes and assistant explanations so repeated classes stop resetting your context.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default ArchivePage;
