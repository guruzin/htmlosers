# Finanças em Dia

Plataforma de controle financeiro pessoal: o usuário cadastra gastos e entradas, e o site lista tudo o que está no banco de dados, com os totais e o saldo atual.

**Equipe:** Gustavo Rocha, Ramon Augusto de Souza Alves Maciel, Jairo de Oliveira Santos Júnior e Isaque Barroso Neves.
**Disciplina:** ARA0062 — Desenvolvimento Web em HTML5, CSS, JavaScript e PHP
**Centro Universitário Newton Paiva · 2026/2**

---

## Como rodar no XAMPP

1. Copie a pasta inteira do repositório para dentro de `C:\xampp\htdocs\` (exemplo: `C:\xampp\htdocs\ara0062-htmlosers`).
2. No painel do XAMPP, ligue o **Apache** e o **MySQL**.
3. Abra `http://localhost/phpmyadmin`, clique na aba **Importar** e importe o arquivo `backend/sql/banco.sql`. Ele cria o banco `planilha_gastos` com as tabelas `gastos` e `ganhos`.
4. Abra no navegador: `http://localhost/ara0062-htmlosers/frontend/index.html` (troque `ara0062-htmlosers` pelo nome da pasta que você usou).

A conexão usa o usuário `root` sem senha, que é o padrão do XAMPP. Se o seu MySQL tiver senha, altere em `backend/config/conexao.php`.

## Como o projeto funciona (de ponta a ponta)

1. **Formulário** — o usuário clica em "+ Novo gasto" ou "+ Nova entrada" e preenche o formulário (`frontend/index.html`).
2. **JavaScript confere** — `frontend/js/script.js` valida os campos antes de enviar. Os erros aparecem em vermelho logo abaixo de cada campo, e o envio fica bloqueado enquanto houver erro. Regras:
   - todos os campos são obrigatórios;
   - descrição/item com no mínimo 3 e no máximo 100 caracteres;
   - valor maior que zero e até R$ 1.000.000,00;
   - data real, a partir de 2000 e que não esteja no futuro;
   - método de pagamento precisa ser Dinheiro, Débito ou Crédito.
3. **PHP grava** — o formulário é enviado para `backend/salva_gastos.php` ou `backend/ganhos.php`, que gravam com `INSERT` usando PDO e `prepare` com `?`.
4. **Tela lista** — `backend/listar_gastos.php` e `backend/listar_ganhos.php` fazem `SELECT` no banco, e o JavaScript monta as linhas das tabelas. Nada está escrito à mão no HTML: o que for incluído no banco aparece na tela.

Também é possível editar (`UPDATE`) e apagar (`DELETE`, com janela de confirmação) cada registro.

## Estrutura

```text
.
├─ README.md
├─ frontend/
│  ├─ index.html
│  ├─ css/
│  │  ├─ estilo.css
│  │  └─ tema-noite.css
│  ├─ js/
│  │  └─ script.js
│  └─ img/
└─ backend/
   ├─ config/
   │  └─ conexao.php        (conexão PDO)
   ├─ sql/
   │  └─ banco.sql          (cria o banco e as tabelas)
   ├─ salva_gastos.php      (INSERT de gasto)
   ├─ ganhos.php            (INSERT de entrada)
   ├─ listar_gastos.php     (SELECT de gastos)
   ├─ listar_ganhos.php     (SELECT de entradas)
   ├─ editar_gastos.php     (UPDATE de gasto)
   ├─ editar_ganhos.php     (UPDATE de entrada)
   ├─ apagar_gastos.php     (DELETE de gasto)
   └─ apagar_ganhos.php     (DELETE de entrada)
```

---

## Quem fez o quê

### Gustavo Rocha
**GitHub:** `@guruzin`

- Desenvolvimento da estrutura da página `frontend/index.html`, incluindo cabeçalho, menu, cartões de resumo e seções das tabelas.
- Desenvolvimento do backend em PHP, incluindo conexão com o banco de dados via PDO, criação automática do banco e das tabelas e integração das operações de cadastro e listagem de gastos e ganhos.
- Implementação e ajustes dos arquivos PHP responsáveis por receber, validar, inserir e retornar dados do banco de dados em JSON.
- Implementação do modo escuro por meio da função `darkMode()` no `script.js`, alternando o `tema-noite.css` e o logotipo.
- CSS do cabeçalho, menu e botões (`estilo.css`, seção 4).

### Ramon Augusto de Souza Alves Maciel
**GitHub:** `@Ramon1921`

- Tela que lista os dados do banco: `backend/listar_gastos.php` e `backend/listar_ganhos.php` (`SELECT` com PDO, resposta em JSON).
- No `script.js`: `carregarGastos()` e `carregarEntradas()`, que buscam os dados e montam as linhas das tabelas, e `atualizarSaldo()`, que calcula entradas, gastos e saldo.
- Tipografia, escala e largura da coluna (`estilo.css`, seção 2).
- Criação da logo do projeto. 

### Jairo de Oliveira Santos Júnior
**GitHub:** `@Jairo88-ux`

- Banco de dados: `backend/sql/banco.sql`, que cria o banco `planilha_gastos` e as tabelas `gastos` e `ganhos`.
- Conexão com PDO em `backend/config/conexao.php`.
- Gravação no banco: `backend/salva_gastos.php` e `backend/ganhos.php` (`INSERT` com `prepare` e `?`, conferindo os dados de novo no servidor).
- CSS das tabelas, cabeçalhos e linhas alternadas (`estilo.css`, seção 5).

### Isaque Barroso Neves
**GitHub:** `@IsaqueNeves`

- Validação dos formulários em JavaScript (`script.js`, parte "VALIDAÇÃO"): `validarTexto()`, `validarData()`, `validarValor()`, mensagens de erro abaixo de cada campo e bloqueio do envio.
- Editar e apagar registros: `editar_gastos.php`, `editar_ganhos.php`, `apagar_gastos.php`, `apagar_ganhos.php` e a janela de confirmação de exclusão.
- Paleta, tema noturno, formulários e rodapé (`estilo.css`, seções 1 e 6, e `tema-noite.css`).

---

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
| Erro | `#b91c1c` | O vermelho marca os campos com erro e as mensagens de validação (6,47:1 sobre o branco). |

### Tipografia

**Fonte:** "Nunito Sans", com plano B `Arial, sans-serif` · **Pesos:** 400 e 700 · **Escala:** `h1` 2.5rem · `h2` 1.75rem · `h3` 1.25rem · corpo 1rem

### Segundo tema

`frontend/css/tema-noite.css` — modo noturno, ligado e desligado pelo botão de lua/sol no menu.
