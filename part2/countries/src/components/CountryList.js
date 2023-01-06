import Country from "./Country";

const CountryList = ({ list, handleSelected }) => {
  return (
    <div>
      {list.map((country) => (
        <Country
          key={country.name.official}
          country={country}
          handleSelected={handleSelected}
        />
      ))}
    </div>
  );
};

export default CountryList;
