import Weather from "./Weather";

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area} km²</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        style={{ maxHeight: 150 }}
        alt={`Flag of ${country.name.common}`}
        src={country.flags.svg}
      />
      <Weather capital={country.capital} />
    </div>
  );
};

export default CountryData;
