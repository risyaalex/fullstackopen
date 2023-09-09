import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.error('Loading Error: ', error);
        })
  }, [])

  
  const addPerson = (event) => {
    event.preventDefault()
    const newNameToAdd = newName.trim()
    const newNumberToAdd = newNumber.trim()
    if (persons.some((person) => person.name === newNameToAdd)) {
      alert(`${newNameToAdd} is already added to phonebook`)
    }
    else if (!newNameToAdd) {
      alert("Please enter name")
    }
    else if (!newNumberToAdd) {
      alert("Please enter number")
    }
    else {
      const personNew = {
        name: newNameToAdd,
        number: newNumberToAdd,
        id: uuid(),
      }

      personService
        .create(personNew)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
      .catch((error) => {
        console.error('Error adding person: ', error);
        })
    
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

  const deletePerson = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this person?");
    
    if (confirmed) {
      personService
        .deleteThisPerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person: ', error);
        });
    }
  };

  const personsToShow = newFilter
  ? persons.filter((person) =>
      person.name && person.name.toLowerCase().includes(newFilter.toLowerCase())
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
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
        
      </div>
    </div>
  )
}

export default App