const express = require("express"); /*importa o express */
const route = require("./route");
const path = require("path");

const server = express(); /*inicializa o server */

server.set("view engine", "ejs"); /* responsável pela view engine é o ejs*/
server.set("views", path.join(__dirname, "views"));
/*path é o caminho do arquivo até a pasta(CRIARSALA)*/
/*join junta o dirname(src) com o views(nossa pasta) */

server.use(express.urlencoded({ extended: true }));
server.use(route);
server.use(express.static("public"));

server.listen(3002, () =>
  console.log("RODANDO")
); /*porta escolhida pra rodar */
