import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Bell,
  Brain,
  CalendarDays,
  MessageCircle,
  Paperclip,
  Sparkles,
  X,
} from "lucide-react";

function DashboardPage() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen]);

  return (
    <div className="relative min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className="text-2xl font-extrabold tracking-tight text-neutral-950 lg:text-3xl lg:leading-tight"
              role="heading"
              aria-level={1}
            >
              Bom dia, Alex.
            </p>
            <p className="mt-1.5 text-slate-600">O seu pulso acadêmico está estável.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-full p-2.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <div
              className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-200 bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face)",
              }}
              role="img"
              aria-label="Foto do perfil"
            />
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2 lg:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Resumo do pulso de IA
            </div>
            <p className="mt-5 text-lg leading-relaxed text-slate-800 lg:text-xl">
              Você tem <strong className="font-semibold text-slate-900">3 tarefas</strong> para esta semana. O seu{" "}
              <strong className="font-semibold text-slate-900">ensaio de História</strong> é alta prioridade e exige
              pesquisa aprofundada. A carga cognitiva tende a{" "}
              <strong className="font-semibold text-slate-900">atingir o pico na quarta-feira</strong>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100"
              >
                Priorizar hoje
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Ver previsão de carga
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl bg-slate-800 p-6 text-white shadow-sm lg:p-8">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-300">
              <Brain className="h-4 w-4 text-slate-200" strokeWidth={1.75} />
              Insight curado
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
              Estudantes que exploram as fontes de História cedo tendem a ganhar cerca de{" "}
              <span className="font-semibold text-white">15% a mais</span> em profundidade de síntese. Quer um resumo
              das fontes sugeridas?
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-slate-900/50 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-slate-900/70"
            >
              Gerar resumo
            </button>
          </article>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Próximas tarefas</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
              Ver cronograma
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  Em andamento
                </span>
                <span className="text-xs font-medium text-slate-500">24 de out.</span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900">
                Segunda Guerra Mundial: ensaio sobre o teatro do Pacífico
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Analise as mudanças táticas após a Batalha de Midway e o impacto na guerra no Pacífico.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">PDF · DOC</span>
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Falar com a IA
                </button>
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  Não iniciado
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Em 2 dias
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900">
                Cálculo avançado: lista de exercícios 4
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Integração por partes e substituição trigonométrica. 12 questões com respostas comentadas.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">+3 anexos</span>
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Falar com a IA
                </button>
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                    Concluído
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Avaliado
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900">
                Relatório de laboratório de química orgânica
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Relatório final sobre a síntese da aspirina. Espectros anexados.
              </p>
              <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-emerald-600">Nota: 94%</span>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver feedback
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>

      {chatOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-[1px]"
          aria-label="Fechar conversa"
          onClick={() => setChatOpen(false)}
        />
      ) : null}

      {chatOpen ? (
        <div
          id="nexo-chat-panel"
          className="fixed bottom-24 right-4 z-40 flex h-[min(32rem,70svh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-300/50 sm:right-6 sm:w-96"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nexo-chat-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/90 px-4 py-3">
            <div className="min-w-0">
              <p id="nexo-chat-title" className="truncate text-sm font-bold text-indigo-600">
                Nexo
              </p>
              <p className="truncate text-xs text-slate-500">Pergunte sobre seu currículo e tarefas</p>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
              aria-label="Fechar painel"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/50 px-4 py-4">
            <div className="flex justify-start">
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-slate-100 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm">
                Olá! Sou o assistente do Nexo. Posso ajudar com prazos, leituras e organização do seu semestre. O que
                você gostaria de saber?
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5 shadow-sm">
              <input
                type="text"
                placeholder="Pergunte ao Nexo sobre seu currículo…"
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                aria-label="Mensagem para o Nexo"
              />
              <button
                type="button"
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                aria-label="Anexar arquivo"
              >
                <Paperclip className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700"
                aria-label="Enviar"
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        className={`fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-slate-400/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:right-6 ${
          chatOpen ? "bg-slate-700 text-white hover:bg-slate-800" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        aria-expanded={chatOpen}
        aria-controls="nexo-chat-panel"
        aria-haspopup="dialog"
        id="nexo-chat-fab"
      >
        {chatOpen ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
        )}
        <span className="sr-only">{chatOpen ? "Fechar conversa com o Nexo" : "Abrir conversa com o Nexo"}</span>
      </button>
    </div>
  );
}

export default DashboardPage;
