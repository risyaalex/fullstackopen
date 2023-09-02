const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
} 

const Content = ({ course }) => {
  return (
    <>
      {course.exercises.map((exercise) => (
        <Part key={exercise.key} part={exercise.part} exercise={exercise.exercise} />
      ))}
    </>
  );
}

const Part = ({ part, exercise }) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Total = ({ course }) => {
  return (
    <p>Number of exercises: {course.exercises.reduce((total, exercise) => total + exercise.exercise, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    exercises :
    [
      { key: 1, part: 'Fundamentals of React', exercise: 10, },
      { key: 2, part: 'Using props to pass data', exercise: 7, },
      { key: 3, part: 'State of a component', exercise: 14, },
    ]
  }
 
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App