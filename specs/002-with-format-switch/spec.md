# Feature Specification: Switch With Format (Generate Fake Data)

**Feature Branch**: `002-with-format-switch`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "Acrescentar um botão do tipo switch ao lado do botão existente chamado renew. Este novo botão deverá se chamar with format (para indicar que todos os dados gerados precisam de formatação). Ao gerar QUALQUER dado dentro do bloco Generate fake data deverá observar se o botão with format está selecionado. Caso sim, deve manter a formatação atual; caso não, precisa tirar a formatação antes de apresentar os dados. Exemplos: CPF formatado 222.344.555-55 vs sem formatação 22234455555; data formatada 09/06/2034 vs sem formatação 09062034."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gerar dados sem máscara de formatação (Priority: P1)

Um desenvolvedor ou QA precisa colar identificadores e datas em campos que rejeitam pontuação (máscaras do sistema sob teste, APIs, CSV). Ele abre o bloco **Generate fake data**, desliga o switch **with format** (ao lado de **renew**), marca os tipos desejados (ex.: CPF, data) e gera. Os valores apresentados aparecem sem pontuação de máscara, prontos para uso imediato.

**Why this priority**: É o valor principal da feature — sem a opção de saída sem formatação, o usuário continua removendo pontuação manualmente.

**Independent Test**: Com apenas esta história, o usuário desliga **with format**, gera CPF e/ou data e recebe valores sem separadores (ex.: `22234455555`, `09062034`).

**Acceptance Scenarios**:

1. **Given** o usuário está no bloco Generate fake data, **When** ele observa a área dos controles superiores, **Then** existe um switch rotulado **with format** posicionado ao lado do switch **renew**.
2. **Given** o switch **with format** está desligado e a opção CPF está marcada, **When** o usuário solicita a geração, **Then** o valor de CPF apresentado não contém pontos nem hífen (ex.: `22234455555`).
3. **Given** o switch **with format** está desligado e uma opção de data com máscara está marcada (ex.: Date BR), **When** o usuário solicita a geração, **Then** o valor de data apresentado não contém barras nem outros separadores de máscara (ex.: `09062034` em vez de `09/06/2034`).

---

### User Story 2 - Manter formatação atual quando with format está ligado (Priority: P1)

O usuário quer o comportamento atual do produto (valores com máscara legível) para preencher formulários que esperam pontuação ou para leitura humana. Ele deixa **with format** ligado (estado padrão), gera os mesmos tipos de dados e recebe a formatação atual inalterada.

**Why this priority**: Garante compatibilidade com o fluxo existente e evita regressão para quem depende da máscara.

**Independent Test**: Com **with format** ligado, gerar CPF e data e verificar que a máscara atual permanece (ex.: `222.344.555-55`, `09/06/2034`).

**Acceptance Scenarios**:

1. **Given** o switch **with format** está ligado e CPF está marcado, **When** o usuário gera, **Then** o CPF é apresentado com a máscara atual (pontos e hífen).
2. **Given** o switch **with format** está ligado e uma data com máscara está marcada, **When** o usuário gera, **Then** a data é apresentada com a máscara atual (ex.: separadores `/`).
3. **Given** o usuário abre o bloco Generate fake data pela primeira vez na sessão, **When** ele observa o switch **with format**, **Then** o switch está ligado por padrão.

---

### User Story 3 - Aplicar a preferência a qualquer geração do bloco (Priority: P2)

O usuário gera vários tipos de dados de uma vez (pessoa, identificação, empresa, financeiro, datas, sistema) ou usa **renew** para regenerar automaticamente. Em todos esses casos, a preferência de **with format** deve ser respeitada para cada valor gerado no bloco.

**Why this priority**: Amplia o valor da preferência global sem alterar o restante do fluxo (seleção de checkboxes, Generate Data, renew, copy/send).

**Independent Test**: Desligar **with format**, marcar vários campos com máscara, gerar (ou aguardar renew) e confirmar que todos os valores com máscara saem sem formatação; valores sem máscara permanecem iguais.

**Acceptance Scenarios**:

1. **Given** **with format** está desligado e múltiplos tipos com máscara estão marcados (ex.: CPF, CNPJ, telefone, cartão), **When** o usuário clica em Generate Data, **Then** cada valor apresentado correspondente a esses tipos aparece sem formatação de máscara.
2. **Given** **with format** está desligado e **renew** está ligado, **When** ocorre uma regeneração automática, **Then** os novos valores respeitam a ausência de formatação.
3. **Given** **with format** está desligado e o usuário gera um tipo que já não usa máscara (ex.: nome, e-mail, UUID), **When** o resultado é apresentado, **Then** o valor permanece semanticamente o mesmo (sem alteração artificial de conteúdo).

---

### User Story 4 - Usar o valor apresentado no fluxo imediato (Priority: P3)

Após gerar com ou sem formatação, o usuário copia um valor, copia todos ou envia para a página. O valor utilizado nessas ações deve ser exatamente o valor apresentado (já formatado ou já sem formatação conforme o switch no momento da geração).

**Why this priority**: Alinha a feature ao princípio de uso imediato do resultado; depende da geração correta (P1).

**Independent Test**: Gerar com **with format** desligado e copiar/enviar um CPF; o valor transferido deve ser o sem máscara.

**Acceptance Scenarios**:

