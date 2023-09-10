import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Error from './components/Error';
import Success from './components/Success';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageName, setErrorMessageName] = useState('')
  const [errorMessageNumber, setErrorMessageNumber] = useState('')

  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.error('Loading Error: ', error);
        setErrorMessage(`Error loading data`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newNameToAdd = newName.trim();
    const newNumberToAdd = newNumber.trim();
    
    const existingPerson = persons.find((person) => person.name === newNameToAdd);


    if (!newNameToAdd) {
      setErrorMessageName(`Please enter name!`)
      setTimeout(() => {setErrorMessageName(null)}, 5000)
    } else if (!newNumberToAdd) {
      setErrorMessageNumber(`Please enter number!`)
      setTimeout(() => {setErrorMessageNumber(null)}, 5000)
    } else if (existingPerson) {
      const confirmedUpdate = window.confirm(
        `${newNameToAdd} is already added to the phonebook. Do you want to update the number?`
      );
      
      if (confirmedUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumberToAdd };
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person
            ));
            setSuccessMessage(`Updated ${newNameToAdd}`)
            setTimeout(() => {setSuccessMessage(null)}, 5000)
            setNewName('');
            setNewNumber('');
            setNewFilter('');
          })
          .catch((error) => {
            console.error('Error updating person: ', error);
            setErrorMessage(`Error updating ${newNameToAdd}`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          });
      }
    } else {
      const personNew = {
        name: newNameToAdd,
        number: newNumberToAdd,
        id: uuid(),
      };

      personService
        .create(personNew)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${newNameToAdd}`)
          setTimeout(() => {setSuccessMessage(null)}, 5000)
          setNewName('');
          setNewNumber('');
          setNewFilter('');
        })
        .catch((error) => {
          console.error('Error adding person: ', error);
          setErrorMessage(`Error adding person`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        });
    }
  };


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
    const confirmedDelete = window.confirm("Are you sure you want to delete this person?");
    
    if (confirmedDelete) {
      personService
        .deleteThisPerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted ${persons.find(person => person.id === id)?.name}`);
          setTimeout(() => {setSuccessMessage(null)}, 5000)
        })
        .catch((error) => {
          console.error('Error deleting person: ', error);
          setErrorMessage(`Error deleting person`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
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
      {(successMessage) ? <Success message={successMessage} /> : ''}
      {(errorMessage ) ? <Error message={errorMessage} /> : ''}
      <Filter value={newFilter} onChange={handleFilterChange} />
      <div>
        <h3>Add a new</h3>
      <PersonForm
          onSubmit={addPerson}
          newName={newName}
          newNumber={newNumber}
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
          errorMessageName={errorMessageName}
          errorMessageNumber={errorMessageNumber}
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