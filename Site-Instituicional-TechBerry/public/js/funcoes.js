// sessão
function validarSessao() {
    // aguardar();
    console.log("Chamou");
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;


    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        console.log("verdadeiro");
        // finalizarAguardar();
    } else {
        console.log("falso");
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

function mostrarMetricas(){
    if (tempMetrica.style.display == 'none') {
        tempMetrica.style.display = "block";
        umiMetrica.style.display = "block";
    } else {
        tempMetrica.style.display = "none";
        umiMetrica.style.display = "none";
    }
}

