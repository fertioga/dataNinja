# Contract: With Format Switch UI

**Feature**: `002-with-format-switch`  
**Audience**: Bloco Generate fake data (`DataGenerators/Index.vue`)  
**Date**: 2026-10-06

## Overview

Controle switch que define se os valores gerados entram em `result_data_generate` com ou sem máscara de apresentação.

## UI contract

| Element | Requirement |
|---------|-------------|
| Control type | Bootstrap `form-check form-switch` (mesmo padrão de **renew**) |
| Label | `with format` |
| Position | Ao lado do switch **renew** (mesmo row de controles superiores) |
| Default | Selected / ON (`with_format === true`) |
| Independence | Toggle não altera estado de **renew** nem dispara **clean** |
| Side effect on toggle | Nenhum sobre resultados já listados |

## Behavior contract

| `with_format` | Generate Data / renew | `result_data_generate[].value` |
|---------------|----------------------|--------------------------------|
| `true` | Geração ocorre | Valor formatado atual do gerador |
| `false` | Geração ocorre | Valor com strip de máscara se `field` tiver regra; senão intacto |

## Out of scope (MUST NOT change)

- Handlers de send para a página (`searchAndWrite`, `searchAndWhriteAll`, etc.)
- Persistência cross-session do switch
