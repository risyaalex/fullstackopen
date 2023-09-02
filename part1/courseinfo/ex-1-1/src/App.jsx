const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
} 

const Content = ({ exercises }) => {
  return (
    <>
      {exercises.map((exercise) => (
        <p key={exercise.key}>
          {exercise.name} ({exercise.exercise})
        </p>
      ))}
    </>
  );
}



const Total = ({ exercises }) => {
  return (
    <p>Number of exercises: {exercises.reduce((total, exercise) => total + exercise.exercise, 0)}</p>
  )
}


const App = () => {
  const course = {
    name: "Half Stack application development",
    exercises :
    [
      { key: 1, name: 'Fundamentals of React', exercise: 10, },
      { key: 2, name: 'Using props to pass data', exercise: 7, },
      { key: 3, name: 'State of a component', exercise: 14, },
    ]
  }
 
  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.exercises} />
      <Total exercises={course.exercises} />
    </div>
  )
}

export default App