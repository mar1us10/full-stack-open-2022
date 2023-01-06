const Country = ({ country, handleSelected }) => {
  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => handleSelected(country)}>show</button>
    </div>
  );
};

export default Country;
