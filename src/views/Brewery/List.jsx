import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./List.css";

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState("ascending");

  const fetchBreweries = (query) => {
    fetch(
      query
        ? ` https://api.openbrewerydb.org/breweries/search?query=${query}&per_page=10`
        : `https://api.openbrewerydb.org/breweries?per_page=10`
    )
      .then((response) => response.json())
      .then((data) => {
        data.sort(
          (a, b) =>
            (sorting === "ascending" ? 1 : -1) * a.name.localeCompare(b.name)
        );
        setBreweries(data);
      });
  };

  useEffect(() => {
    fetchBreweries("");
  }, []);

  useEffect(() => {
    sortBreweries();
  }, [sorting]);

  const sortBreweries = () => {
    const sortedbreweries = [...breweries].sort(
      (a, b) =>
        (sorting === "ascending" ? 1 : -1) * a.name.localeCompare(b.name)
    );
    setBreweries(sortedbreweries);
  };

  const onReset = () => {
    setQuery("");
    fetchBreweries("");
  };

  const onSearch = () => {
    fetchBreweries(query);
  };

  const toggleSorting = () => {
    setSorting(sorting === "ascending" ? "descending" : "ascending");
  };

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Find a brewery"
        />
        <button onClick={onSearch}>Search</button>
        <button onClick={onReset}>Reset</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              <button type="button" className={sorting} onClick={toggleSorting}>
                Name
              </button>
            </th>
            <th>
              <button type="button">City</button>
            </th>
            <th>
              <button type="button">State</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((brewery, index) => (
            <tr key={brewery.id}>
              <td>
                <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
              </td>
              <td>{brewery.city}</td>
              <td>{brewery.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
    </main>
  );
}
