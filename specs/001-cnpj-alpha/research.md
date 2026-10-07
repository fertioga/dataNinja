# Research: CNPJ Alfanumérico (CNPJ Alpha)

**Feature**: `001-cnpj-alpha`  
**Date**: 2026-09-29

## 1. Norma e composição do identificador

**Decision**: Implementar o CNPJ alfanumérico com 14 posições: caracteres 1–12 em A–Z e 0–9; caracteres 13–14 numéricos (DV); máscara de exibição `XX.XXX.XXX/XXXX-XX`.

**Rationale**: IN RFB nº 2.229/2024 altera a IN 2.119 e acrescenta o Anexo XV: raiz (1–8) e ordem do estabelecimento (9–12) alfanuméricas; DV (13–14) numéricos. Documentação RFB/SERPRO confirma o exemplo `12.ABC.345/01DE-35`.

**Alternatives considered**:
- Só numérico nas 12 primeiras (rejeitado: não diferencia do CNPJ atual e não cobre o novo padrão).
- Incluir letras minúsculas (rejeitado: manual de DV usa ASCII de maiúsculas; A–Z apenas).

**References**:
- [IN RFB 2229/2024](https://normasinternet2.receita.fazenda.gov.br/#/consulta/externa/141102)
- [Anexo XV](http://normas.receita.fazenda.gov.br/sijut2consulta/anexoOutros.action?idArquivoBinario=76203)
- [Manual DV](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj/manual-dv-cnpj.pdf)
- [Página RFB CNPJ Alfanumérico](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico)

## 2. Algoritmo de dígitos verificadores

**Decision**: Calcular DV exatamente como no manual SERPRO:

1. Para cada caractere, valor = `charCodeAt(0) - 48` (dígitos 0–9 → 0–9; letras A–Z → 17–42).
2. Pesos 2–9 da **direita para a esquerda**, reiniciando após 8 posições.
3. Soma dos produtos valor × peso; `resto = soma % 11`.
4. Se `resto` ∈ {0, 1} → DV = 0; senão DV = `11 - resto`.
5. 1º DV sobre os 12 caracteres; 2º DV sobre os 12 + 1º DV (13 caracteres).

**Rationale**: Única regra oficial publicada; o exemplo `12ABC34501DE` → DV `35` é o oracle de validação na implementação.

**Alternatives considered**:
- Reutilizar a lógica do `CNPJ.vue` numérico (rejeitado: pesos/valores ASCII diferentes; letras não existem no fluxo atual).
- Biblioteca externa de CNPJ (rejeitado: dependência nova desnecessária para ~30 linhas de lógica).

## 3. Onde colocar a lógica de geração

**Decision**: Extrair/adicionar `generateCnpjAlpha()` (e helpers privados de DV) em `src/Utils/generate.js`; o componente `CNPJAlpha.vue` apenas orquestra checkbox, tags e emit.

**Rationale**: Convenção do projeto (`stack-e-estrutura`): lógica pura em Utils; facilita testar o oracle `12.ABC.345/01DE-35` sem montar Vue. O `CNPJ.vue` atual mantém lógica inline — **não** será refatorado nesta feature (escopo mínimo / sem regressão).

**Alternatives considered**:
- Toda a lógica só em `CNPJAlpha.vue` (aceito como fallback, rejeitado como preferência: DV alfanumérico é mais complexo e beneficia isolamento).
- Novo arquivo `src/Utils/cnpjAlpha.js` (aceitável, mas `generate.js` já concentra geradores; manter um export evita proliferação para um único algoritmo).

## 4. Posição da UI (“logo abaixo de CNPJ”)

**Decision**: Em `CompanyGroup/Index.vue`, empilhar **CNPJ** e **CNPJ Alpha** na mesma coluna da direita da primeira linha (Company | CNPJ+CNPJ Alpha), de modo que CNPJ Alpha fique visualmente imediatamente abaixo de CNPJ.

**Rationale**: Atende FR-001 sem deslocar Company/Website; leitura “abaixo de CNPJ” é literal; padrão de checkbox independente preservado.

**Alternatives considered**:
- Nova linha full-width só com CNPJ Alpha (funciona, mas quebra alinhamento e ocupa mais espaço vertical).
- Coluna ao lado de Website (não fica “abaixo de CNPJ”).

## 5. Contrato de emit / tags

**Decision**: Emitir o mesmo shape dos demais geradores:

```json
{ "field": "cnpj_alpha", "tags": ["cnpj_alpha", "CNPJ Alpha", "..."], "value": "12.ABC.345/01DE-35" }
```

`field` distinto de `cnpj`; tags incluem variantes para autofill (`cnpj_alpha`, `cnpj_alfanumerico`, etc.) sem sobrescrever as tags do CNPJ numérico.

**Rationale**: FR-009/FR-010 e consistência com `CNPJ.vue` (`field`, `tags`, `value`).

**Alternatives considered**:
- Reusar `field: "cnpj"` (rejeitado: colisão no autofill e na listagem).
- Valor sem máscara (rejeitado: spec exige máscara clássica nesta versão).

## 6. Garantia de pelo menos uma letra

**Decision**: Gerar 12 caracteres do alfabeto `[0-9A-Z]`; se o resultado for só dígitos, forçar pelo menos uma posição aleatória (entre 0–11) para uma letra A–Z e recalcular DV.

**Rationale**: FR-006 / edge case da spec — evita ambiguidade com CNPJ numérico.

**Alternatives considered**:
- Sempre misturar fixando posição 0 como letra (mais simples, menos “aleatório” visualmente; aceitável se preferido na implementação).
- Permitir 100% numérico (rejeitado pela spec).

## 7. Testes

**Decision**: Validação manual + verificação determinística do exemplo oficial no quickstart; sem introduzir framework de testes nesta feature.

**Rationale**: `package.json` não tem runner de testes; adicionar suite completa está fora do escopo da feature.

**Alternatives considered**:
- Adicionar Jest/Vitest só para DV (valor futuro; não bloqueia o plano).

## 8. Rótulo CNPH vs CNPJ Alpha

**Decision**: UI label **CNPJ Alpha** (conforme assumption da spec).

**Rationale**: “CNPH” é typo evidente do acrônimo; alinhado à nomenclatura RFB.

**Alternatives considered**: Label literal “CNPH Alpha” se o product owner confirmar — fora do default deste plano.
