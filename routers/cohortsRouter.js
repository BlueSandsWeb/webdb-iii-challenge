const express = require('express');
const router = express.Router();
const knex = require('knex');
const db = knex(knexConfig.development);

const db = knex(knexConfig);