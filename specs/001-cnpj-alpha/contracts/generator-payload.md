# Contract: CNPJ Alpha Generator Payload

**Feature**: `001-cnpj-alpha`  
**Audience**: UI do grupo Company / pipeline `event_data` dos Data Generators  
**Date**: 2026-09-29

## Overview

Quando a opção **CNPJ Alpha** está marcada e o usuário dispara a geração, o componente MUST emitir um único objeto no mesmo canal `@event_data` usado por `CNPJ.vue` e demais geradores.

## Payload schema

```json
{
  "field": "cnpj_alpha",
  "tags": [
    "cnpj_alpha",
    "CNPJ Alpha",
    "cnpj_alfanumerico",
    "cnpj_alfa"
  ],
  "value": "12.ABC.345/01DE-35"
}
```

### Fields

| Property | Required | Type | Rules |
|----------|----------|------|-------|
| `field` | yes | string | Exactamente `cnpj_alpha` (distinto de `cnpj`) |
| `tags` | yes | string[] | Não vazio; MUST NOT colidir como único identificador com `field: "cnpj"` |
| `value` | yes | string | Máscara `^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}/[0-9A-Z]{4}-[0-9]{2}$`; DV válidos; ≥1 letra A–Z nas 12 primeiras posições (sem pontuação) |

## UI contract

| Element | Requirement |
|---------|-------------|
| Label | `CNPJ Alpha` |
| Position | Imediatamente abaixo da opção `CNPJ` no grupo Company |
| Interaction | Checkbox independente (pode coexistir com `CNPJ`) |
| Unchecked | Nenhum payload `cnpj_alpha` emitido na geração |

## Compatibility

- Payload do CNPJ numérico (`field: "cnpj"`) permanece inalterado.
- Consumidores existentes de `event_data` MUST continuar a funcionar: simplesmente recebem um item adicional quando CNPJ Alpha está marcado.

## Golden example (oracle)

| Input (12 chars) | Expected `value` |
|------------------|------------------|
| `12ABC34501DE` | `12.ABC.345/01DE-35` |

Qualquer implementação de DV MUST reproduzir este exemplo.
