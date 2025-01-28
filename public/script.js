document.getElementById("emailButton").addEventListener("click", function (event) {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    // Verifica se os campos de usuário e senha estão preenchidos
    if (usuario.trim() === '' || senha.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;  // Para impedir que o restante do código seja executado
    }

    // Chama a função para solicitar a localização
    getLocation();

    // Previne o comportamento padrão do botão (evita envio de formulário se houver)
    event.preventDefault();
});

// Define a função getLocation no escopo global para obter a localização do usuário
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else {
        alert("Geolocalização não é suportada pelo navegador.");
    }
}

// Função que salva a latitude e longitude no localStorage e redireciona para o mapa
function savePosition(position) {
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);
    
    // Redireciona para a página do mapa após salvar a posição
    window.location.href = "mapa.html";
}

// Função que trata erros de geolocalização e exibe alertas apropriados
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permissão negada para acessar localização.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informação de localização indisponível.");
            break;
        case error.TIMEOUT:
            alert("O pedido para obter a localização expirou.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocorreu um erro desconhecido.");
            break;
    }
}
