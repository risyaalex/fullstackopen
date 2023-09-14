require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());

app.use(express.static('dist'));

app.use(express.json());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :POST')
);

morgan.token('POST', function (request, response) {
  return JSON.stringify(request.body);
});

let persons = [];

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.error('Error fetching persons:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }
  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.error('Error saving person:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/info', (request, response) => {
  const infoCount = `<p>Phonebook has info for ${persons.length} people.</p>`;
  const infoDate = `<p> ${new Date()}</p>`;
  response.send(infoCount + infoDate);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
