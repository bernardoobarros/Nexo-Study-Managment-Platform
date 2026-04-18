import { Bell, Check, FileText, FileVideo, Layout, Lock, Plus, School, Search, Shield, Sparkles } from "lucide-react";
import { MOCK_ARQUIVOS_SINCRONIA, MOCK_SERVICOS, type IntegrationService } from "../data/mockIntegrations.ts";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face";

function IconeServico({ servico }: { servico: IntegrationService["icone"] }) {
  if (servico === "classroom") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <School className="h-6 w-6" strokeWidth={1.75} />
      </div>
    );
  }
  if (servico === "canvas") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
        <Layout className="h-6 w-6" strokeWidth={1.75} />
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
      <Sparkles className="h-6 w-6" strokeWidth={1.75} />
    </div>
  );
}

function CartaoServico({ item }: { item: IntegrationService }) {
  const conectado = item.status === "conectado";
  return (
    <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <IconeServico servico={item.icone} />
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
            conectado ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "bg-red-50 text-red-700 ring-1 ring-red-100"
          }`}
        >
          {conectado ? "Conectado" : "Ação necessária"}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.nome}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.descricao}</p>
      <button
        type="button"
        className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${
          conectado
            ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {item.rotuloAcao}
      </button>
    </article>
  );
}

function IntegrationPage() {
  return (
    <div className="min-h-full bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Integrações</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-950" role="heading" aria-level={1}>
              Central de Integrações
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
                placeholder="Pesquisar serviços…"
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-label="Pesquisar serviços"
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

        <section className="mt-10">
          <h2 className="text-xl font-bold text-indigo-900 sm:text-2xl">Conecte seu universo acadêmico</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            O Nexo sincroniza materiais, prazos e ferramentas de IA em um só lugar. Escolha os serviços abaixo para
            importar dados com segurança e manter seu fluxo de estudo atualizado.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_SERVICOS.map((s) => (
            <CartaoServico key={s.id} item={s} />
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Motor de sincronização de arquivos</h3>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                14,2 GB analisados
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Fila de processamento local — os metadados são enviados cifrados para indexação.
            </p>
            <ul className="mt-6 space-y-4">
              {MOCK_ARQUIVOS_SINCRONIA.map((arq) => (
                <li key={arq.id} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {arq.tipo === "pdf" ? (
                        <FileText className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                      ) : (
                        <FileVideo className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                      )}
                      <span className="truncate text-sm font-medium text-slate-900">{arq.nome}</span>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-bold uppercase tracking-wide ${
                        arq.estado === "concluido" ? "text-emerald-600" : "text-blue-600"
                      }`}
                    >
                      {arq.estado === "concluido" ? "Concluído" : `Analisando ${arq.progresso ?? 0}%`}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all ${
                        arq.estado === "concluido" ? "w-full bg-emerald-500" : "bg-blue-500"
                      }`}
                      style={arq.estado === "analisando" ? { width: `${arq.progresso ?? 0}%` } : undefined}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl bg-slate-800 p-6 text-white shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Lock className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold">Segurança nível empresarial</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} />
                Criptografia ponta a ponta em trânsito e em repouso
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} />
                Compatível com práticas SOC 2 Tipo II (roadmap)
              </li>
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={1.75} />
                Controle de acesso por papéis e trilhas de auditoria
              </li>
            </ul>
            <button
              type="button"
              className="mt-auto rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/15"
            >
              Whitepaper de segurança
            </button>
          </div>
        </section>

        <button
          type="button"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 py-10 text-sm font-semibold text-slate-600 transition-colors hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-800"
        >
          <Plus className="h-5 w-5" strokeWidth={2} />
          Adicionar nova integração
        </button>
      </div>
    </div>
  );
}

export default IntegrationPage;
