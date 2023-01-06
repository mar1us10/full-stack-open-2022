import Person from "./Person";

const PersonList = ({ filter, persons, filteredPersons, handleDelete }) => (
  <div>
    {filter === ""
      ? persons?.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))
      : filteredPersons?.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
  </div>
);

export default PersonList;
