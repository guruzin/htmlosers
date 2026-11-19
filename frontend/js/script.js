// ==========================================
// CONTROLE DE EDIÇÃO
// ==========================================

let registroEmEdicao = null;


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
// VALIDAÇÃO
// ==========================================

const VALOR_MAXIMO = 1000000;
const TAMANHO_MIN_TEXTO = 3;
const TAMANHO_MAX_TEXTO = 100;

// Converte "1.234,56", "1234,56" ou "1234.56" em número
function converterValor(texto) {
    let valor = String(texto ?? "").trim().replace(/\s/g, "").replace("R$", "");

    if (valor.includes(",")) {
        // Formato brasileiro: ponto é milhar, vírgula é decimal
        valor = valor.replace(/\./g, "").replace(",", ".");
    }

    // Aceita apenas números com até 2 casas decimais
    if (!/^\d+(\.\d{1,2})?$/.test(valor)) {
        return NaN;
    }

    return Number(valor);
}

// Verifica se a data é real (ex.: 31/02 não é válida) e não está no futuro
function validarData(texto) {
    if (!texto) {
        return "Informe a data.";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
        return "Data em formato inválido.";
    }

    const [ano, mes, dia] = texto.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);

    const dataExiste =
        data.getFullYear() === ano &&
        data.getMonth() === mes - 1 &&
        data.getDate() === dia;

    if (!dataExiste) {
        return "Data inválida.";
    }

    if (ano < 2000) {
        return "A data deve ser a partir do ano 2000.";
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (data > hoje) {
        return "A data não pode estar no futuro.";
    }

    return null;
}

function validarTexto(texto, nomeCampo) {
    const valor = String(texto ?? "").trim();

    if (!valor) {
        return `Informe ${nomeCampo}.`;
    }

    if (valor.length < TAMANHO_MIN_TEXTO) {
        return `${capitalizar(nomeCampo)} deve ter pelo menos ${TAMANHO_MIN_TEXTO} caracteres.`;
    }

    if (valor.length > TAMANHO_MAX_TEXTO) {
        return `${capitalizar(nomeCampo)} deve ter no máximo ${TAMANHO_MAX_TEXTO} caracteres.`;
    }

    return null;
}

function validarValor(texto) {
    if (String(texto ?? "").trim() === "") {
        return "Informe o valor.";
    }

    const valor = converterValor(texto);

    if (Number.isNaN(valor)) {
        return "Valor inválido. Use apenas números (ex.: 150,90).";
    }

    if (valor <= 0) {
        return "O valor deve ser maior que zero.";
    }

    if (valor > VALOR_MAXIMO) {
        return `O valor não pode passar de ${formatarMoeda(VALOR_MAXIMO)}.`;
    }

    return null;
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Marca/desmarca o campo como inválido (para estilizar no CSS)
function marcarCampo(campo, invalido) {
    if (!campo) return;

    campo.classList.toggle("campo-invalido", invalido);
    campo.setAttribute("aria-invalid", invalido ? "true" : "false");
}

function limparErros(formulario) {
    formulario.querySelectorAll(".campo-invalido").forEach(campo => {
        marcarCampo(campo, false);
    });
}

// Recebe { nomeDoCampo: mensagemDeErro | null } e exibe os erros
function aplicarErros(formulario, elementoMensagem, erros) {
    limparErros(formulario);

    const camposComErro = Object.keys(erros).filter(nome => erros[nome]);

    if (camposComErro.length === 0) {
        return true;
    }

    camposComErro.forEach(nome => {
        marcarCampo(formulario.querySelector(`[name="${nome}"]`), true);
    });

    elementoMensagem.textContent = camposComErro.map(nome => erros[nome]).join(" ");

    // Leva o foco para o primeiro campo com erro
    formulario.querySelector(`[name="${camposComErro[0]}"]`)?.focus();

    return false;
}

function validarGasto(dados) {
    return {
        data: validarData(dados.get("data")),
        descricao: validarTexto(dados.get("descricao"), "a descrição"),
        valor: validarValor(dados.get("valor")),
        metodo_pagamento: String(dados.get("metodo_pagamento") ?? "").trim()
            ? null
            : "Selecione o método de pagamento."
    };
}

function validarEntrada(dados) {
    return {
        data: validarData(dados.get("data")),
        item: validarTexto(dados.get("item"), "o item"),
        valor: validarValor(dados.get("valor"))
    };
}

// Remove a marcação de erro assim que o usuário corrige o campo
[document.querySelector("#form-gasto"), document.getElementById("form-entrada")]
    .forEach(formulario => {
        formulario?.addEventListener("input", evento => {
            marcarCampo(evento.target, false);
        });
    });

// Impede datas futuras no seletor de data
(function limitarDatas() {
    const hoje = new Date();
    const hojeTexto = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0")
    ].join("-");

    document.querySelectorAll('#form-gasto [name="data"], #form-entrada [name="data"]')
        .forEach(campo => campo.setAttribute("max", hojeTexto));
})();


