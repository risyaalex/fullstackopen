const Persons = ({persons, deletePerson}) => {
  return (
    <div>
      {(persons.length === 0) ? <p>No results!</p> : persons.map(person =>
        <p key={person.id}>
          {person.name}: {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
        </p>   
          )}
        </div>
  )
}

export default Persons