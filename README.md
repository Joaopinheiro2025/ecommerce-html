# SwiftStore - E-commerce de Hardware

**Aluno:** João Lucas Sousa Picanço Pinheiro
**Curso:** Análise e Desenvolvimento de Sistemas

## 1. Visão Geral do Projeto[cite: 1]

**Tema:** O SwiftStore é um sistema completo de e-commerce voltado para a venda de componentes de hardware e periféricos[cite: 1].
**Público-Alvo:** Entusiastas de tecnologia, gamers e profissionais da área de TI que buscam adquirir peças para montagem, manutenção e upgrade de computadores[cite: 1].

> **Nota de Atualização:** Este projeto foi refatorado de sua versão original full-stack (PHP/MySQL) para uma versão puramente **Front-end (Single Page App behavior)**, visando a hospedagem estática e rápida no GitHub Pages para fins de portfólio. A lógica de banco de dados foi migrada para arrays e manipulação de DOM no lado do cliente.

## 2. Mapa de Páginas (Links Rápidos)[cite: 1]

* [Página Inicial (Home)](index.html) - Apresentação da loja, seções de destaque e navegação principal estruturada[cite: 1].
* [Catálogo de Produtos](produtos.html) - Listagem dinâmica renderizada e filtrada via JavaScript diretamente no Front-end.
* [Carrinho de Compras](carrinho.html) - Página de checkout que exibe os itens selecionados (via localStorage), com cálculos atualizados em tempo real[cite: 1].
* [Contato (SAC)](contato.html) - Formulário de atendimento ao cliente com validações nativas do HTML5 e customizadas[cite: 1].

## 3. Tecnologias e Interações Implementadas[cite: 1]

* **HTML5/CSS3:** Estrutura semântica rigorosa (header, nav, main, footer) e design responsivo construído em folha de estilo única[cite: 1].
* **JavaScript (Client-side):**[cite: 1]
    * **Manipulação do DOM:** Filtros dinâmicos na página de catálogo baseados na seleção do usuário[cite: 1].
    * **Persistência:** Uso de `localStorage` para reter o estado do carrinho de compras e os produtos selecionados[cite: 1].
    * **Validações e UX:** Máscara de formatação aplicada em tempo real no campo de telefone do formulário de contato, além de prevenção de envio de dados inválidos[cite: 1].

## 4. Estrutura do Diretório[cite: 1]

```text
/
├── css/                      # Folhas de estilo globais
├── img/                      # Assets visuais da interface e catálogo de produtos
├── js/                       # Motor lógico interativo do Front-end (app.js)
├── carrinho.html             # Resumo de compras
├── contato.html              # Atendimento e captura de leads
├── index.html                # Página inicial
├── produtos.html             # Vitrine de produtos e filtros
├── README.md                 # Documentação do projeto