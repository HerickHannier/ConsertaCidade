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
        botaoMenuPrincipal.style.display = 'block ';
    });

});

 // Obtenção dos elementos
 const locationSelect = document.getElementById('locationSelect');
 const extraInputs = document.getElementById('extraInputs');

 

document.getElementById('emailButton').addEventListener('click', sendEmail);

function sendEmail() {
    document.getElementById("sendEmail").style.display = "block";
    document.getElementById("mensagemConfirmacao").innerHTML = `
    <section class="form">
        <form action="#" class="sub-form" id="sub">
            <div class="upper-form">
                <br>
                <h2 id="cc2">Solicitação</h2>
                <label>Titulo</label><br>
                <input type="text" name="usuario" id="usuario">
                <label for="locationSelect">Localização</label>
                <select name="Localização" id="locationSelect">
                    <option value="suaLocalizacao" selected>Sua Localização</option>
                    <option value="colocarLocalizacao">Colocar endereço</option>
                </select>
                <!-- Inputs adicionais para localização -->
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
                
                <div class="btn">
                   <button type="button" onclick="getLocation()" id="emailButton">Enviar</button>
                </div>
            </div>
            <div class="bottom-form">
                <div class="no-account">Precisa de ajuda?</div>
                <a href="cadastro.html" class="signup"> Clique aqui! </a>
            </div>
        </form>
    </section>`;

    // Obtenção dos elementos após inserir o HTML
    const locationSelect = document.getElementById('locationSelect');
    const sub = document.getElementById('sub');
    const cc2 = document.getElementById('cc2');
    const extraInputs = document.getElementById('extraInputs');

    // Evento para monitorar mudanças no select
    locationSelect.addEventListener('change', function() {
        // Verifica o valor selecionado e exibe ou oculta os inputs adicionais
        if (locationSelect.value === 'colocarLocalizacao') {
            sub.style.height = '42vw'
            extraInputs.style.display = 'block';
            
        } else {
            extraInputs.style.display = 'none';
            sub.style.height = '27vw'
        }
    });
}

function fecharPopup() {
    document.getElementById("sendEmail").style.display = "none";
}
