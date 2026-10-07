# Implementation Plan: Switch With Format (Generate Fake Data)

**Branch**: `002-with-format-switch` | **Date**: 2026-10-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-with-format-switch/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Adicionar o switch **with format** ao lado de **renew** no bloco Generate fake data. Quando ligado (padrão), a apresentação permanece como hoje. Quando desligado, a pontuação de máscara é removida **no momento em que o valor entra na lista de resultados** (`generate_data`), sem alterar o código de send para a página (FR-012).

Abordagem: (1) UI do switch; (2) helper central de strip por `field`; (3) aplicar o helper em `generate_data` quando o switch estiver off; (4) habilitar **um campo por vez** na tabela de regras (ver seção Execution Order abaixo).

## Technical Context

**Language/Version**: JavaScript (ES modules via Laravel Mix / Webpack), Vue 3 Options API

**Primary Dependencies**: Vue 3, Bootstrap 5 (`form-switch` já usado por renew); sem novas dependências npm

**Storage**: N/A (estado do switch em memória do componente `DataGenerators/Index.vue`, como `clock_renew`)

**Testing**: Sem suite automatizada no projeto; validação manual campo a campo via [quickstart.md](./quickstart.md)

**Target Platform**: Chrome Extension (Manifest V3), UI do Data Ninja

**Project Type**: Browser extension (Vue UI em `src/`, build em `dist/`)

**Performance Goals**: Strip síncrono negligível (&lt; 1 ms por valor)

**Constraints**: Não alterar código de envio para a página (FR-012); não corromper e-mail/website/CSR; padrão do switch = ligado; preferência aplica na próxima geração

**Scale/Scope**: 1 alteração de UI + 1 util de strip + wiring em `generate_data` + N regras por campo, executáveis uma a uma

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate / Principle | Status | Notes |
|------------------|--------|-------|
| Feature gate Q1–Q6 | PASS | Preferência de formato no bloco fake data; um switch; reduz esforço |
| I / III / V / VII / VIII / X / XIV | PASS | Popup local; uso imediato; padrão renew; value = copy |

**Post-Phase 1 re-check**: Design alinhado; sem Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/002-with-format-switch/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── Utils/
│   └── stripPresentationMask.js    # Helper puro field → value sem máscara
├── js/Components/DataGenerators/
│   └── Index.vue                   # Switch with format + strip em generate_data
```

**Structure Decision**: Strip central no pai + mapa de regras por `field`. Filhos geram formatado; pai decide apresentação. Não editar métodos de send/copy.

## Complexity Tracking

> Sem violações; tabela não aplicável.

---

## Execution Order — um campo por vez

### Infra

| Step | Item | Arquivo(s) |
|------|------|------------|
| A | Switch UI **with format** (default ON) | `DataGenerators/Index.vue` |
| B | Helper `stripPresentationMask(field, value)` | `src/Utils/stripPresentationMask.js` |
| C | Wiring em `generate_data` se `!with_format` | `DataGenerators/Index.vue` |

### Campos COM máscara (um por vez)

| # | Field key | Sem format (alvo) |
|---|-----------|-------------------|
| 1 | `cpf` | `22234455555` |
| 2 | `ssn` | `123456789` |
| 3 | `rg` | `123456789` |
| 4 | `cnpj` | `12345678000190` |
| 5 | `cnpj_alpha` | `12ABC34501DE35` |
| 6 | `phone_br` | só dígitos |
| 7 | `phone_us` | só dígitos |
| 8 | `cellphone_br` | só dígitos |
| 9 | `cellphone_us` | só dígitos |
| 10 | `date_br` | `09062034` |
| 11 | `date_us` | `06092034` |
| 12 | `date_db` | `20340609` |
| 13 | `cc_validate` | `1228` |
| 14 | `uuid_v1` | 32 hex sem `-` |
| 15 | `uuid_v4` | 32 hex sem `-` |
| 16 | `uuid_v7` | 32 hex sem `-` |

### Campos SEM máscara (só verificar)

passport_br, passport_us, cnh, credit_card, cvv, date_timestamp, ulid, name, email, company, website, password, lorem, csr
