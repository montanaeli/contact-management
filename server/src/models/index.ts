// 'use strict';
import dotenv from "dotenv";

const User = require("./User");
const Contact = require("./Contact");
const ContactAdress = require("./ContactAdress");
const UserAdress = require("./UserAdress");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db: any = {};

dotenv.config();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.log("Unable to connect to the database: ", error);
  });

sequelize.addHook("afterConnect", (connection: any) => {
  connection.on("error", (error: any) => {
    console.log("Sequelize connection error:", error);
  });

  connection.on("end", () => {
    console.log("Sequelize connection disconnected.");
  });
});

sequelize.isDatabaseConnected = async () => {
  try {
    let result = await sequelize.authenticate();
    return undefined;
  } catch (err) {
    return err;
  }
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User(sequelize, DataTypes);
db.contact = Contact(sequelize, DataTypes, db.user);
db.userAdress = UserAdress(sequelize, DataTypes, db.user);
db.contactAdress = ContactAdress(sequelize, DataTypes, db.contact);

export default db;
