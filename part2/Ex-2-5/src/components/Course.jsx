const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
} 

const Content = ({ parts }) => {
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

export default Course