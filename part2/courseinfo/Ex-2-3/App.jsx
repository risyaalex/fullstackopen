const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
} 

const Content = ({parts}) => {
  return (
  <div>
    {parts.map((part) => (
         < Part part={ part.name } exercises={ part.exercises } key={part.id} />
      ))
      }
  </div>
  )
}

const Part = ({part, exercises}) => {
  return (
      <p>
        {part} {exercises}
      </p>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce((totalSum, part) => totalSum + part.exercises, 0);
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  )

}

const App = () => {
   const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
      ,
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App
