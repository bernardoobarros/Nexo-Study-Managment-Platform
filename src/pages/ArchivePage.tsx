import { Bell, Search, Star } from "lucide-react";
import {
  ARCHIVE_STATS,
  FEATURED_TOPIC,
  MASTERY,
  MOCK_TOPICOS_INFERIORES,
  TAGS_HISTORICAS,
} from "../data/mockArchive.ts";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face";

function MiniBarChart() {
  const heights = [40, 65, 48, 88, 52, 72];
  return (
    <div className="flex h-24 items-end justify-end gap-1.5 sm:gap-2" aria-hidden>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-t bg-indigo-400/90 sm:w-2.5"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function ArchivePage() {
  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Arquivo</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-950" role="heading" aria-level={1}>
              Arquivo de aprendizado
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[min(100%,320px)]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
              />
              <input
                type="search"
                placeholder="Pesquisar consultas históricas…"
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-label="Pesquisar no arquivo"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-full p-2.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
                aria-label="Notificações"
              >
                <Bell className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <div
                className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url(${AVATAR_URL})` }}
                role="img"
                aria-label="Foto do perfil"
              />
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center lg:col-span-2 lg:p-8">
            <div>
              <p className="text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                {ARCHIVE_STATS.projetosDominados} projetos dominados
              </p>
              <p className="mt-2 text-sm text-slate-600">{ARCHIVE_STATS.dominiosTexto}</p>
            </div>
            <MiniBarChart />
          </article>

          <article className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white shadow-md lg:min-h-[180px]">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-blue-100">
              Velocidade de insight de IA
            </p>
            <p className="mt-3 text-4xl font-bold tracking-tight">{ARCHIVE_STATS.insightVelocidade}</p>
            <p className="mt-1 text-sm font-medium text-blue-100">{ARCHIVE_STATS.insightSubtitulo}</p>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3 lg:items-start">
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2 lg:p-8">
            <h2 className="font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              {FEATURED_TOPIC.titulo}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-sky-50/90 p-4 ring-1 ring-sky-100">
                <p className="text-sm font-bold text-sky-900">{FEATURED_TOPIC.porquê.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-sky-900/85">{FEATURED_TOPIC.porquê.texto}</p>
              </div>
              <div className="rounded-xl bg-emerald-50/90 p-4 ring-1 ring-emerald-100">
                <p className="text-sm font-bold text-emerald-900">{FEATURED_TOPIC.como.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/85">{FEATURED_TOPIC.como.texto}</p>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-slate-800 p-6 text-white shadow-md">
              <p className="text-sm font-semibold text-slate-300">Sequência de maestria</p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold">{MASTERY.percentual}%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-600">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${MASTERY.percentual}%` }} />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{MASTERY.texto}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tags históricas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TAGS_HISTORICAS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {MOCK_TOPICOS_INFERIORES.map((topico) => (
            <article
              key={topico.id}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{topico.area}</span>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{topico.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{topico.resumo}</p>
              <button
                type="button"
                className="mt-6 w-fit rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Ver mapa lógico
              </button>
            </article>
          ))}
        </section>

        <footer className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Star className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Resumo do curador digital</p>
              <p className="mt-0.5 text-sm text-slate-600">
                Seu arquivo cresceu 8% neste mês. Continue conectando fontes para insights mais precisos.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800"
          >
            Gerar relatório de maestria
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ArchivePage;
