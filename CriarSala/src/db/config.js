const sqlite3 = require("sqlite3");
const { open } = require("sqlite"); // procura o open dentro do sqlite e traz pra gente numa variável open

module.exports = () =>
  open({
    filename: "./src/db/rocketq.sqlite", //caminho do banco de dados(onde ele vai ser guardado) e o nome do arquivo
    driver: sqlite3.Database,
  });
