import CountryData from "./CountryData";
import CountryList from "./CountryList";

const Countries = ({ countries, search, selected, handleSelected }) => {
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  if (filteredCountries.length > 10) {
    return "Too many matches, specify another filter";
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryData country={filteredCountries[0]} />
      </div>
    );
  } else if (selected.length !== 0) {
    return (
      <div>
        <CountryData country={selected} />
      </div>
    );
  } else {
    return (
      <div>
        <CountryList list={filteredCountries} handleSelected={handleSelected} />
      </div>
    );
  }
};

export default Countries;
