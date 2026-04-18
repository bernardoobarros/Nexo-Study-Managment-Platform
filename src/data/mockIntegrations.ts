/**
 * Dados fictícios — substituir por API de integrações.
 */

export type IntegrationStatus = "conectado" | "acao_necessaria";

export type IntegrationService = {
  id: string;
  nome: string;
  descricao: string;
  status: IntegrationStatus;
  rotuloAcao: string;
  icone: "classroom" | "canvas" | "claude";
};

export const MOCK_SERVICOS: IntegrationService[] = [
  {
    id: "gc",
    nome: "Google Classroom",
    descricao: "Sincronize turmas, prazos e materiais publicados pelo professor.",
    status: "conectado",
    rotuloAcao: "Gerenciar",
    icone: "classroom",
  },
  {
    id: "canvas",
    nome: "Canvas LMS",
    descricao: "Importe tarefas e notas quando a conta institucional for validada.",
    status: "acao_necessaria",
    rotuloAcao: "Reconectar serviço",
    icone: "canvas",
  },
  {
    id: "claude",
    nome: "Claude (Anthropic)",
    descricao: "Use o assistente como copiloto de leitura com políticas do Nexo aplicadas.",
    status: "conectado",
    rotuloAcao: "Configurar",
    icone: "claude",
  },
];

export type ArquivoSincronia = {
  id: string;
  nome: string;
  estado: "concluido" | "analisando";
  progresso?: number;
  tipo: "pdf" | "video";
};

export const MOCK_ARQUIVOS_SINCRONIA: ArquivoSincronia[] = [
  { id: "f1", nome: "Bio101_Anotacoes_Aula.pdf", estado: "concluido", progresso: 100, tipo: "pdf" },
  { id: "f2", nome: "Quantum_Mechanics_Seminar_V2.mp4", estado: "analisando", progresso: 65, tipo: "video" },
];
