import { SEGMENTOS, analyzeProposal } from './analysis-core.js';

const segmentoSel = document.getElementById('segmento');
SEGMENTOS.forEach((s) => {
  const o = document.createElement('option');
  o.textContent = s;
  segmentoSel.appendChild(o);
});

let last = null;

function renderList(title, color, items, mapFn) {
  const card = document.createElement('article');
  card.className = 'card';
  const h = document.createElement('h3');
  h.textContent = title;
  card.appendChild(h);

  if (!items.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'Nenhum apontamento.';
    card.appendChild(p);
  } else {
    const ul = document.createElement('ul');
    items.forEach((i) => {
      const li = document.createElement('li');
      li.textContent = mapFn(i);
      ul.appendChild(li);
    });
    card.appendChild(ul);
  }

  const b = document.createElement('span');
  b.className = 'badge';
  b.style.background = color;
  b.textContent = ' ';
  card.appendChild(b);
  return card;
}

function render(result) {
  document.getElementById('submeter').disabled = false;
  document.getElementById('progress').style.setProperty('--val', result.score);
  document.getElementById('score').textContent = `${result.score}%`;
  document.getElementById('hitl').textContent = `Human-in-the-loop: ${result.humanInLoop ? 'pendente' : 'n/a'}`;
  document.getElementById('status').textContent = result.status;
  document.getElementById('disclaimer').textContent = result.disclaimer;

  const box = document.getElementById('feedback');
  box.innerHTML = '';
  box.appendChild(renderList('🟢 Verde', '#14532d', result.feedback.green, (x) => `${x.item}: ${x.score}%`));
  box.appendChild(renderList('🟡 Amarelo', '#854d0e', result.feedback.yellow, (x) => `${x.item} — ${x.sugestao}`));
  box.appendChild(renderList('🔴 Vermelho', '#7f1d1d', result.feedback.red, (x) => x.item));
  box.appendChild(renderList('🔵 Azul', '#1e3a8a', result.feedback.blue, (x) => `${x.item}: ${x.insight}`));
}

document.getElementById('analisar').addEventListener('click', () => {
  last = analyzeProposal({
    titulo: document.getElementById('titulo').value,
    resumo: document.getElementById('resumo').value,
    segmento: document.getElementById('segmento').value,
    documentacaoConfirmada: document.getElementById('docs').checked
  });
  render(last);
});

document.getElementById('submeter').addEventListener('click', () => {
  if (!last) return;
  if (last.feedback.red.length > 0) {
    const ok = window.confirm('Há pendências vermelhas. Deseja enviar para auditoria humana mesmo assim?');
    if (!ok) return;
  }
  window.alert('Proposta enviada para validação humana do Conselho Diretor.');
});
