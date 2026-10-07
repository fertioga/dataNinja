# Quickstart Validation: Switch With Format

**Feature**: `002-with-format-switch`  
**Date**: 2026-10-06

## Prerequisites

- Extensão carregada em modo desenvolvimento (`npm run watch` ou `npm run production`)
- Popup do Data Ninja aberto na aba Generate fake data

## Setup

1. Confirmar switch **with format** ao lado de **renew**, ligado por padrão.
2. Não alterar código de send; validar só apresentação/cópia do valor.

## Smoke — infra

| Step | Action | Expected |
|------|--------|----------|
| 1 | Observar controles superiores | **with format** ao lado de **renew** |
| 2 | Deixar **with format** ON, marcar CPF, Generate Data | CPF com pontuação (ex.: `222.344.555-55`) |
| 3 | Desligar **with format**, Generate Data de novo | CPF sem pontuação (ex.: `22234455555`) |
| 4 | Copiar o CPF | Clipboard = valor apresentado (sem máscara) |
| 5 | Ligar **renew** com **with format** off | Regenerações também sem máscara |

## Validação campo a campo (um por vez)

Para cada linha: marcar **somente** aquele campo → Generate Data com switch **OFF** → conferir “Sem format” → Generate Data com switch **ON** → conferir regressão formatada.

| # | Campo | OFF esperado | ON esperado |
|---|-------|--------------|-------------|
| 1 | CPF | só dígitos | `XXX.XXX.XXX-XX` |
| 2 | SSN | só dígitos | `XXX-XX-XXXX` |
| 3 | RG | só dígitos | `XX.XXX.XXX-X` |
| 4 | CNPJ | só dígitos | `XX.XXX.XXX/XXXX-XX` |
| 5 | CNPJ Alfa | alfanumérico sem `.` `/` `-` | máscara com pontuação |
| 6 | Phone BR | só dígitos | `(0XX) XXXX-XXXX` |
| 7 | Phone US | só dígitos | `+1 (XXX) XXX-XXXX` |
| 8 | Cell Phone BR | só dígitos | `(0XX) 9XXXX-XXXX` |
| 9 | Cell Phone US | só dígitos | `+1 (XXX) XXX-XXXX` |
| 10 | Date BR | `DDMMYYYY` | `DD/MM/YYYY` |
| 11 | Date US | `MMDDYYYY` | `MM/DD/YYYY` |
| 12 | Date DB | `YYYYMMDD` | `YYYY-MM-DD` |
| 13 | CC Validate | `MMYY` | `MM/YY` |
| 14 | UUID v1 | 32 hex sem `-` | UUID com hífens |
| 15 | UUID v4 | 32 hex sem `-` | UUID com hífens |
| 16 | UUID v7 | 32 hex sem `-` | UUID com hífens |

## Verificação no-op (switch OFF não deve alterar)

Gerar com switch OFF e confirmar que o valor continua “natural”:

- Passport BR / Passport US / CNH / Credit Card / CVV / Timestamp / ULID  
- Name / Email / Company / Website / Password / Lorem / CSR  

## Exit criteria

- Infra A–C ok  
- Campos 1–16 ok um a um  
- No-ops ok  
- Send não foi modificado (diff limpo nesses métodos)
