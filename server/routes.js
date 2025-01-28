// Importa o módulo 'express' para criar roteadores e gerenciar rotas da API.
const express = require("express");

// Cria um roteador para definir as rotas da aplicação.
const router = express.Router();

// Importa o arquivo 'db' que gerencia a conexão com o banco de dados SQLite.
const db = require("./db");

// ============================================================================
// Rota: Cadastro de usuário
// ============================================================================
router.post("/cadastro", (req, res) => {
  // Extrai os dados 'nome', 'email', 'senha' e 'telefone' do corpo da requisição.
  const { nome, email, senha, telefone, privSelec } = req.body;

  // Verifica se todos os campos foram preenchidos.
  if (!nome || !email || !senha || !telefone || !privSelec) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." }); // Responde com erro caso falte algum campo.
  }

  // Define a query SQL para inserir um novo usuário na tabela 'usuarios'.
  const query = "INSERT INTO usuarios (nome, email, senha, telefone, privSelec) VALUES (?, ?, ?, ?, ?)";

  // Executa a query SQL usando os dados fornecidos.
  db.run(query, [nome, email, senha, telefone, privSelec], function (err) {
    if (err) {
      // Trata possíveis erros durante a execução da query.
      console.error(err.message); // Exibe o erro no console para depuração.
      return res.status(500).json({ message: "Erro ao cadastrar o usuário." }); // Retorna uma mensagem de erro genérica ao cliente.
    }

    // Responde ao cliente com sucesso, incluindo o ID do novo usuário.
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      id: this.lastID, // 'this.lastID' contém o ID gerado para o novo usuário.
    });
  });
});

// ============================================================================
// Rota: Login de usuário
// ============================================================================
router.post("/login", (req, res) => {
  // Extrai os dados 'email' e 'senha' do corpo da requisição.
  const { email, senha } = req.body;

  // Verifica se todos os campos foram preenchidos.
  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." }); // Retorna erro se algum campo estiver vazio.
  }

  // Define a query SQL para buscar um usuário com o email e senha fornecidos.
  const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  // Executa a query SQL para buscar o usuário correspondente.
  db.get(query, [email, senha], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }

    if (row) {
      console.log('Usuário encontrado:', row); // Adicione este log para verificar a resposta
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        usuario: {
          id: row.id, // Certifique-se de que o 'id' está correto
          nome: row.nome,
          email: row.email,
          telefone: row.telefone,
          privSelec: row.privSelec,
        },
      });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }
  });
});

// ============================================================================
// Rota: Exibir todos os usuários
// ============================================================================
router.get("/usuarios", (req, res) => {
  // Define a query SQL para buscar todos os usuários (somente ID, nome e email).
  const query = `SELECT id, nome, senha, telefone, privSelec, email FROM usuarios`;

  // Executa a query SQL para buscar os usuários.
  db.all(query, [], (err, rows) => {
    if (err) {
      // Trata possíveis erros durante a execução da query.
      console.error(err.message); // Exibe o erro no console para depuração.
      return res.status(500).json({ error: "Erro ao buscar usuários!" }); // Retorna uma mensagem de erro genérica ao cliente.
    }

    // Responde ao cliente com uma lista de usuários.
    res.json(rows); // 'rows' contém os dados retornados pela consulta.
  });
});

// ============================================================================
// Rota: Exibir usuário específico por ID
// ============================================================================
router.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT nome, email, senha, privSelec, telefone FROM usuarios WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Erro ao carregar o usuário." });
    }

    if (row) {
      return res.status(200).json(row); // Retorna os dados do usuário
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  });
});

// ============================================================================
// Rota: Atualizar dados do usuário por ID
// ============================================================================
router.put("/usuarios/:id", (req, res) => {
  console.log("Recebida requisição PUT em /usuarios/:id"); // 🔍 LOG PARA TESTE
  console.log("Body recebido:", req.body); // 🔍 VEJA OS DADOS QUE CHEGAM
  console.log("ID recebido:", req.params.id); // 🔍 VEJA SE O ID ESTÁ CHEGANDO

  const { id } = req.params;
  const { nome, email, senha, telefone, privSelec } = req.body;

  if (!nome && !email && !telefone && !senha && !privSelec) {
    return res.status(400).json({ message: "Nenhuma informação para atualizar." });
  }

  let query = "UPDATE usuarios SET";
  const params = [];

  if (nome) {
    query += " nome = ?,";
    params.push(nome);
  }
  if (email) {
    query += " email = ?,";
    params.push(email);
  }
  if (telefone) {
    query += " telefone = ?,";
    params.push(telefone);
  }
  if (senha) {
    query += " senha = ?,";
    params.push(senha);
  }
  if (privSelec) {
    query += " privSelec = ?,";
    params.push(privSelec);
  }
  

  query = query.slice(0, -1);
  query += " WHERE id = ?";
  params.push(id);

  db.run(query, params, function (err) {
    if (err) {
      console.error("Erro ao atualizar usuário:", err.message);
      return res.status(500).json({ message: "Erro ao atualizar o usuário." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  });
});



// Exporta o roteador para que possa ser usado em outras partes da aplicação.
module.exports = router;
