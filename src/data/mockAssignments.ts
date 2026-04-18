/**
 * Dados fictícios para o front-end. Substituir por chamadas à API quando o back-end existir.
 */

export type AssignmentStatus = "em_andamento" | "nao_iniciado" | "concluido";

export type AnexoTipo = "pdf" | "docx";

export type AnexoItem = {
  id: string;
  nome: string;
  meta: string;
  tipo: AnexoTipo;
};

export type MensagemChat = {
  id: string;
  autor: "ia" | "usuario";
  texto: string;
};

export type AssignmentItem = {
  id: string;
  titulo: string;
  disciplina: string;
  codigoDisciplina?: string;
  resumo: string;
  status: AssignmentStatus;
  vencimentoLabel: string;
  vencimentoLinha?: string;
  urgencia?: string;
  rodapeMeta?: string;
  /** Conteúdo da coluna central (detalhe) */
  descricaoCompleta: string;
  instrucoes: string[];
  anexos: AnexoItem[];
  /** Sugestões rápidas no chat */
  sugestoesChat: string[];
  /** Histórico fictício do curador */
  mensagensChat: MensagemChat[];
};

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "a1",
    titulo: "Segunda Guerra Mundial: ensaio sobre o teatro do Pacífico",
    disciplina: "História",
    codigoDisciplina: "HIST 204",
    resumo:
      "Analise as mudanças táticas após a Batalha de Midway e o impacto na guerra no Pacífico.",
    status: "em_andamento",
    vencimentoLabel: "24 de out.",
    vencimentoLinha: "Vence em 24 de out. de 2025",
    rodapeMeta: "PDF · DOC",
    descricaoCompleta:
      "Desenvolva uma tese clara sobre o papel da logística naval e das operações anfíbias após 1942. Cite pelo menos quatro fontes primárias ou secundárias revisadas por pares.",
    instrucoes: [
      "Introdução com contexto histórico e pergunta de pesquisa (máx. 300 palavras).",
      "Dois capítulos analíticos com evidências e citações no padrão ABNT.",
      "Conclusão sintetizando o argumento e limitações do estudo.",
    ],
    anexos: [
      { id: "x1", nome: "Pacific_Theater_Sources.pdf", meta: "Biblioteca · 2,1 MB", tipo: "pdf" },
      { id: "x2", nome: "Rubrica_Ensaio_Hist.docx", meta: "Departamento · 38 KB", tipo: "docx" },
    ],
    sugestoesChat: ["Esboço de tese", "Fontes sugeridas"],
    mensagensChat: [
      {
        id: "m1",
        autor: "ia",
        texto:
          "Posso ajudar a estruturar o argumento sobre Midway e as ilhas salto. Quer começar por um esboço ou por revisão de fontes?",
      },
      {
        id: "m2",
        autor: "usuario",
        texto: "Preciso de um parágrafo introdutório que conecte Pearl Harbor ao avanço no Pacífico.",
      },
      {
        id: "m3",
        autor: "ia",
        texto:
          "Sugestão: abra com a reconfiguração da frota dos EUA após Pearl Harbor, depois situe Midway como ponto de inflexão antes de discutir a estratégia de salto em ilha.",
      },
    ],
  },
  {
    id: "a2",
    titulo: "Cálculo avançado: lista de exercícios 4",
    disciplina: "Matemática",
    codigoDisciplina: "MAT 301",
    resumo:
      "Integração por partes e substituição trigonométrica. 12 questões com respostas comentadas.",
    status: "nao_iniciado",
    vencimentoLabel: "26 de out.",
    vencimentoLinha: "Vence em 26 de out. de 2025",
    urgencia: "Em 2 dias",
    rodapeMeta: "+3 anexos",
    descricaoCompleta:
      "Resolva todos os itens mostrando passos intermediários. Indique substituições e integrais auxiliares quando usar integração por partes.",
    instrucoes: [
      "Questões 1 a 4: integração por partes.",
      "Questões 5 a 8: substituição trigonométrica.",
      "Questões 9 a 12: problemas mistos.",
    ],
    anexos: [
      { id: "x3", nome: "Lista04_Calculo.pdf", meta: "Prof. Silva · 420 KB", tipo: "pdf" },
    ],
    sugestoesChat: ["Passo a passo Q1", "Revisar substituição"],
    mensagensChat: [
      {
        id: "m4",
        autor: "ia",
        texto: "Quando quiser, envio um passo a passo modelo para integração por partes com ln(x).",
      },
    ],
  },
  {
    id: "a3",
    titulo: "Relatório de laboratório de química orgânica",
    disciplina: "Química",
    codigoDisciplina: "QUI 210",
    resumo: "Relatório final sobre a síntese da aspirina. Espectros anexados.",
    status: "concluido",
    vencimentoLabel: "Entregue",
    vencimentoLinha: "Entregue em 10 de out. de 2025",
    rodapeMeta: "Nota: 94%",
    descricaoCompleta:
      "Organize o relatório com objetivo, método, resultados (rendimento, ponto de fusão) e discussão de espectros de RMN e IV conforme roteiro do laboratório.",
    instrucoes: [
      "Seções: Introdução, Experimental, Resultados, Discussão, Conclusão, Referências.",
      "Anexar espectros numerados e tabela de dados brutos.",
    ],
    anexos: [
      { id: "x4", nome: "Modelo_Relatorio_QU.docx", meta: "Lab · 22 KB", tipo: "docx" },
    ],
    sugestoesChat: ["Comentários do professor", "Melhorar discussão"],
    mensagensChat: [
      {
        id: "m5",
        autor: "ia",
        texto: "Trabalho recebido. Destaque: discussão dos picos de carbonila no IV está coerente com a literatura.",
      },
    ],
  },
  {
    id: "a4",
    titulo: "A ética da inteligência artificial geral",
    disciplina: "Filosofia",
    codigoDisciplina: "FILOSOFIA 101",
    resumo:
      "Analise implicações morais da tomada de decisão autônoma em sistemas de AGI futuros.",
    status: "nao_iniciado",
    vencimentoLabel: "2 de nov.",
    vencimentoLinha: "Vence em 2 de nov. de 2025",
    urgencia: "Em 12 dias",
    descricaoCompleta:
      "Analise as implicações morais da tomada de decisão autônoma em futuros sistemas de AGI. Foque na distinção entre ética utilitarista e ética das virtudes.",
    instrucoes: [
      "Apresente a distinção utilitarismo vs. virtude aplicada a sistemas com agência aparente.",
      "Discuta pelo menos um dilema concreto (ex.: alocação de recursos, responsabilidade) com referência a Bostrom ou autor da lista.",
      "Conclusão: posição defendida e limites do argumento (máx. 400 palavras na conclusão).",
    ],
    anexos: [
      { id: "x5", nome: "Superintelligence.pdf", meta: "Nick Bostrom · 12,4 MB", tipo: "pdf" },
      { id: "x6", nome: "Grading_Rubric.docx", meta: "Departamento · 45 KB", tipo: "docx" },
    ],
    sugestoesChat: ["Mapa mental", "Explicar conceitos"],
    mensagensChat: [
      {
        id: "m6",
        autor: "ia",
        texto:
          "Olá! Eu indexei os arquivos do seu trabalho. Posso ajudar a sintetizar conceitos ou criar um rascunho. Por onde devemos começar?",
      },
      {
        id: "m7",
        autor: "usuario",
        texto:
          "Estou com dificuldade na distinção entre ética utilitarista e ética das virtudes no contexto do texto de Bostrom.",
      },
      {
        id: "m8",
        autor: "ia",
        texto:
          "No utilitarismo, avaliamos ações (ou regras) pelas consequências agregadas. Na ética das virtudes, o foco é o caráter e o florescimento humano — útil para perguntar que *tipo* de agente uma AGI deveria *ser*, não só qual resultado maximizar. Quer um quadro comparativo com exemplos do cap. 4?",
      },
    ],
  },
];
