import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GET_POKEMON_DETAILS } from "../graphQL/getPokemon";
import { useQuery } from "@apollo/client";

const Details = () => {
  const location = useLocation();
  const { pokemon } = location.state;
  const { loading, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemon: pokemon.key,
    },
  });

  return (
    <div>
      <h1 className="text-center">Pokemon Details</h1>
      {loading ? (
        <div className="d-flex justify-content-center text-center m-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center m-3">
          {data?.getPokemon && (
            <div className="card detail-container">
              <img src={data.getPokemon.sprite} className="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{data.getPokemon.species}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Number: {data.getPokemon.num}</li>
                <li className="list-group-item">Weight: {data.getPokemon.weight}</li>
                <li className="list-group-item">Height: {data.getPokemon.height}</li>
                <li className="list-group-item">Smogon Tier: {data.getPokemon.smogonTier}</li>
                <li className="list-group-item">Base Stats Total: {data.getPokemon.baseStatsTotal}</li>
                <li className="list-group-item">Color: {data.getPokemon.color}</li>
              </ul>
              <div className="card-body">
                <Link
                  to={data.getPokemon.smogonPage}
                  target="_blank"
                  className="card-link"
                >
                  See Smogon Page
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
