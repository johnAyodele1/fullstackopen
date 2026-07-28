export type Part = {
  id: number;
  name: string;
  exercises: number;
};

const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }: { part: Part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Content;