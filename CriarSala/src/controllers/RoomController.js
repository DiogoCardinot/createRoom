const Database = require("../db/config");

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId;
    let isRoom = true;

    while (isRoom) {
      // GERA O NÚMERO DA SALA COM 6 ALGARISMOS
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString()); //to string para concatenar, senão ele ia somar 0 com o número que viesse
      }

      /* TUDO MAIÚSCULO É REFERENTE AO BANCO DE DADOS*/
      //VERIFICAR SE O NÚMERO JÁ EXISTE //all ele busca em todo banco de dados e retorna algo
      const roomsExistIds = await db.all(`SELECT id FROM rooms`);
      // só estamos selecionando o id, para selecionar todos poderia se fazer SELECT * from rooms ou SELECT id,pass FROM rooms

      isRoom = roomsExistIds.some((roomExistId) => roomExistId === roomId);
      if (!isRoom) {
        /* INSERE A SALA NO BANCO */ //.run é pra ele rodar
        await db.run(`INSERT INTO rooms (
            id,
           pass
          ) VALUES (
            ${parseInt(roomId)},
            ${pass}
          )`);
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },
  async open(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questions = await db.all(
      `SELECT * FROM questions WHERE room=${roomId} and read = 0`
    );
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room=${roomId} and read = 1`
    );

    let isNoQuestions;

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true;
      }
    }
    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
    });
  },

  enter(req, res) {
    const roomId = req.body.roomId;
    res.redirect(`/room/${roomId}`);
  },
};
