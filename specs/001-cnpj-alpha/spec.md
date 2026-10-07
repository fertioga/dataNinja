# Feature Specification: CNPJ Alfanumérico (CNPJ Alpha)

**Feature Branch**: `001-cnpj-alpha`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "Acrescentar uma opção para CNPJ alfanumérico no padrão brasileiro (IN RFB nº 2229/2024), chamada CNPJ Alpha, logo abaixo da opção CNPJ."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gerar CNPJ alfanumérico válido (Priority: P1)

Um desenvolvedor, QA ou PO precisa de um identificador de pessoa jurídica no novo formato alfanumérico brasileiro para preencher formulários, validar máscaras ou testar cadastros. Ele abre o grupo Company dos geradores de dados, marca a opção **CNPJ Alpha** (logo abaixo de **CNPJ**) e gera os dados. O produto devolve um valor formatado e utilizável imediatamente, com dígitos verificadores corretos segundo a norma da Receita Federal.

**Why this priority**: É o valor principal da feature — sem geração correta e utilizável, a opção não entrega utilidade.

**Independent Test**: Com apenas esta história implementada, o usuário marca CNPJ Alpha, gera e recebe um CNPJ alfanumérico formatado com DV válidos.

**Acceptance Scenarios**:

1. **Given** o usuário está no grupo Company dos geradores de dados, **When** ele visualiza as opções disponíveis, **Then** a opção **CNPJ Alpha** aparece imediatamente abaixo da opção **CNPJ**.
2. **Given** a opção **CNPJ Alpha** está marcada e as demais opções de empresa não, **When** o usuário solicita a geração, **Then** o produto gera exatamente um valor de CNPJ alfanumérico formatado e pronto para uso.
3. **Given** um valor gerado por **CNPJ Alpha**, **When** o usuário (ou um validador) aplica a regra oficial de dígitos verificadores do CNPJ alfanumérico, **Then** os dois dígitos verificadores conferem.

---

### User Story 2 - Usar em conjunto com CNPJ numérico e outros campos (Priority: P2)

O usuário quer gerar ao mesmo tempo o CNPJ clássico (numérico) e o CNPJ alfanumérico, ou combinar CNPJ Alpha com outros campos de empresa (razão social, website), para cobrir cenários de migração e dual-format em testes.

**Why this priority**: Mantém o padrão existente de checkboxes independentes no grupo Company e aumenta o valor em fluxos de teste reais.

**Independent Test**: Marcar CNPJ e CNPJ Alpha juntos (e opcionalmente outros campos) e verificar que cada opção gera seu próprio valor sem interferência.

**Acceptance Scenarios**:

1. **Given** **CNPJ** e **CNPJ Alpha** estão marcados, **When** o usuário gera os dados, **Then** o produto produz um valor para cada opção, com formatos distintos (numérico vs alfanumérico).
2. **Given** apenas **CNPJ Alpha** está desmarcado e **CNPJ** está marcado, **When** o usuário gera, **Then** nenhum valor de CNPJ alfanumérico é produzido (comportamento inalterado do CNPJ atual).

---

### User Story 3 - Reconhecer e reutilizar o valor gerado (Priority: P3)

O usuário precisa identificar claramente que o valor gerado é um CNPJ alfanumérico (não o numérico) e reutilizá-lo em autofill ou cópia, com tags/rótulos coerentes com o restante do grupo Company.

**Why this priority**: Melhora descoberta e uso imediato, mas depende da geração correta (P1).

**Independent Test**: Após gerar, o campo/rótulo associado ao valor identifica CNPJ Alpha e o valor pode ser aplicado no fluxo usual de uso imediato do produto.

**Acceptance Scenarios**:

1. **Given** um valor gerado por **CNPJ Alpha**, **When** o usuário observa o resultado, **Then** o valor está associado a um identificador distinto do CNPJ numérico (ex.: rótulo/campo `cnpj_alpha` ou equivalente legível).
2. **Given** um valor gerado por **CNPJ Alpha**, **When** o usuário o utiliza no fluxo usual de aplicação/cópia do produto, **Then** o valor completo formatado é o que é aplicado.

---

### Edge Cases

