# Research: Switch With Format (Generate Fake Data)

**Feature**: `002-with-format-switch`  
**Date**: 2026-10-06

## 1. Onde aplicar a preferência de formatação

**Decision**: Aplicar o strip (quando **with format** off) no ponto único `generate_data` de `DataGenerators/Index.vue`, imediatamente antes de `result_data_generate.push(data)`.

**Rationale**:
- Cobre Generate Data e renew (ambos disparam o mesmo fluxo de emissão → `generate_data`).
- Copy/send já leem `result.value` da lista — sem alterar FR-012 (código de send intacto).
- Filhos continuam gerando com máscara atual; evita N props/`provide` em ~30 componentes.

**Alternatives considered**:
- Prop/`provide` `withFormat` em cada gerador (rejeitado: alto acoplamento; difícil executar campo a campo sem tocar UI de cada um).
- Strip no template de exibição apenas (rejeitado: copy usaria valor formatado se o store mantivesse máscara — risco de inconsistência).
- Gerar sempre “raw” e formatar só na UI (rejeitado: refator grande; regressão no comportamento atual com switch on).

## 2. Helper central vs regras inline

**Decision**: Criar `src/Utils/stripPresentationMask.js` exportando `stripPresentationMask(field, value)` com um mapa `field → regra`. Campos ausentes no mapa retornam `value` sem mudança.

**Rationale**: Permite habilitar **um field por vez** (pedido explícito do plano). Isola lógica pura fora de Vue. Facilita validação manual por linha da tabela do plan.

**Alternatives considered**:
- Regex genérica “remover tudo que não é alfanumérico” (rejeitado: quebraria e-mail, website, CSR se aplicada por engano; mapa explícito é mais seguro).
- Função por componente (rejeitado: duplicação e execução campo-a-campo mais confusa).

## 3. Estratégia de strip por tipo

**Decision**: Para cada field com máscara, remover apenas os separadores documentados no plan (não reordenar; não recalcular DV).

| Família | Estratégia |
|---------|------------|
| Documentos BR/US com pontuação (CPF, CNPJ, CNPJ Alpha, RG, SSN) | Remover `.` `/` `-` conforme o valor |
| Telefones | Remover `+`, `(`, `)`, espaços e `-`; manter dígitos |
| Datas BR/US/DB e validade de cartão | Remover `/` ou `-` de máscara |
| UUID v1/v4/v7 | Remover `-` |
| Passaporte, CNH, cartão, CVV, ULID, timestamp | No-op (já sem máscara relevante) |
| Name, email, company, website, password, lorem, CSR | Fora do mapa (nunca strip) |

**Rationale**: Alinha US1/SC-001 (inclui telefones, RG, SSN, CNPJs, UUIDs, datas) sem corromper conteúdo semântico (FR-008).

**Alternatives considered**:
- Manter `+` em telefones US (aceitável, mas exemplos do produto pedem “sem formatação” → só dígitos; decisão: remover `+` também).
- Tratar UUID como no-op (rejeitado: spec atual lista UUIDs em SC-001/US1).

## 4. Estado padrão e ciclo de vida do switch

**Decision**: `with_format: true` no `data()` de `Index.vue`; não persistir; não reagir a toggle para reescrever resultados já listados.

**Rationale**: Spec FR-002 / FR-011 / Assumptions. Mesmo padrão de volatilidade do renew (sem localStorage).

**Alternatives considered**:
- Persistir em `useStorage` (adiado; fora do escopo v1).
- Reformatar lista ao togglear (fora do escopo; complexidade sem pedido).

## 5. Nomes reais dos `field` keys

**Decision**: Usar as keys já emitidas pelos componentes (`cpf`, `ssn`, `rg`, `cnpj`, `cnpj_alpha`, `phone_br`, `phone_us`, `cellphone_br`, `cellphone_us`, `date_br`, `date_us`, `date_db`, `cc_validate`, `uuid_v1`, `uuid_v4`, `uuid_v7`).

**Rationale**: Inventário no código atual; o mapa do helper deve usar exatamente essas strings.

**Alternatives considered**: Strip por label UI (rejeitado: labels mudam; keys são estáveis).

## 6. UI do switch

**Decision**: Replicar o bloco Bootstrap `form-check form-switch` de renew, na coluna vizinha (mesmo row), label `with format`, id distinto (ex.: `ck_with_format`).

**Rationale**: Consistency (constitution X); zero dependência nova.

**Alternatives considered**: Toggle Material / botão (rejeitado: diverge do renew).
