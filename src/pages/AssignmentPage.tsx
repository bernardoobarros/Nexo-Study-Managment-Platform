import { AlertCircle, ArrowLeft, FileText, Link2, LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import TopBar from "../components/Topbar.tsx";
import { getAssignmentById } from "../lib/api.ts";
import type { AssignmentDetail } from "../types/assignment.ts";

function statusBadge(status: AssignmentDetail["status"]) {
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

function AttachmentIcon({ kind }: { kind: string }) {
  return kind === "link" ? <Link2 className="h-4 w-4" strokeWidth={1.75} /> : <FileText className="h-4 w-4" strokeWidth={1.75} />;
}

function AssignmentPage() {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assignmentId) return;
    const currentAssignmentId = assignmentId;

    const controller = new AbortController();

    async function loadAssignment() {
      try {
        setLoading(true);
        setError(null);
        const record = await getAssignmentById(currentAssignmentId, controller.signal);
        setAssignment(record);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        const message = loadError instanceof Error ? loadError.message : "Could not load assignment.";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadAssignment();

    return () => controller.abort();
  }, [assignmentId]);

  if (!assignmentId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <TopBar>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to dashboard
          </Link>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Assignment detail</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-950">
            {assignment?.title ?? "Loading assignment"}
          </p>
        </TopBar>

        {loading ? (
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-600 shadow-sm">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading assignment details from the API...
          </div>
        ) : null}

        {error ? (
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700 shadow-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Assignment unavailable</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        ) : null}

        {!loading && !error && assignment ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="space-y-8">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
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

                <p className="mt-6 text-lg leading-relaxed text-slate-700">{assignment.description}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Deliverable</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-800">{assignment.deliverable}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recommended next step</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-800">{assignment.recommendedNextStep}</p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Requirements</p>
                <ol className="mt-5 space-y-3">
                  {assignment.requirements.map((item, index) => (
                    <li key={item} className="flex gap-4">
                      <span className="font-mono text-sm font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                    </li>
                  ))}
                </ol>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Attachments</p>
                <div className="mt-5 grid gap-3">
                  {assignment.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200">
                        <AttachmentIcon kind={attachment.kind} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{attachment.name}</p>
                        <p className="truncate text-xs text-slate-500">{attachment.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="space-y-6">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Starter artifacts</p>
                <div className="mt-5 space-y-4">
                  {assignment.starterArtifacts.map((artifact) => (
                    <div key={artifact.id} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{artifact.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{artifact.content}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                  Chat milestone next
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-200">
                  The next backend step is grounding chat answers in this assignment&apos;s stored description and attachments.
                </p>
                <div className="mt-5 space-y-2 text-sm text-slate-300">
                  {assignment.quickPrompts.map((prompt) => (
                    <div key={prompt} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      {prompt}
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AssignmentPage;
