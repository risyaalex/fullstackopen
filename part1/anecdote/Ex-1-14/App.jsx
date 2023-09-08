import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
 
const Anecdote = ({text, vote}) => {
  return (
    <div>
      <p>{text}</p>
      <p>This anecdot has {vote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [voteArr, setVoteArr] = useState(Array(anecdotes.length).fill(0))

  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...voteArr]
    copy[selected] += 1
    setVoteArr(copy)
  }

  const bestAnecdotVote = Math.max(...voteArr);
  const indexOfBestAnecdot = voteArr.indexOf(bestAnecdotVote);

  return (
    <div>
      <div>
          <h2>Anecdote of the day: </h2>
          <Anecdote text={anecdotes[selected]} vote={voteArr[selected]} />
          <Button handleClick={handleVote} text="Vote" />
          <Button handleClick={handleRandom} text="Next anecdote" />
      </div>
      <div>
          <h2>Anecdote with most votes: </h2>
          <Anecdote text={anecdotes[indexOfBestAnecdot]} vote={bestAnecdotVote} />
      </div>
    </div>
  )
}

export default App
