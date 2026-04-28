-- Modelo relacional inicial FunCultura (PostgreSQL)
-- Cardinalidade principal: 1 edital : N propostas

CREATE TABLE IF NOT EXISTS edital (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  segmento_principal TEXT NOT NULL,
  data_abertura DATE NOT NULL,
  data_encerramento DATE NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proposta (
  id BIGSERIAL PRIMARY KEY,
  edital_id BIGINT NOT NULL REFERENCES edital(id) ON DELETE CASCADE,
  proponente_cpf_cnpj TEXT NOT NULL,
  segmento TEXT NOT NULL,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  status_submissao TEXT NOT NULL DEFAULT 'rascunho',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analise_ia (
  id BIGSERIAL PRIMARY KEY,
  proposta_id BIGINT NOT NULL REFERENCES proposta(id) ON DELETE CASCADE,
  score_total NUMERIC(5,2),
  human_in_loop BOOLEAN NOT NULL DEFAULT TRUE,
  feedback_json JSONB NOT NULL,
  red_flags_json JSONB,
  versao_modelo TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auditoria_humana (
  id BIGSERIAL PRIMARY KEY,
  proposta_id BIGINT NOT NULL REFERENCES proposta(id) ON DELETE CASCADE,
  analise_ia_id BIGINT REFERENCES analise_ia(id) ON DELETE SET NULL,
  revisor_id TEXT NOT NULL,
  decisao TEXT NOT NULL,
  justificativa TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proposta_edital_id ON proposta(edital_id);
CREATE INDEX IF NOT EXISTS idx_analise_ia_proposta_id ON analise_ia(proposta_id);
CREATE INDEX IF NOT EXISTS idx_auditoria_humana_proposta_id ON auditoria_humana(proposta_id);
