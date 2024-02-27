import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
 
  return sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
}