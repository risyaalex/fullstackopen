import Error from "./Error"

const PersonForm = ({ onSubmit, newName, newNumber, handlePersonChange, handleNumberChange, errorMessageName, errorMessageNumber }) => {
  return (
    <form onSubmit={onSubmit}>
          <p>
            Name: <input value={newName} onChange={handlePersonChange}/>
          </p>
          {(errorMessageName ) ? <Error message={errorMessageName} /> : ''}
          <p>
            Number: <input value={newNumber} onChange={handleNumberChange} />
          </p>
          {(errorMessageNumber ) ? <Error message={errorMessageNumber} /> : ''}
          <p>
            <button type="submit">Add new</button>
          </p>
        </form>
  )
}

export default PersonForm