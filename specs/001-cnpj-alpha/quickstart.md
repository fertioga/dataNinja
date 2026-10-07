# Quickstart: Validar CNPJ Alpha

**Feature**: `001-cnpj-alpha`  
**Date**: 2026-09-29

Guia de validação ponta a ponta após a implementação. Detalhes de modelo e contrato: [data-model.md](./data-model.md), [contracts/generator-payload.md](./contracts/generator-payload.md).

## Prerequisites

- Repo em `/Users/fernando/Documents/arquivos/dataNinja`
- Dependências instaladas (`npm install` se necessário)
- Extensão carregada a partir de `dist/` (ou fluxo habitual de dev com `npm run watch`)

## Setup

```bash
cd /Users/fernando/Documents/arquivos/dataNinja
npm run watch
# ou, para build único:
npm run production
```

Recarregar a extensão no Chrome (`chrome://extensions` → Reload) após o build.

## Validation scenarios

### V1 — Opção visível abaixo de CNPJ

1. Abrir Data Ninja → Data Generators → seção **Company**.
2. Confirmar label **CNPJ Alpha** imediatamente abaixo de **CNPJ**.
3. **Esperado**: ordem visual Company | CNPJ → CNPJ Alpha; Website permanece abaixo.

### V2 — Geração isolada com DV válido

1. Marcar só **CNPJ Alpha**; desmarcar demais opções de Company.
2. Disparar geração.
3. **Esperado**:
   - Um resultado com campo/identificador `cnpj_alpha` (ou rótulo equivalente).
   - `value` no formato `XX.XXX.XXX/XXXX-XX`.
   - Removendo pontuação: 14 chars; posições 13–14 numéricas; ≥1 letra A–Z nas 12 primeiras.
   - DV conferem pela regra oficial (ver oracle abaixo).

### V3 — Oracle determinístico (dev)

No console do build ou em um scratch temporário, validar:

| Base (12) | Formatted esperado |
|-----------|--------------------|
| `12ABC34501DE` | `12.ABC.345/01DE-35` |

Se a função util exposta/testável não retornar DV `35` para essa base, a implementação está incorreta.

### V4 — Independência CNPJ × CNPJ Alpha

1. Marcar **CNPJ** e **CNPJ Alpha**.
2. Gerar.
3. **Esperado**: dois valores; um só numérico (padrão atual); outro alfanumérico com letra(s).
4. Desmarcar **CNPJ Alpha**, manter **CNPJ**, gerar.
5. **Esperado**: nenhum valor `cnpj_alpha`; CNPJ numérico inalterado.

### V5 — Uso imediato

1. Gerar com **CNPJ Alpha**.
2. Copiar/aplicar o valor pelo fluxo usual do produto.
3. **Esperado**: máscara completa (com pontuação) é o que o usuário obtém.

## Pass criteria

- V1–V5 OK
- Oracle V3 OK
- Sem regressão no CNPJ numérico

## Next

Se a validação passar, a feature está pronta para `/speckit-tasks` (se ainda não gerado) ou merge após review.
