# Data Model: CNPJ Alfanumérico (CNPJ Alpha)

**Feature**: `001-cnpj-alpha`  
**Date**: 2026-09-29

Não há persistência. O modelo descreve o valor gerado em memória e o controle de UI associado.

## Entities

### CnpjAlphaValue

Representa um identificador CNPJ alfanumérico gerado para uso imediato.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `raw` | string (14) | 12 alfanuméricos + 2 DV, sem pontuação | `[0-9A-Z]{12}[0-9]{2}`; ≥1 letra em `raw[0..11]` |
| `formatted` | string | Valor com máscara brasileira | Padrão `XX.XXX.XXX/XXXX-XX` derivado de `raw` |
| `root` | string (8) | Posições 1–8 | `[0-9A-Z]{8}` |
| `order` | string (4) | Posições 9–12 (estabelecimento) | `[0-9A-Z]{4}` |
| `dv1` | string (1) | 1º dígito verificador | `[0-9]` |
| `dv2` | string (1) | 2º dígito verificador | `[0-9]` |

**Validation rules**:
- `dv1`/`dv2` MUST bater com o algoritmo oficial (ASCII − 48, pesos 2–9 RTL, mod 11).
- `formatted` MUST reconstruir-se como `` `${root[0:2]}.${root[2:5]}.${root[5:8]}/${order}-${dv1}${dv2}` ``.
- Oracle de regressão: entrada `12ABC34501DE` → DV `35` → `formatted` = `12.ABC.345/01DE-35`.

**Relationships**: Emitido como payload de gerador (ver `GeneratorPayload` abaixo); não persiste em store.

### CnpjAlphaOption (UI)

Controle selecionável no grupo Company.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | string | Id do checkbox | Ex.: `check_cnpj_alpha` |
| `label` | string | Texto visível | `CNPJ Alpha` |
| `name` / `field` | string | Identificador do campo gerado | `cnpj_alpha` |
| `tags` | string[] | Sinônimos para autofill | Distintos das tags de `cnpj` |
| `is_checked` | boolean | Seleção do usuário | Default `false` |

**State transitions**:
- `unchecked` → `checked` (usuário marca) → na geração, emite `GeneratorPayload`
- `checked` → `unchecked` → geração não emite CNPJ Alpha

### GeneratorPayload

Contrato de saída compartilhado com outros geradores do Data Ninja.

| Field | Type | Description |
|-------|------|-------------|
| `field` | string | `cnpj_alpha` |
| `tags` | string[] | Lista de reconhecimento |
| `value` | string | `CnpjAlphaValue.formatted` |

## Character domain

| Symbol class | Allowed | Notes |
|--------------|---------|-------|
| Digit | `0`–`9` | Valor DV = código ASCII − 48 |
| Letter | `A`–`Z` | Maiúsculas apenas; valor DV = ASCII − 48 (17–42) |

## Out of scope

- Persistência / histórico dedicado
- Entidade de validação de input digitado pelo usuário
- Alteração do modelo do CNPJ numérico existente
