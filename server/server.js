// Importa o módulo 'express' para criar o servidor HTTP.
const express = require("express");

const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

// Importa o módulo 'cors' para lidar com restrições de CORS em aplicações web.
const cors = require("cors");

// Importa o módulo 'path' para manipular caminhos de arquivos e diretórios.
const path = require("path");

// Importa as rotas da API do arquivo 'routes.js'.
const apiRoutes = require("./routes"); // Certifique-se de que o caminho relativo está correto.

// Cria uma instância do aplicativo Express.
const app = express();

// Define a porta onde o servidor irá rodar.
const PORT = 3000;

// ============================================================================
// Middleware: Configuração global da aplicação
// ============================================================================

// Configuração do middleware de sessão
app.use(
  session({
    store: new SQLiteStore(), // Armazena sessões no SQLite
    secret: "seguro", // Substitua por uma string segura
    resave: false, // Não salva a sessão se não for modificada
    saveUninitialized: false, // Não cria uma sessão até que algo seja armazenado nela
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 dia em milissegundos
      secure: false, // True apenas se usar HTTPS
      httpOnly: true, // Não acessível via JavaScript do cliente
    },
  })
);

// Habilita o uso de CORS para permitir requisições de diferentes origens.
app.use(cors());

// Configura o middleware para analisar o corpo de requisições JSON.
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários

// Configura o diretório estático para servir arquivos como HTML, CSS, JS e imagens.
app.use(express.static(path.join(__dirname, "../public")));
// O 'path.join' cria o caminho absoluto correto, mesmo em diferentes sistemas operacionais.
// O caminho '../public' refere-se à pasta 'public' que está no diretório pai do atual.

// Define o prefixo '/api' para todas as rotas importadas de 'routes.js'.
app.use("/api", apiRoutes);
// Isso significa que todas as rotas em 'routes.js' serão acessíveis com o prefixo '/api'.

// Rotas
app.get("/", (req, res) => {
  res.send("Sessões e cookies configurados!");
});
// ============================================================================
// Inicia o servidor
// ============================================================================
app.listen(PORT, () => {
  // Imprime no console uma mensagem indicando que o servidor está rodando.
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
// O método 'listen' faz o servidor ouvir requisições na porta especificada.

// ============================================================================
// Estrutura esperada do projeto
// ============================================================================
// O código pressupõe a seguinte estrutura de diretórios:
//
// ├── project-root/
// │   ├── public/        -> Arquivos estáticos (HTML, CSS, JS, imagens, etc.)
// │   ├── routes.js      -> Arquivo contendo as rotas da API.
// │   ├── server.js      -> Este arquivo.
// │   └── db.js          -> Arquivo de conexão com o banco de dados (se necessário).
