# Tasks: Switch With Format (Generate Fake Data)

**Input**: Design documents from `/specs/002-with-format-switch/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Não solicitados na spec — validação manual via `quickstart.md` (sem suite automatizada).

**Organization**: Tasks grouped by user story. Campos com máscara são tasks **separadas** (um field por vez) conforme pedido no plan.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/Utils/`, `src/js/Components/DataGenerators/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirmar touchpoints e escopo — sem novo projeto nem dependências npm

- [x] T001 Confirm feature touchpoints from plan.md: new `src/Utils/stripPresentationMask.js`, edits only in `src/js/Components/DataGenerators/Index.vue` for switch + `generate_data` wiring; confirm no new npm packages in `package.json`; confirm FR-012 — do not modify send handlers (`searchAndWrite`, `searchAndWhriteAll`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Switch UI + helper stub + wiring — MUST complete before field rules / user stories

**⚠️ CRITICAL**: No user story field work can begin until this phase is complete

- [x] T002 Add `with_format: true` to `data()` in `src/js/Components/DataGenerators/Index.vue` (default ON; independent of `clock_renew`; no persistence)
- [x] T003 Add Bootstrap `form-check form-switch` labeled **with format** beside **renew** in the top controls row of `src/js/Components/DataGenerators/Index.vue` (`id` e.g. `ck_with_format`, `v-model="with_format"`)
- [x] T004 Create `src/Utils/stripPresentationMask.js` exporting `stripPresentationMask(field, value)` that returns `value` unchanged for unknown fields / non-strings (empty rule map initially)
- [x] T005 Wire `generate_data` in `src/js/Components/DataGenerators/Index.vue`: when `with_format` is false, set `data.value = stripPresentationMask(data.field, data.value)` before `result_data_generate.push(data)`; when true, push unchanged; do not edit copy/send methods

**Checkpoint**: Foundation ready — switch visible (default ON); strip hook active but no field rules yet (OFF behaves like ON until rules are added)

---

## Phase 3: User Story 1 - Gerar dados sem máscara (Priority: P1) 🎯 MVP

**Goal**: Com **with format** OFF, valores com máscara aparecem sem pontuação; executar **um field por vez**

**Independent Test**: Desligar switch → gerar field → valor sem separadores (quickstart linhas 1–16)

### Implementation — um campo por vez

> Complete and validate each task before starting the next. Only edit the rule map in `src/Utils/stripPresentationMask.js` (plus manual check in UI).

- [x] T006 [US1] Add rule for `cpf` in `src/Utils/stripPresentationMask.js`: strip `.` and `-` (e.g. `222.344.555-55` → `22234455555`); validate OFF/ON via `IdentificationGroup/CPF.vue` generation path
- [x] T007 [US1] Add rule for `ssn` in `src/Utils/stripPresentationMask.js`: strip `-` (e.g. `123-45-6789` → `123456789`); validate via `IdentificationGroup/SSN.vue`
- [x] T008 [US1] Add rule for `rg` in `src/Utils/stripPresentationMask.js`: strip `.` and `-`; validate via `IdentificationGroup/RG.vue`
- [x] T009 [US1] Add rule for `cnpj` in `src/Utils/stripPresentationMask.js`: strip `.`, `/`, `-`; validate via `CompanyGroup/CNPJ.vue`
- [x] T010 [US1] Add rule for `cnpj_alpha` in `src/Utils/stripPresentationMask.js`: strip `.`, `/`, `-` keeping letters+digits (e.g. `12.ABC.345/01DE-35` → `12ABC34501DE35`); validate via `CompanyGroup/CNPJAlpha.vue`
- [x] T011 [US1] Add rule for `phone_br` in `src/Utils/stripPresentationMask.js`: strip `+`, `(`, `)`, spaces, `-` → digits only; validate via `PersonGroup/PhoneBr.vue`
- [x] T012 [US1] Add rule for `phone_us` in `src/Utils/stripPresentationMask.js`: strip `+`, `(`, `)`, spaces, `-` → digits only; validate via `PersonGroup/PhoneUs.vue`
- [x] T013 [US1] Add rule for `cellphone_br` in `src/Utils/stripPresentationMask.js`: strip `+`, `(`, `)`, spaces, `-` → digits only; validate via `PersonGroup/CellPhoneBr.vue`
- [x] T014 [US1] Add rule for `cellphone_us` in `src/Utils/stripPresentationMask.js`: strip `+`, `(`, `)`, spaces, `-` → digits only; validate via `PersonGroup/CellPhoneUs.vue`
- [x] T015 [US1] Add rule for `date_br` in `src/Utils/stripPresentationMask.js`: strip `/` (e.g. `09/06/2034` → `09062034`); validate via `DateGroup/DateBr.vue`
- [x] T016 [US1] Add rule for `date_us` in `src/Utils/stripPresentationMask.js`: strip `/` (e.g. `06/09/2034` → `06092034`); validate via `DateGroup/DateUs.vue`
- [x] T017 [US1] Add rule for `date_db` in `src/Utils/stripPresentationMask.js`: strip `-` (e.g. `2034-06-09` → `20340609`); validate via `DateGroup/DateDb.vue`
- [x] T018 [US1] Add rule for `cc_validate` in `src/Utils/stripPresentationMask.js`: strip `/` (e.g. `12/28` → `1228`); validate via `FinancialGroup/CreditCardValidateDate.vue`
- [x] T019 [US1] Add rule for `uuid_v1` in `src/Utils/stripPresentationMask.js`: strip `-` → 32 hex chars; validate via `SystemGroup/UUID_v1.vue`
- [x] T020 [US1] Add rule for `uuid_v4` in `src/Utils/stripPresentationMask.js`: strip `-` → 32 hex chars; validate via `SystemGroup/UUID_v4.vue`
- [x] T021 [US1] Add rule for `uuid_v7` in `src/Utils/stripPresentationMask.js`: strip `-` → 32 hex chars; validate via `SystemGroup/UUID_v7.vue`

**Checkpoint**: User Story 1 MVP — at minimum T006 (`cpf`) + T015 (`date_br`) prove the feature; remaining field tasks can continue incrementally

---

## Phase 4: User Story 2 - Manter formatação com switch ligado (Priority: P1)

**Goal**: Default ON e gerações com switch ligado preservam máscara atual (sem regressão)

**Independent Test**: Switch ON → CPF/data com máscara atual; ao abrir, switch já ligado

### Implementation for User Story 2

- [x] T022 [US2] Verify default `with_format: true` in `src/js/Components/DataGenerators/Index.vue` shows switch selected on first open and does not call strip in `generate_data` when ON
- [x] T023 [US2] Manually confirm with switch ON that `cpf` and `date_br` (and any rules already added) still render with current masks — no changes to child generators required

**Checkpoint**: US1 OFF path and US2 ON path both work; no regression when switch is ON

---

## Phase 5: User Story 3 - Preferência em qualquer geração do bloco (Priority: P2)

**Goal**: Mesma preferência em Generate Data multi-campo e em regenerações via **renew**; no-ops intactos

**Independent Test**: OFF + vários campos → todos stripped; renew OFF → stripped; name/email intactos

### Implementation for User Story 3

- [x] T024 [US3] Confirm `renewClock` / `btIsClicked` path in `src/js/Components/DataGenerators/Index.vue` still flows through `generate_data` so strip applies on auto-renew when `with_format` is false (no code change to send; only verify)
- [x] T025 [US3] Confirm fields without rules remain unchanged when OFF: at least `name`, `email`, `passport_br`, `cnh`, `credit_card`, `ulid`, `csr` (not present in `stripPresentationMask` map)
- [x] T026 [US3] Confirm toggling **with format** does not mutate existing `result_data_generate` until next Generate Data / renew; confirm **clean** / **renew** independence from `with_format` in `src/js/Components/DataGenerators/Index.vue`

**Checkpoint**: Preference applies globally across the Generate fake data block

---

## Phase 6: User Story 4 - Valor apresentado no fluxo imediato (Priority: P3)

**Goal**: Copy (e send existente) usam o `value` já apresentado; **sem** alterar código de send (FR-012)

**Independent Test**: OFF → gerar CPF → copy = valor sem máscara; send usa o mesmo `result.value` já na lista

### Implementation for User Story 4

- [x] T027 [US4] Verify `copyIndividualContent` / `copyAllContent` in `src/js/Components/DataGenerators/Index.vue` already copy `result.value` / listed values — no code change; manual check with switch OFF
- [x] T028 [US4] Verify send helpers (`searchAndWrite`, `searchAndWhriteAll`) in `src/js/Components/DataGenerators/Index.vue` are **unchanged** (git diff empty on those methods) and still consume presented `value` from `result_data_generate`

**Checkpoint**: Immediate-use path consistent; FR-012 satisfied

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validação completa e guardrails

- [x] T029 Run full field checklist in `specs/002-with-format-switch/quickstart.md` (fields 1–16 + no-ops)
- [x] T030 Confirm no accidental edits to send-to-page logic in `src/js/Components/DataGenerators/Index.vue` (FR-012) and rebuild UI via existing Mix pipeline if needed (`npm run watch` / `npm run production`) — do not hand-edit `dist/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational; field tasks T006–T021 are sequential by design (one field at a time)
- **US2 (Phase 4)**: Can start after T005 (+ ideally T006 for a concrete ON/OFF pair)
- **US3 (Phase 5)**: After US1 has enough rules (recommend after T006–T021 or at least after MVP fields)
- **US4 (Phase 6)**: After US1 MVP (strip already applied before push)
- **Polish (Phase 7)**: After desired field coverage

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — core value (unformatted output)
- **US2 (P1)**: After Phase 2 — largely verification of default ON
- **US3 (P2)**: After US1 rules exist for multi-field coverage
- **US4 (P3)**: After strip lands in `generate_data` (Phase 2 + any US1 rule)

