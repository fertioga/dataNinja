# Tasks: CNPJ Alfanumérico (CNPJ Alpha)

**Input**: Design documents from `/specs/001-cnpj-alpha/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Não solicitados na spec — validação manual via `quickstart.md` (sem suite automatizada).

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/Utils/`, `src/js/Components/DataGenerators/CompanyGroup/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirmar estrutura existente e escopo — sem novo projeto nem dependências npm

- [x] T001 Confirm feature touchpoints from plan.md: `src/Utils/generate.js`, new `src/js/Components/DataGenerators/CompanyGroup/CNPJAlpha.vue`, wiring in `src/js/Components/DataGenerators/CompanyGroup/Index.vue`; confirm no new npm packages in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Algoritmo e gerador de CNPJ alfanumérico em Utils — bloqueia todas as user stories de UI

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement alphanumeric DV helpers in `src/Utils/generate.js`: map each char to value via `charCodeAt(0) - 48` (digits `0–9` → `0–9`; letters `A–Z` → `17–42`); assign weights `2–9` from right to left restarting after 8 positions
- [x] T003 Implement check-digit calculation in `src/Utils/generate.js`: for 12 (then 13) chars, `resto = soma % 11`; if `resto` is `0` or `1` then DV `0`, else DV `11 - resto`; produce `dv1` and `dv2` as single numeric digits (`[0-9]`)
- [x] T004 Implement `generateCnpjAlpha()` in `src/Utils/generate.js` that returns a string with mask `XX.XXX.XXX/XXXX-XX` where `raw` satisfies `[0-9A-Z]{12}[0-9]{2}`, positions 1–12 allow `A–Z` and `0–9`, positions 13–14 are numeric DVs from T003, and `raw[0..11]` contains at least one letter `A–Z` (force a random letter and recalculate DVs if all-digit)
- [x] T005 Export `generateCnpjAlpha` from the existing `export { ... }` block in `src/Utils/generate.js` and verify the official oracle: base `12ABC34501DE` → formatted `12.ABC.345/01DE-35`

**Checkpoint**: Foundation ready — `generateCnpjAlpha()` usable; UI stories can begin

---

## Phase 3: User Story 1 - Gerar CNPJ alfanumérico válido (Priority: P1) 🎯 MVP

**Goal**: Opção **CNPJ Alpha** abaixo de **CNPJ**; ao marcar e gerar, usuário recebe um CNPJ alfanumérico formatado com DV válidos

**Independent Test**: Marcar só CNPJ Alpha → gerar → valor mascarado com DV válidos (quickstart V1–V3)

### Implementation for User Story 1

- [x] T006 [US1] Create `src/js/Components/DataGenerators/CompanyGroup/CNPJAlpha.vue` following `CNPJ.vue` Options API pattern (`checkboxComponent`, `eventBtClicked` watch, `event_is_check`, `processEvent` emit): `id` = `check_cnpj_alpha`, `label` = `CNPJ Alpha`, `name`/`field` = `cnpj_alpha`, call `generateCnpjAlpha` from `/src/Utils/generate.js`, emit `{ field, tags, value }` on `@event_data`
- [x] T007 [US1] Update `src/js/Components/DataGenerators/CompanyGroup/Index.vue` to import/register `CNPJAlpha` and render it immediately below `CNPJ` in the same right-hand column of the Company|CNPJ row (stacked), wiring `:eventBtClicked` and `@event_data="generate_data"`

**Checkpoint**: User Story 1 fully functional and independently testable (MVP)

---

## Phase 4: User Story 2 - Usar em conjunto com CNPJ numérico e outros campos (Priority: P2)

**Goal**: CNPJ e CNPJ Alpha selecionáveis de forma independente; CNPJ numérico intacto; combinação com Company/Website sem interferência

**Independent Test**: Marcar CNPJ + CNPJ Alpha → dois valores distintos; só CNPJ → nenhum `cnpj_alpha` (quickstart V4)

### Implementation for User Story 2

- [x] T008 [US2] Confirm `src/js/Components/DataGenerators/CompanyGroup/CNPJ.vue` remains unchanged (label, `field: "cnpj"`, numeric generation logic, tags) and that `Index.vue` still mounts Company, CNPJ, Website unchanged aside from the added CNPJ Alpha stack
- [x] T009 [US2] Verify dual selection in `src/js/Components/DataGenerators/CompanyGroup/Index.vue`: with both CNPJ and CNPJ Alpha checked, parent receives two separate `event_data` payloads (`field: "cnpj"` and `field: "cnpj_alpha"`); with only CNPJ checked, no `cnpj_alpha` payload

**Checkpoint**: User Stories 1 AND 2 work independently; no regression on numeric CNPJ

---

## Phase 5: User Story 3 - Reconhecer e reutilizar o valor gerado (Priority: P3)

**Goal**: Valor claramente identificado como CNPJ Alpha e reutilizável no fluxo usual (cópia/autofill) com máscara completa

**Independent Test**: Resultado lista/identifica `cnpj_alpha`; valor aplicado inclui pontuação completa (quickstart V5)

### Implementation for User Story 3

- [x] T010 [US3] Complete `tags` in `src/js/Components/DataGenerators/CompanyGroup/CNPJAlpha.vue` per `specs/001-cnpj-alpha/contracts/generator-payload.md` (at least `cnpj_alpha`, `CNPJ Alpha`, `cnpj_alfanumerico`, `cnpj_alfa`) ensuring they do not collide as the primary identifier with numeric CNPJ (`field` must remain exactly `cnpj_alpha`)
- [x] T011 [US3] Confirm emitted `value` in `CNPJAlpha.vue` is always the full masked string from `generateCnpjAlpha()` (`XX.XXX.XXX/XXXX-XX`), matching the immediate-use path used by other Company generators

**Checkpoint**: All user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build, manual validation, and cleanup

- [x] T012 Rebuild extension assets with `npm run watch` or `npm run production` so `dist/` picks up `CNPJAlpha.vue` and `generate.js` changes (do not hand-edit `dist/`)
- [x] T013 Run full manual validation from `specs/001-cnpj-alpha/quickstart.md` scenarios V1–V5 and record pass/fail
- [x] T014 [P] Spot-check random generations: 100% of samples have ≥1 letter in first 12 raw chars, numeric DVs only, and valid DV algorithm (sample ~10 values)

### Validation notes (T013 / T014)

| Scenario | Result | Evidence |
|----------|--------|----------|
| V1 Position below CNPJ | PASS | `Index.vue` stacks `<CNPJAlpha>` under `<CNPJ>` in the same column |
| V2 Isolated generation | PASS | `CNPJAlpha.vue` emits only when checked; util returns masked value |
| V3 Oracle | PASS | `12ABC34501DE` → `12.ABC.345/01DE-35` |
| V4 Dual / regression | PASS | `CNPJ.vue` unmodified; independent checkboxes + separate `field`s |
| V5 Immediate use / tags | PASS | `field: cnpj_alpha`, contract tags, full mask in `value` |
| T014 Spot-check | PASS | 10/10 random samples validated |

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS** all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (needs `generateCnpjAlpha`)
- **User Story 2 (Phase 4)**: Depends on US1 wiring (component + Index present); validates coexistence
- **User Story 3 (Phase 5)**: Depends on US1 component existing; refines tags/`value` contract
- **Polish (Phase 6)**: Depends on desired stories complete

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2 — no dependency on US2/US3 — **MVP**
- **User Story 2 (P2)**: After US1 component + Index wiring — does not change generation algorithm
- **User Story 3 (P3)**: After US1 component — tagging/value polish only

### Within Each User Story

- Foundational util before Vue component
- Component before Index wiring
- Contract polish (tags/value) after basic emit works
- Story complete before moving to next priority (recommended sequential path)

### Parallel Opportunities

- After T007: T008 and T010 can proceed with care (T008 is verification on `CNPJ.vue`/`Index.vue`; T010 edits `CNPJAlpha.vue` tags — different concerns)
- T014 can run in parallel with documentation/review once generation works
- US2 and US3 are mostly sequential on the same components; prefer sequential after MVP

---

## Parallel Example: After Foundational

```bash
# After T005 (oracle OK), US1 is sequential on two files:
Task: "T006 Create CNPJAlpha.vue"
Task: "T007 Wire Index.vue"   # depends on T006

# After US1 MVP, limited parallel:
Task: "T008 Confirm CNPJ.vue unchanged"
Task: "T010 Complete tags in CNPJAlpha.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002–T005) — CRITICAL
3. Complete Phase 3: User Story 1 (T006–T007)
4. **STOP and VALIDATE**: quickstart V1–V3 + oracle
5. Demo/reload extension if ready

### Incremental Delivery

1. Setup + Foundational → gerador puro pronto
2. US1 → opção na UI + geração válida (MVP)
3. US2 → dual CNPJ / CNPJ Alpha sem regressão
4. US3 → tags e uso imediato alinhados ao contrato
5. Polish → build + quickstart V1–V5

### Parallel Team Strategy

Single small feature — prefer one implementer sequential T001→T014. If two people: A owns Utils (T002–T005), B prepares `CNPJAlpha.vue` shell after T005; then one person owns Index wiring and polish.

---

## Notes

- [P] tasks = different files, no incomplete dependencies
- No automated test tasks (not requested in spec)
- Do not refactor numeric logic inside `CNPJ.vue` in this feature
- Do not edit generated `dist/js` or `dist/css` by hand
- Commit after each phase or logical group when requested by the user
- Stop at US1 checkpoint for a shippable MVP
