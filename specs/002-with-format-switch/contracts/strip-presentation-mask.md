# Contract: stripPresentationMask

**Feature**: `002-with-format-switch`  
**Audience**: `generate_data` em `DataGenerators/Index.vue`  
**Date**: 2026-10-06

## Overview

Função pura que, dado um `field` e um `value`, devolve o valor sem máscara de apresentação quando existir regra para aquele field. Usada somente quando `with_format === false`.

## Function signature (conceptual)

```text
stripPresentationMask(field: string, value: string | number) → string | number
```

## Rules

| Condition | Result |
|-----------|--------|
| `value` não é string | Retornar `value` inalterado |
| `field` sem regra no mapa | Retornar `value` inalterado |
| `field` com regra | Remover apenas separadores listados; preservar ordem dos caracteres restantes |

## Expected transformations (habilitar um field por vez)

| field | Example in | Example out |
|-------|------------|-------------|
| `cpf` | `222.344.555-55` | `22234455555` |
| `ssn` | `123-45-6789` | `123456789` |
| `rg` | `12.345.678-9` | `123456789` |
| `cnpj` | `12.345.678/0001-90` | `12345678000190` |
| `cnpj_alpha` | `12.ABC.345/01DE-35` | `12ABC34501DE35` |
| `phone_br` | `(011) 3456-7890` | `01134567890` |
| `phone_us` | `+1 (555) 123-4567` | `15551234567` |
| `cellphone_br` | `(011) 93456-7890` | `011934567890` |
| `cellphone_us` | `+1 (555) 123-4567` | `15551234567` |
| `date_br` | `09/06/2034` | `09062034` |
| `date_us` | `06/09/2034` | `06092034` |
| `date_db` | `2034-06-09` | `20340609` |
| `cc_validate` | `12/28` | `1228` |
| `uuid_v1` | `a1b2c3d4-e5f6-1a2b-b3c4-d5e6f7a8b9c0` | `a1b2c3d4e5f61a2bb3c4d5e6f7a8b9c0` |
| `uuid_v4` | (mesmo padrão com hífens) | 32 chars sem `-` |
| `uuid_v7` | (mesmo padrão com hífens) | 32 chars sem `-` |

## Compatibility

- Payload continua `{ field, tags, value }`.
- Com `with_format === true`, esta função **não** é chamada (ou é no-op no caller).
- Consumidores de `result_data_generate` não precisam mudar.
