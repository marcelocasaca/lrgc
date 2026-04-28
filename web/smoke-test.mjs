import { analyzeProposal, SEGMENTOS } from './analysis-core.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const okCase = analyzeProposal({
  titulo: 'Projeto de Música Periférica',
  resumo: 'Oficinas, apresentações, formação de jovens e circulação cultural nos bairros.',
  segmento: SEGMENTOS[5],
  documentacaoConfirmada: true
});

assert(okCase.humanInLoop === true, 'humanInLoop deve ser true');
assert(okCase.feedback.red.length === 0, 'caso válido não deve ter red flags');

const redCase = analyzeProposal({
  titulo: 'Projeto sem docs',
  resumo: 'Resumo curto',
  segmento: SEGMENTOS[4],
  documentacaoConfirmada: false
});

assert(redCase.feedback.red.length > 0, 'caso sem documentação deve ter red flag');

console.log('SMOKE TEST OK');
console.log('Caso válido:', JSON.stringify(okCase, null, 2));
console.log('Caso com pendência:', JSON.stringify(redCase, null, 2));
