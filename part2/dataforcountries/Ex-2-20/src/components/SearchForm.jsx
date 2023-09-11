const SearchForm = ({value, inputChange}) => {
  return (
      <div>Find countries: <input value={value} onChange={inputChange} /></div>
  )
}

export default SearchForm