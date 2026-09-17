# Finanças em Dia

**Assunto:** Uma plataforma de controle financeiro pessoal para registrar receitas e despesas, acompanhar gastos no cartão e organizar o orçamento mensal.

**Equipe:** Gustavo Rocha, Gabriel Lima Huebra, Ramon Augusto de Souza Alves Maciel, Jairo de Oliveira Santos Júnior e Isaque Barroso Neves.
**Disciplina:** ARA0062 — Desenvolvimento Web em HTML5, CSS, JavaScript e PHP
**Centro Universitário Newton Paiva · 2026/2**

---

## Sobre o projeto

O Finanças em Dia é uma aplicação voltada a estudantes, famílias e demais pessoas que desejam enxergar com clareza para onde vai o próprio dinheiro. A página organiza entradas e gastos em tabelas simples, reduzindo a dificuldade de acompanhar movimentações do cotidiano.

Até o fim do semestre, o site permitirá cadastrar, editar e excluir receitas e despesas, classificar movimentações, consultar totais e emitir relatórios por período. Também deverá oferecer formulários acessíveis, visualização adaptada a diferentes telas e integração com o back-end para persistir os dados.

## Identidade visual

### Paleta

| Papel | Cor | Justificativa |
|---|---|---|
| Principal | `#14532d` | O verde escuro remete a equilíbrio e saúde financeira e identifica títulos, cabeçalho e ações principais. |
| Apoio | `#9a3412` | O tom terroso diferencia ações secundárias e chama atenção sem sugerir uma situação positiva. |
| Fundo | `#f1f5f2` | O verde quase neutro reduz o brilho da tela e mantém a associação visual com organização financeira. |
| Superfície | `#ffffff` | O branco separa tabelas e formulários do fundo e facilita a leitura de muitos valores. |
| Texto | `#17201a` | O tom quase preto mantém ótima legibilidade e é mais harmonioso com a paleta que o preto puro. |
| Realce | `#b45309` | O âmbar torna o foco do teclado fácil de localizar e comunica atenção. |

### Tipografia

**Fonte:** "Nunito Sans", com plano B `Arial, sans-serif`
**Pesos:** 400 e 700
**Por que esta:** As formas abertas favorecem a leitura de números e rótulos, enquanto o aspecto amigável evita que o controle financeiro pareça intimidador.
**Escala:** `h1` 2.5rem · `h2` 1.75rem · `h3` 1.25rem · corpo 1rem

### Segundo tema

**Arquivo:** `frontend/css/tema-noite.css`
**O que é:** Modo noturno, indicado para consultar e registrar movimentações em ambientes com pouca luz. Nele, o fundo escuro reduz o brilho, as superfícies ficam ligeiramente mais claras e o verde claro preserva a identidade financeira do projeto.

Para ligá-lo, retire o comentário da linha correspondente no `frontend/index.html`. O link já está depois do `estilo.css`.

### Contraste da paleta principal

- `--texto` sobre `--superficie`: 16,69:1
- `--principal` sobre `--superficie`: 9,11:1
- `--texto-fraco` sobre `--fundo`: 6,87:1
- `--sobre-principal` sobre `--principal`: 9,11:1

### Contraste do tema noturno

- `--texto` sobre `--superficie`: 14,05:1
- `--principal` sobre `--superficie`: 10,45:1
- `--texto-fraco` sobre `--fundo`: 12,04:1
- `--sobre-principal` sobre `--principal`: 10,62:1

---

## Como abrir

1. Abra a pasta inteira no VS Code.
2. Abra `frontend/index.html` com a extensão Live Server.

## Estrutura

```text
.
├─ README.md
├─ frontend/
│  ├─ index.html
│  └─ css/
│     ├─ estilo.css
│     └─ tema-noite.css
└─ backend/
```

---

## Quem fez o quê

| Integrante | Parte da folha de estilo |
|---|---|
| Gustavo Rocha | Estrutura inicial, cabeçalho, menu e botões. |
| Gabriel Lima Huebra | Revisão da página, do conteúdo e das listas. |
| Ramon Augusto de Souza Alves Maciel | Revisão da tipografia, escala e largura da coluna. |
| Jairo de Oliveira Santos Júnior | Revisão das tabelas, cabeçalhos e linhas alternadas. |
| Isaque Barroso Neves | Paleta, tema noturno, formulários, rodapé, foco e adequação final à rubrica. |
