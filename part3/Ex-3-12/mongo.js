const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mongo-js:${password}@cluster0.4zw4wrv.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Person:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name,
    number,
  });
  person.save().then((result) => {
    console.log('Person saved!');
    mongoose.connection.close();
  });
}