1. **Given** resultados gerados com **with format** desligado, **When** o usuário copia um valor individual ou todos, **Then** o conteúdo copiado corresponde ao valor sem formatação apresentado.
2. **Given** resultados gerados com **with format** desligado, **When** o usuário envia o valor para a página (fluxo send existente), **Then** o valor enviado é o sem formatação.

---

### Edge Cases

- Alternar **with format** depois de já existir uma lista de resultados: a mudança afeta apenas a **próxima** geração (Generate Data ou renew); resultados já exibidos não precisam ser reformatados automaticamente.
- Valores que naturalmente contêm caracteres especiais parte do conteúdo (ex.: e-mail com `@` e `.`, website com `.`, CSR/PEM com quebras e hífens estruturais) NÃO devem ter esses caracteres removidos quando **with format** estiver desligado — a remoção aplica-se apenas à **máscara/pontuação de apresentação** tipicamente usada em documentos e datas (pontos, hífens, barras, espaços e parênteses de máscara), não ao conteúdo semântico do dado.
- Tipos sem máscara visual (nome, senha, UUID, lorem, etc.) devem permanecer inalterados com o switch ligado ou desligado.
- CNPJ alfanumérico: com formatação usa a máscara com pontuação; sem formatação remove apenas a pontuação da máscara, preservando letras e dígitos do identificador.
- **renew** e **with format** são controles independentes: ligar/desligar um não altera o estado do outro.
- **clean** continua limpando seleções/resultados conforme o comportamento atual e não redefine o estado de **with format** (salvo se o produto já resetar controles semelhantes — nesse caso, manter consistência com **renew**).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O produto MUST exibir um controle do tipo switch rotulado **with format** no bloco Generate fake data, posicionado ao lado do switch **renew**.
- **FR-002**: O switch **with format** MUST estar ligado por padrão ao abrir o bloco, preservando o comportamento atual de apresentação formatada.
- **FR-003**: Quando **with format** estiver ligado e o usuário gerar dados, o produto MUST apresentar cada valor com a formatação/máscara atual já existente para aquele tipo.
- **FR-004**: Quando **with format** estiver desligado e o usuário gerar dados, o produto MUST remover a formatação de máscara dos valores gerados **antes de apresentá-los**, para todos os tipos do bloco Generate fake data que usam máscara.
- **FR-005**: A preferência de **with format** MUST ser observada em toda geração do bloco, incluindo geração manual (Generate Data) e regeneração automática via **renew**.
- **FR-006**: Exemplos canônicos de saída sem formatação MUST incluir: CPF `22234455555` (a partir de `222.344.555-55`) e data `09062034` (a partir de `09/06/2034`), mantendo a mesma ordem de dígitos/caracteres significativos.
- **FR-007**: Tipos de dado sem máscara de apresentação MUST permanecer inalterados independentemente do estado de **with format**.
- **FR-008**: Valores de e-mail, website e demais conteúdos cujo caractere especial faz parte do dado (não da máscara) MUST NÃO ter esses caracteres removidos quando **with format** estiver desligado.
- **FR-009**: As ações de cópia e envio para a página MUST usar o valor efetivamente apresentado (formatado ou não), coerente com o estado de **with format** no momento da geração.
- **FR-010**: O switch **with format** MUST operar de forma independente do switch **renew** e do controle **clean**.
- **FR-011**: Alterar o estado de **with format** MUST NÃO exigir regeneração imediata dos resultados já exibidos; a preferência aplica-se na próxima geração.

### Key Entities

- **Preferência de formatação (with format)**: Estado booleano global do bloco Generate fake data que indica se os valores gerados devem ser apresentados com máscara (ligado) ou sem máscara (desligado).
- **Valor gerado apresentado**: Resultado final exibido ao usuário para cada tipo selecionado; é o mesmo valor usado em copy/send.
- **Máscara de apresentação**: Pontuação/separadores usados apenas para legibilidade de documentos, telefones, cartões e datas (ex.: `.`, `-`, `/`, espaços e parênteses de máscara), distinta do conteúdo semântico do dado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em 100% das gerações com **with format** desligado, valores de CPF e datas com máscara aparecem sem separadores de formatação, preservando a sequência de caracteres significativos.
- **SC-002**: Em 100% das gerações com **with format** ligado, a saída de CPF e datas com máscara permanece igual ao comportamento atual (com formatação).
- **SC-003**: Um usuário encontra e compreende o controle **with format** ao lado de **renew** sem instruções adicionais e consegue obter o formato desejado na primeira tentativa.
- **SC-004**: Gerar um conjunto misto de campos (com e sem máscara) com **with format** desligado não corrompe valores sem máscara (nome, e-mail, UUID) em nenhuma amostra de teste representativa.
- **SC-005**: Copy e send usam o mesmo valor apresentado em 100% dos casos testados (formatado ou não).

## Assumptions

- O bloco referido como "Generate fake data" é a área de geradores de dados fake do produto (controles **renew**, **clean**, grupos de opções e botão Generate Data).
- O estado padrão **ligado** preserva compatibilidade com usuários e testes que já esperam máscaras.
- "Tirar a formatação" significa remover separadores de máscara de apresentação, não alterar a validade do dado gerado nem reordenar caracteres.
- A preferência de **with format** não precisa persistir entre sessões na primeira entrega (comportamento semelhante ao controle **renew**, que inicia desligado); o padrão ao abrir é **ligado**.
- Escopo limitado ao bloco Generate fake data; outras ferramentas do toolbox ficam fora desta feature.
- Regeneração sob demanda ao alternar o switch (reformatar resultados já listados) fica fora do escopo inicial.
