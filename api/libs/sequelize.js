const { Sequelize } = require('sequelize');
import * as pg from 'pg';


const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialectModule: pg,
  // logging: false,
});

setupModels(sequelize);

module.exports = sequelize;
