// Importa o módulo 'sqlite3' e habilita o modo verbose para exibir mensagens detalhadas durante a execução.
const sqlite3 = require("sqlite3").verbose();

const { table } = require("console");
// Importa o módulo 'path', utilizado para lidar com caminhos de arquivos e diretórios de forma segura.
const path = require("path");

// Resolve o caminho absoluto para o arquivo do banco de dados SQLite chamado 'database.sqlite'.
const dbPath = path.resolve(__dirname, "database.sqlite");

// Cria uma conexão com o banco de dados SQLite usando o caminho definido anteriormente.
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    // Verifica se houve um erro ao conectar ao banco de dados.
    console.error("Erro ao conectar ao banco de dados:", err.message); // Exibe o erro no console.
  } else {
    console.log("Conectado ao banco de dados SQLite."); // Exibe uma mensagem de sucesso no console.
  }
});

// Usa o método 'serialize' para garantir que as operações no banco de dados sejam executadas de forma sequencial.
db.serialize(() => {
  /*db.run("DROP TABLE IF EXISTS usuarios", (err) => {
    if (err) {
      console.error("Erro ao excluir tabela:", err.message);
    } else {
      console.log("Tabela de usuários excluída com sucesso.");
    }
  });*/

  // Comando SQL para criar a tabela 'usuarios', se ela ainda não existir.
  db.run(
    `    CREATE TABLE usuarios ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone INT NOT NULL,
            privSelec TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )
    `,
    (err) => {
      if (err) {
        // Verifica se houve um erro ao executar o comando de criação da tabela.
        console.error("Erro ao criar tabela:", err.message); // Exibe a mensagem de erro no console.
      } else {
        //console.log("Tabela de usuários criada com sucesso.");
        console.log("Tabela de usuários criada ou já existe."); // Confirma que a tabela foi criada ou já está disponível.
      }
    }


  );
});


// Exporta a instância do banco de dados para que ela possa ser usada em outros arquivos do projeto.
module.exports = db;
