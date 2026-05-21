import { AlertCircle, ArrowRight, Clock3, ListTodo, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/Topbar.tsx";
import { getAssignments } from "../lib/api.ts";
import type { AssignmentListItem } from "../types/assignment.ts";

function statusBadge(status: AssignmentListItem["status"]) {
  switch (status) {
    case "missing":
      return "bg-red-50 text-red-700 ring-1 ring-red-100";
    case "completed":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
    case "in_progress":
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-100";
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  }
}

function DashboardPage() {
  const [assignments, setAssignments] = useState<AssignmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAssignments() {
      try {
        setLoading(true);
        setError(null);
        const items = await getAssignments(controller.signal);
        setAssignments(items);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        const message = loadError instanceof Error ? loadError.message : "Could not load assignments.";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadAssignments();

    return () => controller.abort();
  }, []);

  const stats = useMemo(() => {
    const totals = {
      dueSoon: 0,
      missing: 0,
      completed: 0,
    };

    for (const assignment of assignments) {
      if (assignment.status === "missing") totals.missing += 1;
      if (assignment.status === "completed") totals.completed += 1;
      if (assignment.daysUntilDue <= 3 && assignment.status !== "completed") totals.dueSoon += 1;
    }

    return totals;
  }, [assignments]);

  const priorityAssignments = assignments.slice(0, 3);

  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="flex flex-col gap-6">
          <TopBar searchPlaceholder="Search assignments, classes, or deliverables">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Prototype v0</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-950 lg:text-4xl">
              Assignment queue
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              This milestone replaces mock navigation with a real assignment dashboard backed by the local API and database.
            </p>
          </TopBar>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Due soon</p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{stats.dueSoon}</p>
            <p className="mt-2 text-sm text-slate-600">Assignments due in the next three days.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Missing</p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{stats.missing}</p>
            <p className="mt-2 text-sm text-slate-600">Work that already slipped past its due date.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Completed</p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{stats.completed}</p>
            <p className="mt-2 text-sm text-slate-600">Assignments already out of your active queue.</p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Today&apos;s focus</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Highest leverage work first</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              Priorities are sorted by urgency, missing work, and estimated effort so you can decide what deserves attention next.
            </p>
          </div>

          {loading ? (
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-600">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading assignments from the local API...
            </div>
          ) : null}

          {error ? (
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Dashboard unavailable</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          ) : null}

          {!loading && !error ? (
            <div className="mt-8 grid gap-4">
              {priorityAssignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  to={`/assignments/${assignment.id}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-colors hover:border-blue-300 hover:bg-white"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
                          {assignment.courseCode}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${statusBadge(assignment.status)}`}
                        >
                          {assignment.statusLabel}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{assignment.title}</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{assignment.summary}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <Clock3 className="h-4 w-4" strokeWidth={1.75} />
                          {assignment.dueLabel}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <ListTodo className="h-4 w-4" strokeWidth={1.75} />
                          {assignment.effortLabel}
                        </span>
                      </div>
                    </div>

                    <div className="min-w-[220px] rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recommended next step</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{assignment.recommendedNextStep}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                        Open assignment
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
