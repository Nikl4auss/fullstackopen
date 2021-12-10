const Filter = ({filterText, handleFilter}) => {
    return (
        <label htmlFor="filter">
        Filter shown with:
        <input id="filter" value={filterText} onChange={handleFilter} />
      </label>
    )
}

export default Filter