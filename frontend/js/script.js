const botaoTema = document.querySelector("#botao-tema");
const temaNoite = document.querySelector("#tema-noite");
const logoImg = document.querySelector("#logo-img");

function darkMode() {
    temaNoite.disabled = !temaNoite.disabled;

    if (temaNoite.disabled) {
        // Modo Claro
        botaoTema.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
        if (logoImg) logoImg.src = "img/logo_cabecalho.png";
    } else {
        // Modo Escuro
        botaoTema.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
        if (logoImg) logoImg.src = "img/logo_cabecalho_modo_escuro.png";
    }
}

botaoTema.addEventListener("click", darkMode);

// Elementos do formulário
const botaoNovoGasto = document.querySelector("#botao-novo-gasto");
const formularioGasto = document.querySelector("#form-gasto");
const cancelarGasto = document.querySelector("#cancelar-gasto");
const mensagemGasto = document.querySelector("#mensagem-gasto");
const listaGastos = document.querySelector("#lista-gastos");

// Abrir formulário
botaoNovoGasto.addEventListener("click", () => {
    formularioGasto.hidden = false;
});

// Fechar formulário
cancelarGasto.addEventListener("click", () => {
    formularioGasto.hidden = true;
    formularioGasto.reset();
    mensagemGasto.textContent = "";
});

// Enviar formulário
formularioGasto.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const dados = new FormData(formularioGasto);

    try {

        const resposta = await fetch("../backend/salva_gastos.php", {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
            throw new Error(resultado.mensagem);
        }

        // Recuperar os dados
        const descricao = dados.get("descricao");
        const metodo = dados.get("metodo_pagamento");
        const data = dados.get("data");
        const valor = Number(dados.get("valor"));

        // Criar nova linha
        const linha = document.createElement("tr");

        const dataFormatada = data.split("-").reverse().join("/");

        const valorFormatado = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        [dataFormatada, descricao, valorFormatado, metodo].forEach(texto => {
            const coluna = document.createElement("td");
            coluna.textContent = texto;
            linha.appendChild(coluna);
        });

        listaGastos.appendChild(linha);

        // Mensagem de sucesso
        mensagemGasto.textContent = resultado.mensagem;

        formularioGasto.reset();

        setTimeout(() => {
            formularioGasto.hidden = true;
            mensagemGasto.textContent = "";
        }, 1500);

    } catch (erro) {

        mensagemGasto.textContent = erro.message || "Erro ao cadastrar gasto.";

    }

});

async function carregarGastos() {
    try {

        const resposta = await fetch("../backend/listar_gastos.php");

        const gastos = await resposta.json();

        if (!resposta.ok) {
            throw new Error("Erro ao buscar gastos.");
        }

        listaGastos.innerHTML = "";

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

            listaGastos.appendChild(linha);

        });

    } catch (erro) {
        console.error("Erro ao carregar gastos:", erro);
    }
}

const formularioEntrada = document.getElementById("form-entrada");
const botaoNovaEntrada = document.getElementById("botao-novo-entrada");
const cancelarEntrada = document.getElementById("cancelar-entrada");
const listaReceitas = document.getElementById("lista-receitas");
const mensagemEntrada = document.getElementById("mensagem-entrada");

// Abrir formulário
botaoNovaEntrada.addEventListener("click", () => {
    formularioEntrada.hidden = false;
});

// Fechar formulário
cancelarEntrada.addEventListener("click", () => {
    formularioEntrada.hidden = true;
    formularioEntrada.reset();
    mensagemEntrada.textContent = "";
});

// Carregar entradas
async function carregarEntradas() {
    try {

        const resposta = await fetch("../backend/listar_ganhos.php");

        const entradas = await resposta.json();

        if (!resposta.ok) {
            throw new Error("Erro ao buscar entradas.");
        }

        listaReceitas.innerHTML = "";

        entradas.forEach(entrada => {

            const linha = document.createElement("tr");

            const dataFormatada = entrada.data.split("-").reverse().join("/");

            const valorFormatado = Number(entrada.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            [dataFormatada, entrada.item, valorFormatado].forEach(texto => {

                const coluna = document.createElement("td");

                coluna.textContent = texto;

                linha.appendChild(coluna);

            });

            listaReceitas.appendChild(linha);

        });

    } catch (erro) {

        console.error("Erro ao carregar entradas:", erro);

    }
}

// Cadastrar entrada
formularioEntrada.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formularioEntrada);

    try {
        const resposta = await fetch("../backend/ganhos.php", {
            method: "POST",
            body: dados

        });


        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
            mensagemEntrada.textContent = resultado.mensagem;
            return;
        }

        mensagemEntrada.textContent = resultado.mensagem;

        formularioEntrada.reset();

        await carregarEntradas();

        formularioEntrada.hidden = true;

    } catch (erro) {
        mensagemEntrada.textContent = "Erro ao cadastrar entrada.";
        console.error(erro);
    }
});

// Carregar ao abrir a página
carregarEntradas();
carregarGastos();