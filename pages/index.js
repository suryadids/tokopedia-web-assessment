import { gql } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
import { client } from "../graphql/apollo/apolloClient";

const POKEMON_QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      nextOffset
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: POKEMON_QUERY,
    variables: {
      limit: 21,
      offset: 0,
    },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}

export const PokemonList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: "";
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const PokemonListItem = styled.div`
  margin: 4px;
  border-radius: 10px;
  flex: 0 1 calc(18% - 8px);
  height: 150px;
  background-color: white;
  text-align: center;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    flex: 0 1 calc(33% - 8px);
    width: 50%;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    color: #21386d;
  }

  span:nth-of-type(2) {
    font-weight: 400;
    font-size: 10px;
    color: #919191;
  }
`;

export const PokemonDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Home({ pokemons }) {
  return (
    <Layout>
      <PokemonList>
        {pokemons.results.map((pokemon, ndx) => {
          return (
            <Link
              key={ndx}
              href={{ pathname: "/detail", query: { name: pokemon.name } }}
            >
              <PokemonListItem key={ndx}>
                <a>
                  <Image src={pokemon.image} width={100} height={100} />
                </a>
                <PokemonDesc>
                  <span>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </span>
                  <span>#{pokemon.id.toString().padStart(4, "0")}</span>
                </PokemonDesc>
              </PokemonListItem>
            </Link>
          );
        })}
      </PokemonList>
    </Layout>
  );
}
