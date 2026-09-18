const botaoTema = document.querySelector("#botao-tema");
const temaNoite = document.querySelector("#tema-noite");
function darkMode(){
    temaNoite.disabled = !temaNoite.disabled;
    if (temaNoite.disabled) {
botaoTema.textContent = "🌙";
} else {
botaoTema.textContent = "🌞";
}

}

botaoTema.addEventListener("click", darkMode);
