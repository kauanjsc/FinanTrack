// test-db.js
const sequelize = require("./config/database"); // ajuste o caminho se seu arquivo estiver em outro lugar

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
