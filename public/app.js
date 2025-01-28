const API_URL = "http://localhost:3000/api";

// Função para redirecionar entre páginas
function redirecionar(pagina) {
  window.location.href = pagina;
}

// Cadastro de Usuário
if (document.getElementById("formCadastro")) {
  const formCadastro = document.getElementById("formCadastro");
  const btnIrParaLogin = document.getElementById("btnIrParaLogin");

  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;
    const privSelec = document.getElementById("privSelec").value;

    try {
      const response = await fetch(`${API_URL}/cadastro`, {  // Corrigido para remover a vírgula extra
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, telefone, privSelec }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        redirecionar("login.html");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário.");
    }
  });

  btnIrParaLogin.addEventListener("click", () => redirecionar("login.html"));
}

// Login de Usuário
if (document.getElementById("formLogin")) {
  const formLogin = document.getElementById("formLogin");

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.usuario && result.usuario.id) {
          localStorage.setItem("userId", result.usuario.id);
          redirecionar("usuarios.html");
        } else {
          console.error("ID não encontrado na resposta");
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login.");
    }
  });
}

// Exibir e Editar Usuário
if (document.getElementById("formDados")) {
  const userId = localStorage.getItem("userId");

  async function carregarUsuarioPorId(id) {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`);
      const usuario = await response.json();

      if (response.ok) {
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        document.getElementById("telefone").value = usuario.telefone;
        document.getElementById("privSelec").value = usuario.privSelec;
        document.getElementById("senha").value = usuario.senha;
        
      } else {
        alert("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      alert("Erro ao carregar dados do usuário.");
    }
  }

  if (userId) {
    carregarUsuarioPorId(userId);
  } else {
    alert("ID de usuário não encontrado.");
  }

  const salvarBtn = document.getElementById("salvar-btn");
  salvarBtn.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const privSelec = document.getElementById("privSelec").value;
    const senha = document.getElementById("senha").value;
    const userId = localStorage.getItem("userId");

    const dados = { nome, email, telefone, senha, privSelec };
    console.log("Enviando dados para atualização:", dados);

    try {
      const resposta = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
      }

      const resultado = await resposta.json();
      console.log("Resposta do servidor:", resultado);

      if (resposta.ok) {
        alert("Usuário atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar usuário: " + resultado.message);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Ocorreu um erro ao tentar atualizar o usuário.");
    }
  });
}
