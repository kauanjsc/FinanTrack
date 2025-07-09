const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.ENUM("receita", "despesa"), allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: true },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "transactions",
  timestamps: true,
});

module.exports = Transaction;
