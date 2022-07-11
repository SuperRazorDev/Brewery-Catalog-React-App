import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Detail.css";

export default function BreweryDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [brewery, setBrewery] = useState({});

  useEffect(() => {
    fetchBrewery(id);
  }, [id]);

  const fetchBrewery = (id) => {
    fetch(`https://api.openbrewerydb.org/breweries/${id} `)
      .then((response) => response.json())
      .then((data) => {
        setBrewery(data);
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
        setError("Failed to fetch the brewery, please try again");
      });
  };

  return (
    <main>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1>Brewery {id}</h1>
          <p>{brewery.name}</p>
          <p>{brewery.city}</p>
          <p>{brewery.state}</p>
          <p>{brewery.country}</p>
          <p>{brewery.phone}</p>
          {brewery.website_url && (
            <p>
              <a href={brewery.website_url}>View Website</a>
            </p>
          )}
          <Link to="/breweries">Back to Breweries</Link>
        </>
      )}
    </main>
  );
}
