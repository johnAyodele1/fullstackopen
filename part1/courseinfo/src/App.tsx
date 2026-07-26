const App = () => {
   const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const total = parts[0].exercises + parts[0].exercises + parts[0].exercises;
  return (
    <div>
      <Header course={course} />
     <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} part2 = {parts[1].name} exercises2 ={parts[1].exercises}
     part3 = {parts[2].name} exercises3 = {parts[2].exercises}/>
      <Footer total={total}/>
    </div>
  )
}
const Header = ({course}:{course:string})=>{
return (
  <h1>{course}</h1>
)
}
const Footer =({total}:{total:number}) =>{
return (
<p>Number of exercises {total}</p>
)
}

const Content =(props: {part1:string,part2:string,part3:string,exercises1:number,exercises2:number,exercises3:number})=>{
return (
  <>
   
       <Part1  part1 ={props.part1} exercises1={props.exercises1} />
     
     
         <Part2 part2 ={props.part2} exercises2={props.exercises2}  />
     
        <Part3 part3 = {props.part3} exercises3={props.exercises3}  />
    
      </>
)
}
const Part1=({part1, exercises1}: {part1:string, exercises1:number})=>{
return (
 <p>
        {part1} {exercises1}
      </p>
)
}
const Part2=({part2, exercises2}: {part2:string, exercises2:number})=>{
return (
 <p>
        {part2} {exercises2}
      </p>
)
}
const Part3=({part3, exercises3}: {part3:string, exercises3:number})=>{
return (
 <p>
        {part3} {exercises3}
      </p>
)
}
export default App