const express = require('express');
const server = express();
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const cohortsRouter = require('./routers/cohortsRouter');
// const studentsRouter = require('./routers/students');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("Server Working!");
})

server.use('/api/cohorts', cohortsRouter);

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

server.get('/api/cohorts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const cohort = await db('cohorts').where({ id: id }).first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

server.post('/api/cohorts', async (req, res) => {
  if (!req.body) {
    return (res.status(400).json({ message: "Please fill in the name of the new cohort" }))
  }
  try {
    const ids = await db('cohorts').insert(req.body);
    const id = ids[0];
    const cohort = await db('cohorts').where({ id }).first()
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts').where({ id: req.params.id }).update(req.body);
    if (count > 0) {
      const cohort = await db('cohorts').where({ id: req.params.id }).first();
      res.status(200).json({ cohort })
    } else {
      res.status(404).json({ message: "Cohort not found. Please try another" })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts').where({ id: req.params.id }).del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "404 error: Record not found" });
    }
  } catch (error) {
    res.status(500).json({ messsage: "Internal server error" });
  }
})


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n API running on http://localhost:${port} \n`);
})
