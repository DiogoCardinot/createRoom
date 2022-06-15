const Database = require("../db/config");

module.exports = {
  //index recebe dados da modal
  async index(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    /* VERIFICAR SE A SENHA ESTA CORRETA */
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id=${roomId}`);

    if (verifyRoom.pass == password) {
      if (action == "delete") {
        //DELETA DA TABELA QUESTIONS o id da questão q você clicar
        await db.run(`DELETE FROM questions WHERE id=${questionId}`);
      } else if (action == "check") {
        await db.run(`UPDATE questions SET read=1 WHERE id= ${questionId} `);
      }
    } else {
      res.render("passincorrect", { roomId: roomId });
    }

    res.redirect(`/room/${roomId}`);
  },

  async create(req, res) {
    const db = await Database();

    //recebe o name que está no formulário de entrada no room.ejs
    const question = req.body.question;
    //recebe o numero da sala para que questões de outras salas não caiam nessa
    const roomId = req.params.room;

    await db.run(`INSERT INTO questions (
      title,
      room, 
      read
    )VALUES(
      
      "${question}",
      ${roomId},
      0
    ) `);
    res.redirect(`/room/${roomId}`);
  },
};
