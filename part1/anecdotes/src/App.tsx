import { useState } from 'react'


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [count, setCount] = useState(0);
 const [userVote, setUserVote] = useState<Record<number, number>>(() => {
    const initialVotes: Record<number, number> = {};
    for (let i = 0; i < anecdotes.length; i++) {
      initialVotes[i] = 0;
    }
    return initialVotes;
  });
  const handleClick = ()=>{
    let newC = count +1 ;
    if(newC > anecdotes.length -1){
      newC =0;
    }
    setCount(newC);
  }
  const handleVote = (n:number) =>{
    setUserVote({...userVote,  [n]:(userVote[n] || 0)+1})
  }
  const highestVotedIndex = Object.keys(userVote).reduce((highest, current) => {
  return userVote[Number(current)] > userVote[highest]
    ? Number(current)
    : highest;
}, 0);
  return (
    <>
    <div>
     <p> {anecdotes[count]} has {userVote[count]} votes</p>
      <button onClick={()=> handleVote(count)}>vote</button>
      <button onClick={handleClick}>next anecdotes</button>
    </div>
    <div>
<h1>Anecdote with most votes</h1>

<p>
  {anecdotes[highestVotedIndex]}
</p>

<p>
  has {userVote[highestVotedIndex]} votes
</p>    </div>
    </>
  )
}

export default App
