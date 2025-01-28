app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Exemplo básico de autenticação (substitua por uma lógica real)
  if (username === "admin" && password === "1234") {
    // Armazena informações na sessão
    req.session.user = { username };
    return res.status(200).send("Login bem-sucedido");
  }

  res.status(401).send("Credenciais inválidas");
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Bem-vindo, ${req.session.user.username}`);
  } else {
    res.status(401).send("Acesso não autorizado");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erro ao encerrar a sessão");
    }
    res.clearCookie("connect.sid"); // Remove o cookie da sessão
    res.send("Logout bem-sucedido");
  });
});
