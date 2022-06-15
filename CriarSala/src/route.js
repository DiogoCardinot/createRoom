const express = require("express"); /*importa express */
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

const route = express.Router(); /*quem é o route */

route.get(
  "/",
  (req /**requisição da rota*/, res /*resposta da rota */) =>
    res.render("index", {
      page: "enter-room",
    }) /*a resposta ele renderiza o index */
);
//post envia o conteúdo para a rota
route.get("/create-pass", (req, res) =>
  res.render("index", { page: "create-pass" })
);

route.post("/create-room", RoomController.create);
route.get("/room/:room", RoomController.open); //get pega o conteúdo da rota
route.post("/enterroom", RoomController.enter); //post(usado para quando envia formulario)

route.post("/question/create/:room", QuestionController.create);
route.post("/question/:room/:question/:action", QuestionController.index); // :room cria uma variável, não sabemos o que vai ser passado

module.exports = route;
