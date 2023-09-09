const PersonForm = ({ onSubmit, newName, newNumber, handlePersonChange, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
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
  )
}

export default PersonForm