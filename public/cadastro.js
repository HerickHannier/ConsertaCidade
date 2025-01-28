document.getElementById("emailButton").addEventListener("click", function(event) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const confisenha = document.getElementById('confisenha').value;
    const senha = document.getElementById('senha').value;
  
    if (email.trim()==='@'){
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '' || confisenha.trim() === '') {
        alert('Por favor, preencha todos os campos.');
    } else {
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(savePosition, showError);
            } else {
                alert("Geolocalização não é suportada pelo navegador.");
            }
        }
        
        function savePosition(position) {
            // Salva a latitude e longitude no localStorage
            localStorage.setItem("latitude", position.coords.latitude);
            localStorage.setItem("longitude", position.coords.longitude);
        }
        
        function showError(error) {
            switch(error.code) {
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
        event.preventDefault();
        window.location.href = "mapa.html";
    }
  }else{
     alert("Email invalido");
  
  }});