// ==========================================
// UTILITÁRIOS
// ==========================================

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Normaliza os campos de texto e o valor antes de enviar ao PHP
function normalizarDados(dados) {
    for (const [chave, valor] of dados.entries()) {
        if (typeof valor === "string") {
            dados.set(chave, valor.trim());
        }
    }

    if (dados.has("valor")) {
        dados.set("valor", converterValor(dados.get("valor")).toFixed(2));
    }
}

let totalEntradas = 0;
let totalGastos = 0;


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

    // Se não estiver editando um gasto, garantir formulário de cadastro
    if (registroEmEdicao?.tipo !== "gasto") {
        formularioGasto.reset();
        limparErros(formularioGasto);
        mensagemGasto.textContent = "";
        formularioGasto.querySelector('button[type="submit"]').textContent = "Salvar gasto";
    }
});


// Fechar formulário de gastos
cancelarGasto.addEventListener("click", () => {
    formularioGasto.hidden = true;
    formularioGasto.reset();
    limparErros(formularioGasto);
    mensagemGasto.textContent = "";

    registroEmEdicao = null;

    formularioGasto.querySelector('button[type="submit"]').textContent = "Salvar gasto";
});


// ==========================================
// CADASTRAR / EDITAR GASTO
// ==========================================

formularioGasto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formularioGasto);

    // Validação antes de enviar
    if (!aplicarErros(formularioGasto, mensagemGasto, validarGasto(dados))) {
        return;
    }

    normalizarDados(dados);

    const editando = registroEmEdicao?.tipo === "gasto";

    const arquivo = editando
        ? "editar_gastos.php"
        : "salva_gastos.php";

    if (editando) {
        dados.append("id", registroEmEdicao.id);
    }

    const botaoSalvar = formularioGasto.querySelector('button[type="submit"]');
    botaoSalvar.disabled = true; // evita envio duplicado

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

        botaoSalvar.textContent = "Salvar gasto";

        await carregarGastos();
        await carregarEntradas();

    } catch (erro) {
        mensagemGasto.textContent = erro.message;
        console.error(erro);
    } finally {
        botaoSalvar.disabled = false;
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
        totalGastos = gastos.reduce((soma, gasto) => {
            return soma + (Number(gasto.valor) || 0);
        }, 0);

        document.getElementById("total-gastos").textContent = formatarMoeda(totalGastos);

        // Criar linhas da tabela
        gastos.forEach(gasto => {

            const linha = document.createElement("tr");

            const dataFormatada = String(gasto.data_compra ?? "")
                .split("-")
                .reverse()
                .join("/");

            [
                dataFormatada,
                gasto.descricao,
                formatarMoeda(gasto.valor),
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

    // Se não estiver editando uma entrada, garantir formulário de cadastro
    if (registroEmEdicao?.tipo !== "entrada") {
        formularioEntrada.reset();
        limparErros(formularioEntrada);
        mensagemEntrada.textContent = "";
        formularioEntrada.querySelector('button[type="submit"]').textContent = "Salvar entrada";
    }
});


// Fechar formulário de entradas
cancelarEntrada.addEventListener("click", () => {
    formularioEntrada.hidden = true;
    formularioEntrada.reset();
    limparErros(formularioEntrada);
    mensagemEntrada.textContent = "";

    registroEmEdicao = null;

    formularioEntrada.querySelector('button[type="submit"]').textContent = "Salvar entrada";
});


// ==========================================
// CADASTRAR / EDITAR ENTRADA
// ==========================================

formularioEntrada.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formularioEntrada);

    // Validação antes de enviar
    if (!aplicarErros(formularioEntrada, mensagemEntrada, validarEntrada(dados))) {
        return;
    }

    normalizarDados(dados);

    const editando = registroEmEdicao?.tipo === "entrada";

    const arquivo = editando
        ? "editar_ganhos.php"
        : "ganhos.php";

    if (editando) {
        dados.append("id", registroEmEdicao.id);
    }

    const botaoSalvar = formularioEntrada.querySelector('button[type="submit"]');
    botaoSalvar.disabled = true; // evita envio duplicado

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

        botaoSalvar.textContent = "Salvar entrada";

        await carregarEntradas();
        await carregarGastos();

    } catch (erro) {
        mensagemEntrada.textContent = erro.message;
        console.error(erro);
    } finally {
        botaoSalvar.disabled = false;
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
        totalEntradas = entradas.reduce((soma, entrada) => {
            return soma + (Number(entrada.valor) || 0);
        }, 0);

        document.getElementById("total-receitas").textContent = formatarMoeda(totalEntradas);

        // Criar linhas da tabela
        entradas.forEach(entrada => {

            const linha = document.createElement("tr");

            const dataFormatada = String(entrada.data ?? "")
                .split("-")
                .reverse()
                .join("/");

            [
                dataFormatada,
                entrada.item,
                formatarMoeda(entrada.valor)
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

// Usa os totais guardados em variáveis, em vez de ler o texto formatado da tela
function atualizarSaldo() {

    const elementoSaldo = document.getElementById("saldo-total");
    const saldo = totalEntradas - totalGastos;

    elementoSaldo.textContent = formatarMoeda(saldo);

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

    // Validação do registro antes de excluir
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        alert("Registro inválido.");
        return;
    }

    if (tipo !== "gasto" && tipo !== "entrada") {
        alert("Tipo de registro inválido.");
        return;
    }

    const formulario = new FormData();
    formulario.append("id", id);

    const arquivo = tipo === "gasto"
        ? "apagar_gastos.php"
        : "apagar_ganhos.php";

    confirmarExclusao.disabled = true;

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

    } finally {

        confirmarExclusao.disabled = false;

    }

});


// ==========================================
// CRIAR BOTÕES DE AÇÕES
// ==========================================

function criarBotoesAcoes(id, tipo, dados) {

    const coluna = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("botao-editar");

    botaoEditar.addEventListener("click", () => {
        editarRegistro(id, tipo, dados);
    });

    const botaoApagar = document.createElement("button");
    botaoApagar.type = "button";
    botaoApagar.textContent = "Apagar";
    botaoApagar.classList.add("botao-apagar");

    botaoApagar.addEventListener("click", () => {
        abrirModal(id, tipo);
    });

    coluna.appendChild(botaoEditar);
    coluna.appendChild(botaoApagar);

    return coluna;
}


// ==========================================
// EDITAR REGISTRO
// ==========================================

function editarRegistro(id, tipo, dados) {

    registroEmEdicao = { id, tipo };

    if (tipo === "gasto") {

        // Fecha o outro formulário para não misturar as edições
        formularioEntrada.hidden = true;
        formularioEntrada.reset();
        limparErros(formularioEntrada);

        formularioGasto.hidden = false;
        limparErros(formularioGasto);

        formularioGasto.querySelector('[name="descricao"]').value = dados.descricao;
        formularioGasto.querySelector('[name="metodo_pagamento"]').value = dados.metodo_pagamento;
        formularioGasto.querySelector('[name="data"]').value = dados.data_compra;
        formularioGasto.querySelector('[name="valor"]').value = dados.valor;

        formularioGasto.querySelector('button[type="submit"]').textContent = "Atualizar gasto";

        mensagemGasto.textContent = "Editando gasto...";
        formularioGasto.scrollIntoView({ behavior: "smooth" });

    } else {

        formularioGasto.hidden = true;
        formularioGasto.reset();
        limparErros(formularioGasto);

        formularioEntrada.hidden = false;
        limparErros(formularioEntrada);

        formularioEntrada.querySelector('[name="item"]').value = dados.item;
        formularioEntrada.querySelector('[name="data"]').value = dados.data;
        formularioEntrada.querySelector('[name="valor"]').value = dados.valor;

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
