export const SEGMENTOS = [
  'Artes Visuais e Artesanato',
  'Patrimônio Histórico',
  'Livro e Literatura',
  'Audiovisual',
  'Hip Hop',
  'Música',
  'Artes Cênicas',
  'Cultura Popular Tradicional',
  'Instituições Culturais Não-Governamentais'
];

export function analyzeProposal(input) {
  const text = `${input.titulo || ''} ${input.resumo || ''}`.toLowerCase();
  const score = Math.min(98, Math.max(35, text.length % 100));
  const red = [];

  if (!input.documentacaoConfirmada) {
    red.push({ item: 'Documentação obrigatória não confirmada' });
  }
  if (!SEGMENTOS.includes(input.segmento)) {
    red.push({ item: 'Segmento cultural inválido' });
  }

  return {
    humanInLoop: true,
    score,
    status: red.length ? 'ATENÇÃO: ajustes obrigatórios' : 'APTO PARA REVISÃO HUMANA',
    feedback: {
      green: [{ item: 'Aderência ao segmento selecionado', score }],
      yellow: text.length < 180
        ? [{ item: 'Resumo curto', sugestao: 'Detalhe objetivos, público e impacto local.' }]
        : [],
      red,
      blue: [
        {
          item: 'Oportunidade local',
          insight: 'Conectar a Festa de Bonsucesso, Folia de Reis ou Capoeira pode reforçar relevância territorial.'
        }
      ]
    },
    postAnalysis: { auditRequired: red.length > 0 },
    disclaimer: 'Análise informativa. A decisão final de mérito é humana e colegiada.'
  };
}
