document.addEventListener('DOMContentLoaded', function () {
    const botaoMenuPrincipal = document.getElementById('botao-menu-principal');
    const closeIconPrincipal = document.querySelector('.close-icon');
    const menuPrincipal = document.getElementById('menu');

    // Evento para abrir o primeiro menu
    botaoMenuPrincipal.addEventListener('click', function () {
        menuPrincipal.classList.add('open');
        menuPrincipal.classList.add('slide-in');
        botaoMenuPrincipal.style.display = 'none';
    });

    // Evento para fechar o primeiro menu
    closeIconPrincipal.addEventListener('click', function () {
        menuPrincipal.classList.remove('slide-in');
        setTimeout(() => menuPrincipal.classList.remove('open'), 300);
        botaoMenuPrincipal.style.display = 'block';
    });
});

document.getElementById('emailButton').addEventListener('click', sendEmail);

function sendEmail() {
    document.getElementById("sendEmail").style.display = "block";
    document.getElementById("mensagemConfirmacao").innerHTML = `
    <section class="form">
        <form action="#" class="sub-form" id="sub">
            <div class="upper-form">
                <h2 id="cc2">Solicitação</h2>
                <label>Titulo</label>
                <input type="text" name="usuario" id="usuario">
                <label for="locationSelect">Localização</label>
                <select name="Localização" id="locationSelect">
                    <option value="suaLocalizacao" selected>Sua Localização</option>
                    <option value="colocarLocalizacao">Colocar endereço</option>
                </select>
                <div id="extraInputs" class="extra-inputs" style="display: none;">
                    <label for="latitude">Cidade:</label>
                    <input type="text" id="latitude" name="latitude">
                    <label for="longitude">Bairro:</label>
                    <input type="text" id="longitude" name="longitude">
                    <label for="latitude">Rua:</label>
                    <input type="text" id="latitude" name="latitude">
                    <label for="latitude">Numero:</label>
                    <input type="text" id="latitude" name="latitude">
                </div>
                <label>Descrição</label>
                <input type="text" name="senha" id="senha">
                <button type="button" onclick="getLocation()" id="emailButton">Enviar</button>
                <button id="botaofechar" onclick="fecharPopup()" class="botaofechar">Fechar</button>
            </div>
        </form>
    </section>`;

    // Obtenção dos elementos após a criação do HTML
    const locationSelect = document.getElementById('locationSelect');
    const sub = document.getElementById('sub');
    const pop = document.getElementById('sendEmail');
    const extraInputs = document.getElementById('extraInputs');
    const fechar = document.getElementById('botaofechar')
    const menu = document.getElementById('menu')
    const lista = document.getElementById('lista')
    // Verifica mudanças no select para exibir ou ocultar inputs adicionais
    locationSelect.addEventListener('change', function() {
        if (locationSelect.value === 'colocarLocalizacao') {
            sub.style.height = '42vw';
            extraInputs.style.display = 'block';
        } else {
            extraInputs.style.display = 'none';
            sub.style.height = '27vw';
        }
    });

    // Função para aplicar estilos responsivos usando media query
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function applyResponsiveStyles() {
        if (locationSelect.value === 'colocarLocalizacao') {
            if (mediaQuery.matches) {
                sub.style.marginTop='19%'
                sub.style.width='100%'
                sub.style.height='100%'
                pop.style.height='100%'
                pop.style.width='100%'
                pop.style.alignItems='center'
                pop.style.justifyContent='center'
                pop.style.flexDirection='column'
            } else {
                // Estilos para telas maiores
                extraInputs.style.display = 'none';
                sub.style.height = '42vw';
            }
        }
    }

    applyResponsiveStyles();
    mediaQuery.addEventListener("change", applyResponsiveStyles); // Monitora mudanças de largura
}

function fecharPopup() {
    document.getElementById("sendEmail").style.display = "none";
}
