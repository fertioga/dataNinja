# Data Model: Switch With Format

**Feature**: `002-with-format-switch`  
**Date**: 2026-10-06

## Entities

### 1. Preferência de formatação (`with_format`)

| Attribute | Type | Rules |
|-----------|------|-------|
| `with_format` | boolean | Default `true`. Independente de `clock_renew`. Não precisa persistir entre sessões. |

**State transitions**:
- Session start → `true`
- User toggles switch → `true` ↔ `false`
- Toggle **não** muta `result_data_generate` já existente
- Próxima geração lê o valor atual

### 2. Generated Result Item (existente)

Payload já usado no pipeline `event_data` / `result_data_generate`:

| Attribute | Type | Rules |
|-----------|------|-------|
| `field` | string | Key estável do gerador (ex.: `cpf`) |
| `tags` | string[] | Tags de autofill (inalteradas por esta feature) |
| `value` | string \| number | Valor **apresentado**; com `with_format=false` e field no mapa de máscara, já sem separadores |

### 3. Mask Rule (mapa do helper)

| Attribute | Type | Rules |
|-----------|------|-------|
| `field` | string | Deve bater com `Generated Result Item.field` |
| `stripChars` / strategy | rule | Remove apenas separadores de máscara documentados no plan |
| enabled | boolean (implícito) | Regra só existe no mapa quando o campo foi “habilitado” na execução passo a passo |

## Validation rules

1. Se `with_format === true` → `value` igual ao gerado pelo componente (comportamento atual).
2. Se `with_format === false` e `field` tem regra → `value` sem separadores de máscara; caracteres significativos na mesma ordem.
3. Se `with_format === false` e `field` sem regra → `value` intacto.
4. `tags` e `field` nunca são alterados pelo strip.
5. CSR, email, website, name nunca entram no mapa de strip.

## Relationships

```text
with_format (UI state)
    └── controls application of Mask Rule
            └── transforms Generated Result Item.value at generate_data time
                    └── consumed by display / copy / send (unchanged consumers)
```
