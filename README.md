# FunCultura Guarulhos — WebApp de Assessoria e Avaliação Digital

Este repositório contém a base estratégica e técnica para uma aplicação web de gestão de editais culturais e mentoria por IA para o Fundo Municipal de Cultura de Guarulhos (FunCultura).

## Objetivo

Digitalizar o fluxo de submissão e triagem técnica de propostas, preservando a soberania decisória humana do Conselho Diretor e do CMPC, com IA atuando apenas como apoio informativo.

## Pilares

- **Conformidade legal local**: Leis 5.947/2003, 6.541/2009 e 7.471/2016.
- **Paridade social**: 50% poder público e 50% sociedade civil.
- **IA não decisória**: análise técnica, mentoria e sinalização de risco com validação humana obrigatória.
- **Acessibilidade cultural**: feedback pedagógico por cores para reduzir exclusão técnica.

## Segmentos obrigatórios (Lei 7.471/2016)

1. Artes Visuais e Artesanato
2. Patrimônio Histórico
3. Livro e Literatura
4. Audiovisual
5. Hip Hop
6. Música
7. Artes Cênicas
8. Cultura Popular Tradicional
9. Instituições Culturais Não-Governamentais

## Arquitetura resumida

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Node.js + PostgreSQL
- **Autenticação**: gov.br via OAuth 2.0
- **IA**: OpenAI API (análise semântica de aderência)
- **Contexto institucional**: `CLAUDE.md` como memória cultural e normativa
- **Integração contextual**: MCP para leitura dinâmica de editais e referências
- **Auditoria**: hooks de pós-análise com gatilho para revisão humana

## Módulos funcionais

### 1) Módulo Diretor Avaliador (Relator Digital)

- Upload de edital e parametrização de pesos de avaliação.
- Dashboard analítico com status por segmento e critérios.
- Curadoria humana para confirmar/refutar recomendações da IA.

### 2) Módulo Proponente (Mentoria Digital)

Feedback por cores:

- **Verde**: aderência recomendada
- **Amarelo**: melhorias desejáveis
- **Vermelho**: pendências obrigatórias (com confirmação explícita)
- **Azul**: oportunidades de conexão cultural local

## Regras críticas de negócio

1. A IA nunca aprova ou reprova automaticamente propostas.
2. Submissão com itens vermelhos exige diálogo de confirmação.
3. A decisão de mérito final é humana e auditável.
4. Toda análise deve registrar trilha de auditoria (quem, quando, por quê).

## Próximos artefatos

- `CLAUDE.md`: memória institucional e referências culturais locais.
- `docs/master-developer-prompt.md`: prompt mestre para implementação.
- `docs/domain-model.sql`: modelo relacional inicial (1 edital : N propostas).

## Preview local (sem dependências externas)

Como esta versão é um protótipo funcional em HTML/CSS/JS puro, execute:

```bash
cd web
python3 -m http.server 4173
```

Depois, acesse `http://localhost:4173`.


### Validação funcional rápida

```bash
cd web
node smoke-test.mjs
```

Esse teste valida o motor de análise (score, feedback por cores e red flags) em dois cenários.


## Publicar sem instalar (GitHub Pages automático)

Se você quiser experimentar online sem instalar nada localmente, este repositório já inclui workflow de deploy.

### Como ativar

1. Suba este repositório para o GitHub.
2. Vá em **Settings → Pages** e em *Build and deployment* selecione **GitHub Actions**.
3. Faça push para a branch `main` (deploy automático ocorre no push da `main`).
4. O workflow `.github/workflows/deploy-pages.yml` publica automaticamente a pasta `web/`.

### Onde acessar

Depois do deploy, a aplicação fica disponível em:

`https://<seu-usuario>.github.io/<seu-repositorio>/`

Obs.: para este protótipo estático, não é necessário instalar dependências.


### Se aparecer erro 404 no GitHub Pages

Faça este checklist:

1. O PR precisa estar **mergeado** (o workflow deve existir na branch do repositório).
2. Em **Settings → Pages**, selecione **Build and deployment: GitHub Actions**.
3. Verifique a aba **Actions** e confirme que o job `Deploy FunCultura Preview to GitHub Pages` concluiu com sucesso.
4. Após deploy bem-sucedido, aguarde ~1-3 minutos e recarregue:
   `https://<seu-usuario>.github.io/<seu-repositorio>/`
5. Se ainda der 404, execute manualmente o workflow em **Actions → Deploy FunCultura Preview to GitHub Pages → Run workflow**.
6. Se o erro mencionar `Get Pages site failed`, habilite o GitHub Pages em **Settings → Pages** com fonte **GitHub Actions** e rode o workflow novamente.

7. Se aparecer `Resource not accessible by integration`, verifique em **Settings → Actions → General → Workflow permissions** se está marcado **Read and write permissions** para o `GITHUB_TOKEN`.

