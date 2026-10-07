# Implementation Plan: CNPJ Alfanumérico (CNPJ Alpha)

**Branch**: `001-cnpj-alpha` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-cnpj-alpha/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Adicionar a opção **CNPJ Alpha** no grupo Company dos geradores de dados, imediatamente abaixo de **CNPJ**, gerando identificadores alfanuméricos de 14 posições conforme a IN RFB nº 2.229/2024 (12 caracteres A–Z/0–9 + 2 DV numéricos, máscara `XX.XXX.XXX/XXXX-XX`). A lógica de geração e cálculo de DV fica em `src/Utils/`; o componente Vue segue o padrão de checkbox + emit do `CNPJ.vue` existente, sem alterar o comportamento do CNPJ numérico.

## Technical Context

**Language/Version**: JavaScript (ES modules via Laravel Mix / Webpack), Vue 3 Options API

**Primary Dependencies**: Vue 3, Pinia (fluxo existente de geradores), Bootstrap 5 (layout do grupo Company); sem novas dependências npm

**Storage**: N/A (geração em memória; payload emitido no fluxo atual de `event_data`)

**Testing**: Sem suite automatizada no projeto hoje; validação manual via `quickstart.md` + verificação do exemplo oficial `12.ABC.345/01DE-35` (DV = 35) e amostragem de gerações aleatórias

**Target Platform**: Chrome Extension (Manifest V3), popup/UI do Data Ninja

**Project Type**: Browser extension (Vue UI em `src/`, build em `dist/`)

**Performance Goals**: Geração síncrona percebida como instantânea (&lt; 50 ms por valor no uso típico)

**Constraints**: Offline (sem chamadas à Receita Federal); DV conforme manual SERPRO/RFB; pelo menos uma letra A–Z nas 12 primeiras posições; manter CNPJ numérico intacto

**Scale/Scope**: 1 util de geração/DV + 1 componente Vue + wiring em `CompanyGroup/Index.vue`; sem store Pinia nova; sem JSON em `src/Data/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate / Principle | Status | Notes |
|------------------|--------|-------|
| Feature gate Q1 — Who needs this? | PASS | QA, PO e devs testando formulários/máscaras/cadastros com CNPJ alfanumérico |
| Feature gate Q2 — Concrete problem? | PASS | Falta opção de gerar CNPJ alfanumérico válido no toolbox |
| Feature gate Q3 — Recurring? | PASS | Necessidade recorrente com implantação RFB (jul/2026) e dual-format |
| Feature gate Q4 — In current context? | PASS | Dentro do grupo Company dos geradores; sem sair da extensão |
| Feature gate Q5 — Reduce effort? | PASS | Evita cálculo manual de DV e busca em sites externos |
| Feature gate Q6 — Useful without clutter? | PASS | Uma checkbox abaixo de CNPJ; mesmo padrão de interação |
| I Stay on the Page | PASS | Geração local no popup |
| III Fake Data in Context | PASS | Dado de teste claramente fake/gerado |
| V Immediate Use / VII Speed / VIII Simplicity | PASS | Marcar → gerar → usar; sem config extra |
| X Consistency | PASS | Mesmo contrato `field`/`tags`/`value` e checkbox do grupo |
| XI Brazil First | PASS | Norma brasileira RFB/SERPRO |
| XIV Information Quality | PASS | Valores com DV válidos; não se apresentam como CNPJ real inscrito |

**Post-Phase 1 re-check**: Design (util + componente + wiring) permanece alinhado; sem violação que exija Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-cnpj-alpha/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── Utils/
│   └── generate.js          # Estender com generateCnpjAlpha (+ helpers de DV)
├── js/Components/DataGenerators/
│   ├── Checkbox.vue         # Reutilizado (sem mudança esperada)
│   └── CompanyGroup/
│       ├── Index.vue        # Incluir CNPJ Alpha abaixo de CNPJ
│       ├── CNPJ.vue         # Intact (numérico)
│       ├── CNPJAlpha.vue    # Novo componente checkbox + emit
│       ├── Company.vue
│       └── Website.vue
```

**Structure Decision**: Extensão single-project Vue já existente. Nova ferramenta segue a convenção do repo: componente em `CompanyGroup/`, lógica pura de geração em `src/Utils/generate.js`, integração via `Index.vue` do grupo. Não criar pasta paralela nem artefatos em `dist/` à mão.

## Complexity Tracking

> Sem violações da constitution; tabela não aplicável.
