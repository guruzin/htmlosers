
// ==========================================
// MODO ESCURO
// ==========================================

const botaoTema = document.querySelector("#botao-tema");
const temaNoite = document.querySelector("#tema-noite");
const logoImg = document.querySelector("#logo-img");

function darkMode() {
    temaNoite.disabled = !temaNoite.disabled;

    if (temaNoite.disabled) {
        botaoTema.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';

        if (logoImg) {
            logoImg.src = "img/logo_cabecalho.png";
        }
    } else {
        botaoTema.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';

        if (logoImg) {
            logoImg.src = "img/logo_cabecalho_modo_escuro.png";
        }
    }
}

botaoTema.addEventListener("click", darkMode);


// ==========================================
// ELEMENTOS DOS GASTOS
// ==========================================

const botaoNovoGasto = document.querySelector("#botao-novo-gasto");
const formularioGasto = document.querySelector("#form-gasto");
const cancelarGasto = document.querySelector("#cancelar-gasto");
const mensagemGasto = document.querySelector("#mensagem-gasto");
const listaGastos = document.querySelector("#lista-gastos");


// Abrir formulário de gastos
botaoNovoGasto.addEventListener("click", () => {
    formularioGasto.hidden = false;
});

// Fechar formulário de gastos
cancelarGasto.addEventListener("click", () => {
    formularioGasto.hidden = true;
    formularioGasto.reset();
    mensagemGasto.textContent = "";

    registroEmEdicao = null;
    formularioGasto.querySelector('button[type="submit"]').textContent = "Salvar gasto";
});


// ==========================================
// CADASTRAR GASTO
// ==========================================

formularioGasto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formularioGasto);

    const editando = registroEmEdicao?.tipo === "gasto";

    const arquivo = editando
        ? "editar_gastos.php"
        : "salva_gastos.php";

    if (editando) {
        dados.append("id", registroEmEdicao.id);
    }

    try {
        const resposta = await fetch(`/htmlosers/backend/${arquivo}`, {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
            throw new Error(resultado.mensagem || "Erro ao salvar gasto.");
        }

        mensagemGasto.textContent = resultado.mensagem;

        formularioGasto.reset();
        formularioGasto.hidden = true;

        registroEmEdicao = null;
        formularioGasto.querySelector('button[type="submit"]').textContent = "Salvar gasto";

        await carregarGastos();
        await carregarEntradas();

    } catch (erro) {
        mensagemGasto.textContent = erro.message;
        console.error(erro);
    }
});


// ==========================================
// LISTAR GASTOS
// ==========================================

async function carregarGastos() {

    try {

        const resposta = await fetch("/htmlosers/backend/listar_gastos.php");
        const gastos = await resposta.json();

        if (!resposta.ok || !Array.isArray(gastos)) {
            throw new Error("Erro ao buscar gastos.");
        }

        listaGastos.innerHTML = "";

        // Calcular total de gastos
        const total = gastos.reduce((soma, gasto) => {
            return soma + Number(gasto.valor);
        }, 0);

        document.getElementById("total-gastos").textContent =
            total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        // Criar linhas da tabela
        gastos.forEach(gasto => {

            const linha = document.createElement("tr");

            const dataFormatada = gasto.data_compra
                .split("-")
                .reverse()
                .join("/");

            const valorFormatado = Number(gasto.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            [
                dataFormatada,
                gasto.descricao,
                valorFormatado,
                gasto.metodo_pagamento
            ].forEach(texto => {

                const coluna = document.createElement("td");
                coluna.textContent = texto;
                linha.appendChild(coluna);

            });

            // Botões de ações
            linha.appendChild(criarBotoesAcoes(gasto.id, "gasto", gasto));

            listaGastos.appendChild(linha);

        });

        atualizarSaldo();

    } catch (erro) {

        console.error("Erro ao carregar gastos:", erro);

    }

}


// ==========================================
// ELEMENTOS DAS ENTRADAS
// ==========================================

const formularioEntrada = document.getElementById("form-entrada");
const botaoNovaEntrada = document.getElementById("botao-novo-entrada");
const cancelarEntrada = document.getElementById("cancelar-entrada");
const listaReceitas = document.getElementById("lista-receitas");
const mensagemEntrada = document.getElementById("mensagem-entrada");


// Abrir formulário de entradas
botaoNovaEntrada.addEventListener("click", () => {
    formularioEntrada.hidden = false;
});

// Fechar formulário de entradas
cancelarEntrada.addEventListener("click", () => {
    formularioEntrada.hidden = true;
    formularioEntrada.reset();
    mensagemEntrada.textContent = "";

    registroEmEdicao = null;
    formularioEntrada.querySelector('button[type="submit"]').textContent = "Salvar entrada";
});


// ==========================================
// CADASTRAR ENTRADA
// ==========================================

formularioEntrada.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formularioEntrada);

    const editando = registroEmEdicao?.tipo === "entrada";

    const arquivo = editando
        ? "editar_ganhos.php"
        : "ganhos.php";

    if (editando) {
        dados.append("id", registroEmEdicao.id);
    }

    try {
        const resposta = await fetch(`/htmlosers/backend/${arquivo}`, {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
            throw new Error(resultado.mensagem || "Erro ao salvar entrada.");
        }

        mensagemEntrada.textContent = resultado.mensagem;

        formularioEntrada.reset();
        formularioEntrada.hidden = true;

        registroEmEdicao = null;
        formularioEntrada.querySelector('button[type="submit"]').textContent = "Salvar entrada";

        await carregarEntradas();
        await carregarGastos();

    } catch (erro) {
        mensagemEntrada.textContent = erro.message;
        console.error(erro);
    }
});


