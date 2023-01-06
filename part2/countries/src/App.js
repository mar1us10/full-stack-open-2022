import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSelected([]);
  };

  const handleSelected = (country) => {
    setSelected(country);
  };

  return (
    <div>
      <SearchInput search={search} handleSearch={handleSearch} />
      <Countries
        countries={countries}
        search={search}
        selected={selected}
        handleSelected={handleSelected}
      />
    </div>
  );
};

export default App;