- Geração deve sempre produzir pelo menos um caractere alfabético nas 12 primeiras posições, para não confundir com CNPJ exclusivamente numérico.
- Letras geradas devem ser maiúsculas (A–Z), conforme o padrão oficial de cálculo baseado em ASCII de letras maiúsculas.
- Os dois dígitos verificadores (posições 13 e 14) devem ser sempre numéricos.
- A máscara visual deve seguir o padrão `SS.SSS.SSS/SSSS-NN` (mesma pontuação do CNPJ clássico).
- A opção **CNPJ** existente não deve mudar de comportamento, rótulo ou posição relativa aos demais campos (apenas ceder espaço visual para a nova opção abaixo dela).
- Múltiplas gerações sucessivas devem produzir valores distintos na maior parte dos casos (não travar em um único exemplo fixo).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O produto MUST exibir uma nova opção selecionável rotulada **CNPJ Alpha** no grupo de geradores de dados de empresa (Company), posicionada imediatamente abaixo da opção **CNPJ**.
- **FR-002**: Quando **CNPJ Alpha** estiver selecionada e o usuário solicitar geração, o produto MUST produzir um identificador no formato alfanumérico brasileiro de 14 posições, conforme a Instrução Normativa RFB nº 2.229/2024 (Anexo XV / composição raiz + ordem + DV).
- **FR-003**: As posições 1 a 8 (raiz) e 9 a 12 (ordem do estabelecimento) MUST poder conter letras (A–Z) e dígitos (0–9); as posições 13 e 14 MUST ser dígitos verificadores numéricos.
- **FR-004**: Os dígitos verificadores MUST ser calculados pela regra oficial do CNPJ alfanumérico (valores derivados de ASCII − 48, pesos 2–9 da direita para a esquerda, módulo 11), de forma que o valor gerado seja validável por essa regra.
- **FR-005**: O valor apresentado ao usuário MUST usar a máscara com pontuação `XX.XXX.XXX/XXXX-XX`, onde os doze primeiros caracteres podem ser alfanuméricos e os dois últimos numéricos.
- **FR-006**: Cada geração com **CNPJ Alpha** selecionada MUST incluir pelo menos uma letra nas doze primeiras posições (garantindo distinção prática do CNPJ numérico).
- **FR-007**: A opção **CNPJ** (numérico) existente MUST permanecer disponível e inalterada em comportamento.
- **FR-008**: **CNPJ** e **CNPJ Alpha** MUST poder ser selecionados de forma independente (um, outro ou ambos).
- **FR-009**: O valor gerado por **CNPJ Alpha** MUST ser emitido no mesmo fluxo de uso imediato dos demais geradores do grupo Company (mesmo padrão de entrega de resultado ao usuário).
- **FR-010**: O produto MUST associar ao valor gerado um identificador de campo/tags distinto do CNPJ numérico, permitindo reconhecimento em autofill e listagens.

### Key Entities

- **CNPJ Alpha (valor gerado)**: Identificador alfanumérico de 14 posições (12 alfanuméricas + 2 DV numéricos), com máscara de exibição, rótulo de campo e tags de reconhecimento para autofill.
- **Opção CNPJ Alpha**: Controle selecionável no grupo Company, posicionado abaixo de CNPJ, que habilita a geração do valor acima.
- **Norma de referência**: IN RFB nº 2.229/2024 e documentação técnica da Receita Federal para composição e cálculo de DV do CNPJ alfanumérico.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em 100% das gerações com **CNPJ Alpha** marcado, o valor produzido tem 14 caracteres significativos (ignorando pontuação da máscara), máscara correta e DV válidos pela regra oficial.
- **SC-002**: Em 100% das gerações, o valor contém ao menos uma letra maiúscula nas 12 primeiras posições e DV apenas numéricos.
- **SC-003**: Um usuário familiarizado com o grupo Company encontra e ativa **CNPJ Alpha** em menos de 10 segundos a partir da abertura do grupo (posição imediatamente abaixo de CNPJ).
- **SC-004**: Selecionar apenas **CNPJ Alpha** e gerar completa o fluxo “marcar → gerar → obter valor utilizável” em no máximo 2 ações do usuário após estar no grupo Company (mesmo padrão das demais opções).
- **SC-005**: Gerar com **CNPJ** e **CNPJ Alpha** marcados produz dois resultados distintos e corretos; marcar só **CNPJ** não produz CNPJ alfanumérico (regressão zero no comportamento atual).

## Assumptions

- O rótulo de UI solicitado como “CNPH Alpha” refere-se a **CNPJ Alpha** (correção ortográfica do acrônimo CNPJ); se o rótulo literal “CNPH Alpha” for desejado, deve ser confirmado antes da implementação.
- A feature limita-se a **gerar** valores alfanuméricos válidos para teste; não inclui validador standalone de CNPJ alfanumérico digitado pelo usuário, nem migração de dados reais da Receita Federal.
- O alfabeto permitido nas posições alfanuméricas é A–Z (maiúsculas) e 0–9, alinhado ao manual de DV da Receita Federal.
- “Logo abaixo da opção CNPJ” significa ordem visual imediata após CNPJ no grupo Company, sem alterar o rótulo ou a lógica do CNPJ numérico.
- A pontuação de exibição segue o padrão clássico brasileiro (`XX.XXX.XXX/XXXX-XX`); não há requisito de opção “sem máscara” nesta versão.
- A implementação deve seguir os princípios do produto: geração rápida, uso imediato, consistência com outros checkboxes do grupo Company e destaque Brasil-first para dado regulatório brasileiro.
- Referências normativas usadas nesta spec: [IN RFB nº 2229/2024](https://normasinternet2.receita.fazenda.gov.br/#/consulta/externa/141102), [Anexo XV / composição](http://normas.receita.fazenda.gov.br/sijut2consulta/anexoOutros.action?idArquivoBinario=76203), [manual de DV](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj/manual-dv-cnpj.pdf).
