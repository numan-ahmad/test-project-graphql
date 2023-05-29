import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "../graphQL/getAllPokemon";
import { useNavigate } from "react-router-dom";
import "../styles/pokemonStyles.css";

function PokemonList() {
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const pageSize = 10;
  const { loading, data, refetch } = useQuery(GET_ALL_POKEMONS, {
    variables: {
      offset: (page - 1) * pageSize,
      take: pageSize,
    },
  });

  useEffect(() => {
    if (data && data.getAllPokemon) {
      const filteredResults = searchVal
        ? data.getAllPokemon.filter((pokemon) =>
            pokemon.species.toLowerCase().includes(searchVal.toLowerCase())
          )
        : data.getAllPokemon;

      setFilteredData(filteredResults);
    }
  }, [data]);

  const nextPage = () => {
    setPage(page + 1);
    refetch({
      offset: page * pageSize,
      take: pageSize,
    });
  };

  const previousPage = () => {
    setPage(page - 1);
    refetch({
      offset: (page - 2) * pageSize,
      take: pageSize,
    });
  };

  const rowClick = (pokemon) => {
    navigate("/details", { state: { pokemon } });
  };

  const searchResult = () => {
    if (searchVal) {
      const filteredResults = data.getAllPokemon.filter((pokemon) =>
        pokemon.species.toLowerCase().includes(searchVal.toLowerCase())
      );

      setFilteredData(filteredResults);
    } else {
      setFilteredData(data.getAllPokemon);
    }
  };

  const onClearSearch = () => {
    if (searchVal) {
      setSearchVal("");
      setFilteredData(data.getAllPokemon);
    }
  };

  return (
    <div>
      <h2 className="text-center">Pokemon List</h2>
      <div className="d-flex ms-5">
        <div class="search-input">
          <input
            type="text"
            disabled = {loading}
            placeholder="Search by Title"
            className="form-control me-2"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            value={searchVal}
          />
          {searchVal && (
            <span
              onClick={onClearSearch}
              className="clear-icon"
            >
              &times;
            </span>
          )}
        </div>
        <button className="btn btn-outline-secondary" onClick={searchResult} disabled = {loading}>
          Search
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center text-center m-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped table-hover m-3">
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Weight</th>
              <th>Forme</th>
              <th>Color</th>
              <th>Key</th>
              <th>Image Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pokemon, index) => (
              <tr
                className="cursor-pointer"
                key={index}
              >
                <td>{pokemon.num}</td>
                <td>{pokemon.species}</td>
                <td>{pokemon.weight}</td>
                <td>{pokemon.forme}</td>
                <td>{pokemon.color}</td>
                <td>{pokemon.key}</td>
                <td>
                  <a
                    href={pokemon.sprite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pokemon.sprite}
                  </a>
                </td>
                <td><button class="btn btn-link" onClick={() => rowClick(pokemon)}>See Detail</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && data.getAllPokemon.length && (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end me-3">
          <button
            className="btn btn-primary"
            type="button"
            disabled={page === 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            type="button"
            disabled={data?.getAllPokemon.length < pageSize}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
