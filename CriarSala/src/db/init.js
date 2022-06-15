//importa o que tem no config
const Database = require("./config");

//inicia o banco de dados
const initDb = {
  //async e await andam juntos
  async init() {
    //await: faz com que o java só vá para a próxima etapa dps que o database retornar um resultado
    const db = await Database();

    await db.exec(`CREATE TABLE rooms (
    id      INTEGER     PRIMARY KEY, 
    pass    TEXT
    ) `);

    await db.exec(`CREATE TABLE questions(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT,
    read INT,
    room INT
    )`);

    await db.close();
  },
};

initDb.init();

//PRIMARY KEY diz pro banco que só pode ter um daquele, ou seja, duas salas não podem ter o mesmo id
