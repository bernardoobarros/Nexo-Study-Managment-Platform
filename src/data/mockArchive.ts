/**
 * Dados fictícios — substituir por API do arquivo de aprendizado.
 */

export const ARCHIVE_STATS = {
  projetosDominados: 42,
  dominiosTexto: "Em 6 domínios acadêmicos este semestre.",
  insightVelocidade: "+12%",
  insightSubtitulo: "Crescimento de retenção cognitiva",
} as const;

export const FEATURED_TOPIC = {
  titulo: "A retórica dos discursos da Revolução Industrial",
  porquê: { titulo: "O “porquê” (pedagogia)", texto: "Como o discurso moldou a percepção do progresso técnico." },
  como: { titulo: "O “como” (lógica)", texto: "Estrutura argumentativa e uso de evidências na oratória da época." },
} as const;

export const MASTERY = {
  percentual: 88,
  texto: "Você está a caminho do nível Especialista no tema selecionado.",
} as const;

export const TAGS_HISTORICAS = [
  "#cálculo",
  "#macroeconomia",
  "#filosofia-política",
  "#biologia-molecular",
  "#história-econômica",
] as const;

export type TopicoArquivo = {
  id: string;
  titulo: string;
  area: string;
  resumo: string;
};

export const MOCK_TOPICOS_INFERIORES: TopicoArquivo[] = [
  {
    id: "t1",
    titulo: "Demonstrações de integração multivariável",
    area: "Matemática",
    resumo: "Mapa conceitual entre integrais de linha, superfície e o teorema de Stokes.",
  },
  {
    id: "t2",
    titulo: "Eficiência de sequenciamento CRISPR",
    area: "Biologia molecular",
    resumo: "Comparativo de protocolos e taxa de edição em culturas eucarióticas.",
  },
];
