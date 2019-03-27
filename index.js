const express = require('express');
const server = express();
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
// const cohortsRouter = 

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("Server Working!");
})

// server.use('/api/cohorts', cohortsRouter);

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n API running on http://localhost:${port} \n`);
})
