import { useState } from 'react'
import uuid from 'react-uuid';

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()
    const newNameToAdd = newName.trim()
    const newNumberToAdd = newNumber.trim()
    if (persons.some((person) => person.name === newNameToAdd)) {
      alert (`${newNameToAdd} is already added to phonebook`)
    }
    else {
      const personNew = {
        name: newNameToAdd,
        number: newNumberToAdd,
        id: uuid(),
      }
      setPersons(persons.concat(personNew))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <h3>Add a new</h3>
        <form onSubmit={addPerson}>
          <p>
            Name: <input value={newName} onChange={handlePersonChange}/>
          </p>
          <p>
            Number: <input value={newNumber} onChange={handleNumberChange} />
          </p>
          <p>
            <button type="submit">Add new</button>
          </p>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        <p>Filter shown with: <input value={newFilter} onChange={handleFilterChange} /></p>
        <div>
          {personsToShow.length === 0 ? <p>No results!</p> : personsToShow.map(person =>
            <p key={person.id}>{person.name}: {person.number}</p>   
          )}
        </div>
      </div>
    </div>
  )
}

export default App