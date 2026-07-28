import Content from "./Content";
import Header from "./Header";



type Course = {
  id: number;
  name: string;
  parts: Part[];
};

const App = () => {
  const course: Course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  const total = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
    
    </div>
  );
};







export default App;