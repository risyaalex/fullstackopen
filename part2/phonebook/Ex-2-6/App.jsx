import { useState } from 'react'
import uuid from 'react-uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personNew = {
      name: newName,
    }
    setPersons(persons.concat(personNew))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
            <ul>
        {persons.map(person =>
          <li key={uuid()}>{person.name}</li>   
        )}
      </ul>
    </div>
  )
}

export default App