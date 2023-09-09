import { useState } from 'react'
import uuid from 'react-uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-111-111', id: '1212121212' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
            <ul>
        {persons.map(person =>
          <li key={person.id}>{person.name}: {person.number}</li>   
        )}
      </ul>
    </div>
  )
}

export default App