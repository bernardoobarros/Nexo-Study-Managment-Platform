import { useEffect } from "react";
import { ChevronDown, Sparkles, X } from "lucide-react";

export type NewInquiryModalProps = {
  onClose: () => void;
};

const DISCIPLINAS: { value: string; label: string; disabled?: boolean }[] = [
  { value: "", label: "Selecione a disciplina acadêmica…", disabled: true },
  { value: "historia", label: "História" },
  { value: "matematica", label: "Matemática" },
  { value: "biologia", label: "Biologia" },
  { value: "filosofia", label: "Filosofia" },
  { value: "fisica", label: "Física" },
  { value: "quimica", label: "Química" },
  { value: "geografia", label: "Geografia" },
  { value: "portugues", label: "Português" },
  { value: "ingles", label: "Inglês" },
  { value: "espanhol", label: "Espanhol" },
];

function NewInquiryModal({ onClose }: NewInquiryModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nova-pesquisa-titulo"
        className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <h2
              id="nova-pesquisa-titulo"
              className="text-2xl font-extrabold tracking-tight text-neutral-950"
            >
              Iniciar Nova Pesquisa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Defina seu foco acadêmico para iniciar a jornada de pesquisa selecionada.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div>
            <label htmlFor="titulo-tarefa" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Título da tarefa
            </label>
            <input
              id="titulo-tarefa"
              name="titulo"
              type="text"
              placeholder="Ex.: Ensaio sobre Revolução Industrial"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label htmlFor="assunto" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Assunto
            </label>
            <div className="relative mt-2">
              <select
                id="assunto"
                name="assunto"
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {DISCIPLINAS.map((opt) => (
                  <option key={opt.value || "placeholder"} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
                aria-hidden
              />
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900">Assistente de IA pronto</p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800/95">
                Ao criar a pesquisa, o assistente poderá consultar bases como JSTOR, PubMed e outras fontes
                acadêmicas para apoiar seu trabalho.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Criar Pesquisa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewInquiryModal;
