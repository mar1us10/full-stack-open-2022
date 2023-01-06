const SearchInput = ({ search, handleSearch }) => {
  return (
    <div>
      <form>
        <div>
          find countries <input value={search} onChange={handleSearch} />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
