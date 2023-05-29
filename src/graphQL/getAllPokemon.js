import { gql } from "graphql-tag";

export const GET_ALL_POKEMONS = gql`
  query GetPokemon($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      color
      num
      species
      sprite
      weight
      forme
      color
      key
    }
  }
`;
