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