document.addEventListener('DOMContentLoaded', function () {
    // Verificando se os elementos do menu estão presentes
    const botaoMenuPrincipal = document.getElementById('botao-menu-principal');
    const closeIconPrincipal = document.querySelector('.close-icon');
    const menuPrincipal = document.getElementById('menu');

    // Evento para abrir o menu principal
    if (botaoMenuPrincipal && menuPrincipal) {
        botaoMenuPrincipal.addEventListener('click', function () {
            menuPrincipal.classList.add('open', 'slide-in');
            botaoMenuPrincipal.style.display = 'none';
        });
    }

    // Evento para fechar o menu principal
    if (closeIconPrincipal && menuPrincipal) {
        closeIconPrincipal.addEventListener('click', function () {
            menuPrincipal.classList.remove('slide-in');
            setTimeout(() => menuPrincipal.classList.remove('open'), 300);
            botaoMenuPrincipal.style.display = 'block';
        });
    }

    // Verificando se o botão de envio de e-mail está presente
    const emailButton = document.getElementById('emailButton');
    if (emailButton) {
        emailButton.addEventListener('click', sendEmail);
    }
});

// Função para enviar o e-mail
function sendEmail() {
    // Exibindo o formulário de envio
    document.getElementById("sendEmail").style.display = "block";
    document.getElementById("mensagemConfirmacao").innerHTML = `
    <section class="form">
        <form action="#" class="sub-form" id="sub">
            <div class="upper-form">
                <h2 id="cc2">Solicitação</h2>
                <label>Título</label>
                <input type="text" name="usuario" id="usuario">
                <label for="locationSelect">Localização</label>
                <select name="Localização" id="locationSelect">
                    <option value="suaLocalizacao" selected>Sua Localização</option>
                    <option value="colocarLocalizacao">Colocar endereço</option>
                </select>
                <div id="extraInputs" class="extra-inputs" style="display: none;">
                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade">
                    <label for="bairro">Bairro:</label>
                    <input type="text" id="bairro" name="bairro">
                    <label for="rua">Rua:</label>
                    <input type="text" id="rua" name="rua">
                    <label for="numero">Número:</label>
                    <input type="text" id="numero" name="numero">
                </div>
                <label>Descrição</label>
                <input type="text" name="descricao" id="descricao">
                <label>Selecione uma foto</label>
                <input type="file" id="fileInput" accept="image/*">
                <button type="button" onclick="getLocation()" id="emailButton">Enviar</button>
                <button id="botaofechar" onclick="fecharPopup()" class="botaofechar">Fechar</button>
            </div>
        </form>
    </section>`;

    // Captura do select para a localização e div de inputs extras
    const locationSelect = document.getElementById('locationSelect');
    const sub = document.getElementById('sub');
    const pop = document.getElementById('sendEmail');
    const extraInputs = document.getElementById('extraInputs');

    // Alterações baseadas no valor do select
    locationSelect.addEventListener('change', function () {
        if (locationSelect.value === 'colocarLocalizacao') {
            sub.style.height = '100%';
            sub.style.paddingBottom = '3%';
            extraInputs.style.display = 'block';
        } else {
            sub.style.height = '100%';
            sub.style.paddingBottom = '3%';
            extraInputs.style.display = 'none';
        }
    });

    // Media Query para estilos responsivos
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function applyResponsiveStyles() {
        if (locationSelect.value === 'colocarLocalizacao') {
            if (mediaQuery.matches) {
                // Estilos para telas menores
                sub.style.marginTop = '19%';
                sub.style.width = '100%';
                sub.style.height = '100%';
                pop.style.height = '100%';
                pop.style.width = '100%';
                pop.style.alignItems = 'center';
                pop.style.justifyContent = 'center';
                pop.style.flexDirection = 'column';
            }
        }
    }

    // Aplicar estilos responsivos no carregamento e redimensionamento
    applyResponsiveStyles();
    mediaQuery.addEventListener("change", applyResponsiveStyles);
}

// Função para fechar o pop-up de envio de e-mail
function fecharPopup() {
    document.getElementById("sendEmail").style.display = "none";
}

const olho = document.getElementById('olho');
const senha = document.getElementById('senha');

olho.addEventListener('click', () => {
    senha.type = senha.type === 'password' ? 'text' : 'password';
});
