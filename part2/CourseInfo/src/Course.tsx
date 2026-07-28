import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

 type Part = {
  id: number;
  name: string;
  exercises: number;
};
type CourseProps = {
  course: {
    name: string;
    parts: Part[];
  };
};

const Course = ({ course }: CourseProps) => {
  const total = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer total={total} />
    </div>
  );
};

export default Course;