// ==========================================
// LISTAR ENTRADAS
// ==========================================

async function carregarEntradas() {

    try {

        const resposta = await fetch("/htmlosers/backend/listar_ganhos.php");
        const entradas = await resposta.json();

        if (!resposta.ok || !Array.isArray(entradas)) {
            throw new Error("Erro ao buscar entradas.");
        }

        listaReceitas.innerHTML = "";

        // Calcular total de entradas
        const total = entradas.reduce((soma, entrada) => {
            return soma + Number(entrada.valor);
        }, 0);

        document.getElementById("total-receitas").textContent =
            total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        // Criar linhas da tabela
        entradas.forEach(entrada => {

            const linha = document.createElement("tr");

            const dataFormatada = entrada.data
                .split("-")
                .reverse()
                .join("/");

            const valorFormatado = Number(entrada.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            [
                dataFormatada,
                entrada.item,
                valorFormatado
            ].forEach(texto => {

                const coluna = document.createElement("td");
                coluna.textContent = texto;
                linha.appendChild(coluna);

            });

            // Botões de ações
            linha.appendChild(criarBotoesAcoes(entrada.id, "entrada", entrada));

            listaReceitas.appendChild(linha);

        });

        atualizarSaldo();

    } catch (erro) {

        console.error("Erro ao carregar entradas:", erro);

    }

}


// ==========================================
// ATUALIZAR SALDO
// ==========================================

function atualizarSaldo() {

    const elementoEntradas = document.getElementById("total-receitas");
    const elementoGastos = document.getElementById("total-gastos");
    const elementoSaldo = document.getElementById("saldo-total");

    const entradas = Number(
        elementoEntradas.textContent
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );

    const gastos = Number(
        elementoGastos.textContent
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );

    const saldo = entradas - gastos;

    elementoSaldo.textContent = saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ==========================================
// MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
// ==========================================

const modalConfirmacao = document.getElementById("modal-confirmacao");
const cancelarExclusao = document.getElementById("cancelar-exclusao");
const confirmarExclusao = document.getElementById("confirmar-exclusao");

let registroParaExcluir = null;


// Abrir modal
function abrirModal(id, tipo) {

    registroParaExcluir = {
        id: id,
        tipo: tipo
    };

    modalConfirmacao.hidden = false;
}


// Cancelar exclusão
cancelarExclusao.addEventListener("click", () => {

    modalConfirmacao.hidden = true;
    registroParaExcluir = null;

});


// Confirmar exclusão
confirmarExclusao.addEventListener("click", async () => {

    if (!registroParaExcluir) return;

    const { id, tipo } = registroParaExcluir;

    const formulario = new FormData();
    formulario.append("id", id);

    const arquivo = tipo === "gasto"
        ? "apagar_gastos.php"
        : "apagar_ganhos.php";

    try {

        const resposta = await fetch(
            `/htmlosers/backend/${arquivo}`,
            {
                method: "POST",
                body: formulario
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
            throw new Error(resultado.mensagem || "Erro ao excluir registro.");
        }

        modalConfirmacao.hidden = true;
        registroParaExcluir = null;

        await carregarGastos();
        await carregarEntradas();

    } catch (erro) {

        alert(erro.message || "Não foi possível apagar o registro.");

    }

});


// ==========================================
// CRIAR BOTÕES DE AÇÕES
// ==========================================

function criarBotoesAcoes(id, tipo, dados) {
    const coluna = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao-editar");

    botaoEditar.addEventListener("click", () => {
        editarRegistro(id, tipo, dados);
    });

    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "Apagar";
    botaoApagar.classList.add("botao-apagar");

    botaoApagar.addEventListener("click", () => {
        abrirModal(id, tipo);
    });

    coluna.appendChild(botaoEditar);
    coluna.appendChild(botaoApagar);

    return coluna;
}

function editarRegistro(id, tipo, dados) {
    registroEmEdicao = { id, tipo };

    if (tipo === "gasto") {
        formularioGasto.hidden = false;

        document.getElementById("descricao").value = dados.descricao;
        document.getElementById("metodo_pagamento").value = dados.metodo_pagamento;
        document.getElementById("data").value = dados.data_compra;
        document.getElementById("valor").value = dados.valor;

        formularioGasto.querySelector('button[type="submit"]').textContent = "Atualizar gasto";

        mensagemGasto.textContent = "Editando gasto...";
        formularioGasto.scrollIntoView({ behavior: "smooth" });

    } else {
        formularioEntrada.hidden = false;

        document.getElementById("item").value = dados.item;
        document.getElementById("data").value = dados.data;
        document.getElementById("valor").value = dados.valor;

        formularioEntrada.querySelector('button[type="submit"]').textContent = "Atualizar entrada";

        mensagemEntrada.textContent = "Editando entrada...";
        formularioEntrada.scrollIntoView({ behavior: "smooth" });
    }
}



// ==========================================
// CARREGAR DADOS AO ABRIR A PÁGINA
// ==========================================

carregarEntradas();
carregarGastos();
