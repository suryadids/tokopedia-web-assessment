import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { capitalizeName, hoverStyle, poketype } from "../constants";
import { client } from "../graphql/apollo/apolloClient";
import { useAppContext } from "../lib/appContext";
import Animate from "./animate";

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          moves {
            move {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }
    `,
    variables: {
      name: context.query.name,
    },
  });

  return {
    props: {
      pokemon: data.pokemon,
    },
  };
}

const PokeMovesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  &::after {
    content: "";
  }

  p {
    margin: 4px;
    border: 0.1px solid gray;
    border-radius: 5px;
    text-align: center;
    flex: 0 1 calc(50% - 8px);
  }
`;

const PokeTypes = styled.div`
  padding: 2px;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 500;
  font-size: 11px;
  text-align: center;
  text-transform: capitalize;
  width: 80px;
  border-radius: 20px;
  border: 2px solid white;
`;

const FlexContainer = styled.div((props) => ({
  position: "relative",
  display: "flex",
  flexDirection: props.flexDirection || "row",
  flexWrap: props.flexWrap && "wrap",
  justifyContent: props.justifyContent && "center",
  alignItems: props.alignItems && "center",
  backgroundColor: props.backgroundColor && props.backgroundColor,
  borderRadius: props.borderRadius && props.borderRadius,
}));

const PokeDetails = styled.div`
  display: flex;
  width: 100%;
  font-weight: bold;
  justify-content: space-between;
  padding: 1rem;

  span {
    color: #21386d;
  }

  span:nth-of-type(2) {
    color: #919191;
  }
`;

const Detail = ({ pokemon }) => {
  const [isCatching, setIsCatching] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [skip, setSkip] = useState(false);
  const [name] = useState(capitalizeName(pokemon.name));
  const [owned, setOwned] = useState(false);

  const { myPoke, setMyPoke } = useAppContext();

  const getPokemonTypes = () => {
    const types = pokemon.types.map((v) => ({ type: v.type.name }));
    const typeColor = types.map((v) => {
      const isMatch = poketype.findIndex((e) => e.type === v.type);
      if (isMatch !== -1) {
        return poketype[isMatch];
      }
    });

    return typeColor;
  };

  const formatMove = (move) => {
    let split = move.split("-");

    if (split.length < 2)
      split = split[0].charAt(0).toUpperCase() + split[0].slice(1);
    else
      split =
        split[0].charAt(0).toUpperCase() +
        split[0].slice(1) +
        " " +
        split[1].charAt(0).toUpperCase() +
        split[1].slice(1);

    return split;
  };

  const catchPokemon = () => {
    if (!isCatching) {
      const chance = Math.random();
      setIsCatching(true);

      // success
      if (chance > 0.5) {
        console.log("caught");
        setIsCaught(true);
      }
    } else {
      console.log("skip pressed");
      setIsCatching(false);
      setSkip(true);
    }
  };

  const OwnedLabel = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    padding: 5px;
    font-size: 9px;
    border-radius: 5px;
    font-weight: bold;
    background-color: white;
  `;

  const CatchButton = styled.div`
    position: absolute;
    bottom: 15%;
    right: 5%;
    z-index: 100px;
    margin: 5px;
    padding: 5px;
    border: 2px solid grey;
    border-radius: 5px;
    width: 100px;
    text-align: center;
    font-weight: bold;

    :active {
      ${(props) => ({
        backgroundColor: props.color,
        color: "white",
      })}
    }

    ${hoverStyle}
  `;

  useEffect(() => {
    const hasPoke = myPoke.findIndex((poke) => poke.id === pokemon.id);
    if (hasPoke !== -1) {
      setOwned(true);
    }
  }, []);

  return (
    <Layout>
      <FlexContainer
        justifyContent
        alignItems
        flexDirection="column"
        backgroundColor={`${getPokemonTypes()[0].color}CC`}
      >
        <Animate
          pokemon={pokemon}
          image={pokemon.sprites.front_default}
          isCaught={isCaught}
          setIsCaught={setIsCaught}
          isCatching={isCatching}
          setIsCatching={setIsCatching}
          skip={skip}
          setSkip={setSkip}
          name={name}
        />
        {owned && <OwnedLabel>OWNED</OwnedLabel>}
      </FlexContainer>
      <FlexContainer justifyContent alignItems flexDirection="column">
        <PokeDetails>
          <span>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
          <span>#{pokemon.id.toString().padStart(4, "0")}</span>
        </PokeDetails>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "0 1rem",
          }}
        >
          {getPokemonTypes().map((v) => (
            <PokeTypes key={v.type} color={v.color}>
              {v.type}
            </PokeTypes>
          ))}
        </div>
        <PokeMovesContainer>
          {pokemon.moves.slice(0, 8).map((move, ndx) => (
            <p key={ndx}>{formatMove(move.move.name)}</p>
          ))}
        </PokeMovesContainer>
      </FlexContainer>
      <CatchButton
        onClick={(e) => catchPokemon(e)}
        color={getPokemonTypes()[0].color}
      >
        {isCatching ? "Skip" : "Catch"}
      </CatchButton>
    </Layout>
  );
};

export default Detail;
