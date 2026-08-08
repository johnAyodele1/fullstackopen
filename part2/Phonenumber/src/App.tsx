import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService, { type Person } from "./services/persons";
import styles from './app.module.css'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<
    | { message: string; type: "success" | "error" }
    | null
  >(null);
  const handleAddPerson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) {
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingPerson) {
      const shouldUpdate = window.confirm(
        `${trimmedName} is already added to phonebook. Replace the old number with the new one?`
      );

      if (!shouldUpdate) {
        return;
      }

      try {
        const updatedPerson = await personService.update(existingPerson.id, {
          name: trimmedName,
          number: trimmedNumber,
        });

        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          )
        );
        setNewName("");
        setNewNumber("");
        setNotification({ message: `${trimmedName}'s number was updated`, type: "success" });
        setTimeout(() => setNotification(null), 5000);
      } catch (error) {
        const err = error as any;
        if (err?.response?.status === 404) {
          setPersons((prev) => prev.filter((p) => p.id !== existingPerson.id));
          setNotification({ message: `Information of ${trimmedName} has already been removed from server`, type: "error" });
        } else {
          setNotification({ message: `Failed to update ${trimmedName}`, type: "error" });
        }
        setTimeout(() => setNotification(null), 5000);
      }
      return;
    }

    try {
      const newPerson = await personService.create({
        name: trimmedName,
        number: trimmedNumber,
      });

      setPersons((prevPersons) => prevPersons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      setNotification({ message: `${trimmedName} added to phonebook`, type: "success" });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({ message: `Failed to add ${trimmedName}`, type: "error" });
      setTimeout(() => setNotification(null), 5000);
    }
  };
  const handleDeletePerson = async (person: Person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (!shouldDelete) {
      return;
    }

    try {
      await personService.remove(person.id);
      setPersons((prevPersons) =>
        prevPersons.filter((currentPerson) => currentPerson.id !== person.id)
      );
      setNotification({ message: `${person.name} removed from phonebook`, type: "success" });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({ message: `Failed to delete ${person.name}`, type: "error" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const fetchedPersons = await personService.getAll();
        setPersons(fetchedPersons);
      } catch (error) {
        setNotification({ message: "Failed to fetch persons from the server", type: "error" });
        setTimeout(() => setNotification(null), 5000);
      }
    };

    void fetchPersons();
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchTerm} onChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAddPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
      {notification && (
        <div className={`${styles.notification} ${notification.type === "success" ? styles.success : styles.error}`}>
          {notification.message}
        </div>
      )}

    </div>
  );
};

export default App;
