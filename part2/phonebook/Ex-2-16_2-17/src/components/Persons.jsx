const Persons = ({persons, deletePerson}) => {
  return (
    <div>
      {(persons.length === 0) ? <div className="error">No results!</div> : persons.map(person =>
        <p key={person.id}>
          {person.name}: {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>   
          )}
        </div>
  )
}

export default Persons