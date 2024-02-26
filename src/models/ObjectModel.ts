import { DataTypes, Sequelize } from "sequelize";

export const ObjectModel = (sequelize: Sequelize) => {
  return sequelize.define('object', {
    name: DataTypes.STRING,
    quantity: DataTypes.NUMBER
  });
}