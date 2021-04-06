import { css } from "@emotion/react";

export const pokeapi = "https://graphql-pokeapi.vercel.app/api/graphql";
export const isServer = typeof window === "undefined";

export const colors = {
  primary: "#21386d",
  secondary: "#919191",
};

export const hoverStyle = css`
  :hover {
    cursor: pointer;
  }
`;

export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const poketype = [
  {
    type: "fire",
    color: "#fa5743",
  },
  {
    type: "normal",
    color: "#bcbbaf",
  },
  {
    type: "poison",
    color: "#ab5ea2",
  },
  {
    type: "psychic",
    color: "#fa66b4",
  },
  {
    type: "grass",
    color: "#8bd44f",
  },
  {
    type: "ground",
    color: "#efcd57",
  },
  {
    type: "ice",
    color: "#95f3ff",
  },
  {
    type: "rock",
    color: "#cdbd72",
  },
  {
    type: "dragon",
    color: "#8875ff",
  },
  {
    type: "water",
    color: "#56aefe",
  },
  {
    type: "bug",
    color: "#c3d31e",
  },
  {
    type: "dark",
    color: "#8c6854",
  },
  {
    type: "fighting",
    color: "#a75644",
  },
  {
    type: "ghost",
    color: "#7774d4",
  },
  {
    type: "steel",
    color: "#c4c2db",
  },
  {
    type: "flying",
    color: "#79a4fe",
  },
  {
    type: "electric",
    color: "#fee238",
  },
  {
    type: "fairy",
    color: "#f9adff",
  },
  {
    type: "unknown",
    color: "#69a190",
  },
  {
    type: "shadown",
    color: "#69a190",
  },
];
