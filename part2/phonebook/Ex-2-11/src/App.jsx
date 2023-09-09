import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newNameToAdd = newName.trim()
    const newNumberToAdd = newNumber.trim()
    if (persons.some((person) => person.name === newNameToAdd)) {
      alert (`${newNameToAdd} is already added to phonebook`)
    }
    else if (!newNameToAdd) {
      alert ("Please enter name")
    }
    else if (!newNumberToAdd) {
      alert ("Please enter number")
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
      setNewFilter('')
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
      <Filter value={newFilter} onChange={handleFilterChange} />
      <div>
        <h3>Add a new</h3>
      <PersonForm
          onSubmit={addPerson}
          newName={newName}
          newNumber={newNumber}
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <div>
        <Persons persons={personsToShow} />
        
      </div>
    </div>
  )
}

export default App