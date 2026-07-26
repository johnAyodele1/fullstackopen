import { useState } from "react"


function App() {
  const [good, setGood] = useState<number>(0);
  const [neutral , setNeutral] = useState<number>(0)
  const [bad, setBad]= useState<number>(0);
  const total = bad + good + neutral;
  const handleClick = (type:'good'| 'bad' |'neutral') =>{
    switch (type){
      case 'good':
        const newGood = good +1
        setGood(newGood);
        break;
        case 'neutral':
          const newNeutral = neutral +1;
          setNeutral(newNeutral);
          break;
          case 'bad':
            const newBad = bad +1;
            setBad(newBad);
            break;
    }
  }
  return (
   <>
    <div>
       <h1>give feedback</h1>
       <div>
        <button onClick={() => handleClick('good')}>good</button>
          <button onClick={() => handleClick('neutral')}>neutral</button>
            <button onClick={() => handleClick('bad')}>bad</button>
       </div>
       <div>
        <h2>statistics</h2>
       { total?  
        <div>
        <p>good {good}</p>
         <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          </div> : <>no feedback given</>}
       </div>
    </div>
   

    </>
  )
}

export default App
