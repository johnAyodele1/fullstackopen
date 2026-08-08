import type { Person } from "./services/persons";

type PersonsProps = {
  persons: Person[];
  onDelete: (person: Person) => void;
};

const Persons = ({ persons, onDelete }: PersonsProps) => (
  <div>
    {persons.map((person) => (
      <div key={person.id}>
        <span>
          {person.name} {person.number}
        </span>{" "}
        <button type="button" onClick={() => onDelete(person)}>
          delete
        </button>
      </div>
    ))}
  </div>
);

export default Persons;