### Within US1 (field order)

Execute **strictly one at a time**: T006 → T007 → … → T021. Do not batch multiple field rules in one change if you want isolated validation.

### Parallel Opportunities

- Limited: T002–T005 touch the same `Index.vue` / shared helper — keep sequential
- T022–T023 (US2) can proceed after T005 without waiting for all field rules
- T027–T028 (US4) are verification-only after Phase 2
- No [P] on field-rule tasks — same file `stripPresentationMask.js`

---

## Parallel Example: After Foundation

```bash
# After T005, a second person can verify US2 default ON while you add field rules:
Task: "T022 [US2] Verify default with_format true in Index.vue"
Task: "T006 [US1] Add cpf rule in stripPresentationMask.js"
# Do NOT parallelize T006–T021 against each other (same file, sequential validation)
```

---

## Implementation Strategy

### MVP First (US1 minimal)

1. Complete Phase 1–2 (T001–T005)
2. Complete T006 (`cpf`) + T015 (`date_br`) — canonical examples from the spec
3. **STOP and VALIDATE** with switch OFF/ON
4. Continue remaining fields one by one (T007–T014, T016–T021)

### Incremental Delivery

1. Setup + Foundational → switch works, no rules
2. Add `cpf` → demo MVP
3. Add remaining fields one by one
4. US2/US3/US4 verification + quickstart polish

### Suggested solo order

`T001 → T002 → T003 → T004 → T005 → T006 → T015 → T022 → T023 → (T007…T021 one by one) → T024 → T025 → T026 → T027 → T028 → T029 → T030`

---

## Notes

- Each US1 field task edits only `src/Utils/stripPresentationMask.js` (after foundation)
- Child generator `.vue` files should **not** need changes for strip
- Never modify send-to-page methods (FR-012)
- Commit after each field task if you want clean bisect/rollback
- Stop at any checkpoint to validate independently
