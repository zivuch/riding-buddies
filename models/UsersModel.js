import { Sequelize } from "sequelize";
import db from "../config/elephantSQL.js";

const { DataTypes } = Sequelize;

//Model Instances
const Users = db.define(
  "users",
  {
    firstName: {
      field: "firstname",
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      field: "number",
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityOfResidence: {
      field: "city",
      type: DataTypes.STRING,
      allowNull: false,
    },
    motorcycle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lat: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Users;
