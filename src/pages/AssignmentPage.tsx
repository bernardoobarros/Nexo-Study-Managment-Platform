import { useMemo, useState } from "react";
import { Bell, ChevronDown, Clock, FileText, Sparkles } from "lucide-react";
import {
  MOCK_ASSIGNMENTS,
  type AssignmentItem,
  type AssignmentStatus,
  type MensagemChat,
} from "../data/mockAssignments.ts";
import TopBar from "../components/topbar.tsx";


function statusPresentation(status: AssignmentStatus): { label: string; className: string } {
  switch (status) {
    case "em_andamento":
      return { label: "Em andamento", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" };
    case "nao_iniciado":
      return { label: "Não iniciado", className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200/80" };
    case "concluido":
      return { label: "Concluído", className: "bg-blue-50 text-blue-700 ring-1 ring-blue-100" };
  }
}

function AnexoCard({ anexo }: { anexo: AssignmentItem["anexos"][number] }) {
  const isPdf = anexo.tipo === "pdf";
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
          isPdf ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
        }`}
      >
        <FileText className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{anexo.nome}</p>
        <p className="truncate text-xs text-slate-500">{anexo.meta}</p>
      </div>
    </div>
  );
}

type CuradorPanelProps = {
  tarefa: AssignmentItem;
};

function CuradorPanel({ tarefa }: CuradorPanelProps) {
  const [mensagens, setMensagens] = useState<MensagemChat[]>(() => tarefa.mensagensChat);
  const [rascunho, setRascunho] = useState("");

  function enviar() {
    const texto = rascunho.trim();
    if (!texto) return;
    setMensagens((m) => [...m, { id: `u-${Date.now()}`, autor: "usuario", texto }]);
    setRascunho("");
    window.setTimeout(() => {
      setMensagens((m) => [
        ...m,
        {
          id: `i-${Date.now()}`,
          autor: "ia",
          texto:
            "Mensagem recebida. Quando o back-end estiver pronto, o curador responderá com base nos seus materiais e nas políticas da instituição.",
        },
      ]);
    }, 500);
  }

  return (
    <aside className="flex min-h-[420px] flex-col rounded-2xl border border-slate-200/90 bg-white shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100svh-5rem)]">
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 px-4 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Curador de IA</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-indigo-700">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Insight ativo
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Contexto: {tarefa.codigoDisciplina ?? tarefa.disciplina}</p>
        </div>
        <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600" aria-label="Histórico">
          <Clock className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/50 px-4 py-4">
        {mensagens.map((msg) => (
          <div key={msg.id} className={`flex ${msg.autor === "usuario" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                msg.autor === "usuario"
                  ? "rounded-br-md bg-blue-600 text-white"
                  : "rounded-bl-md border border-slate-100 bg-white text-slate-800"
              }`}
            >
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-white px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {tarefa.sugestoesChat.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRascunho(s)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={rascunho}
            onChange={(e) => setRascunho(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                enviar();
              }
            }}
            placeholder="Perguntar ao Curador…"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Mensagem para o curador"
          />
          <button
            type="button"
            onClick={enviar}
            className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
        <p className="mt-2 text-center text-[0.65rem] text-slate-400">O curador pode alucinar citações acadêmicas.</p>
      </div>
    </aside>
  );
}

function AssignmentPage() {
  const [tarefaId, setTarefaId] = useState<string>("a4");

  const tarefa = useMemo(
    () => MOCK_ASSIGNMENTS.find((t) => t.id === tarefaId) ?? MOCK_ASSIGNMENTS[0],
    [tarefaId],
  );

  const st = statusPresentation(tarefa.status);

  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TopBar>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tarefas</p>
            <p className="mt-1 text-xl font-extrabold tracking-tight text-neutral-950">
              Detalhes do trabalho
            </p>
            {/* keep your <select> here, inside children */}
          </TopBar>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[min(100%,280px)] sm:min-w-[320px]">
              <label htmlFor="seletor-tarefa" className="sr-only">
                Selecionar tarefa
              </label>
              <select
                id="seletor-tarefa"
                value={tarefaId}
                onChange={(e) => setTarefaId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {MOCK_ASSIGNMENTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.titulo.length > 56 ? `${t.titulo.slice(0, 54)}…` : t.titulo}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
                aria-hidden
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full p-2.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
                aria-label="Notificações"
              >
                <Bell className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div
                className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-200 bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url()` }}
                role="img"
                aria-label="Foto do perfil"
              />
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_min(380px,100%)] lg:items-start">
          <div className="min-w-0 space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800 ring-1 ring-blue-100">
                {tarefa.codigoDisciplina ?? tarefa.disciplina}
              </span>
              {tarefa.vencimentoLinha ? (
                <span className="text-sm text-slate-500">{tarefa.vencimentoLinha}</span>
              ) : null}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.className}`}>{st.label}</span>
            </div>

            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              {tarefa.titulo}
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-slate-700">{tarefa.descricaoCompleta}</p>

            <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-inner">
              <div className="flex items-center gap-2 text-slate-900">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <FileText className="h-4 w-4" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">Instruções principais</h3>
              </div>
              <ol className="mt-5 space-y-4">
                {tarefa.instrucoes.map((passo, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-sm font-bold tabular-nums text-blue-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{passo}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900">Anexos</h3>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {tarefa.anexos.map((anexo) => (
                  <AnexoCard key={anexo.id} anexo={anexo} />
                ))}
              </div>
            </section>
          </div>

          <CuradorPanel key={tarefa.id} tarefa={tarefa} />
        </div>
      </div>
    </div>
  );
}

export default AssignmentPage;
