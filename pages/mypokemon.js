import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import { capitalizeName, hoverStyle } from "../constants";
import { useAppContext } from "../lib/appContext";

const MyPokemon = () => {
  const { myPoke, setMyPoke } = useAppContext();

  const removePoke = (poke) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete the Pokemon?"
    );

    if (confirmDelete) {
      const removePoke = myPoke.filter((v) => v.nick !== poke.nick);
      setMyPoke(removePoke);
    }
  };

  const MyPokeList = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    span:last-child {
      margin-right: 1rem;
    }
  `;

  const MyButton = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 0.1px solid #919191;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #21386d;

    ${hoverStyle}

    :active {
      background-color: #919191cc;
      color: white;
    }
  `;

  const Empty = styled.div`
    display: flex;
    margin-top: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div:nth-of-type(2) {
      font-weight: bolder;
    }
  `;

  return (
    <Layout>
      {myPoke ? (
        myPoke.map((poke, ndx) => {
          return (
            <MyPokeList key={ndx}>
              <div style={{ width: 75, height: 75, position: "relative" }}>
                <Image
                  src={poke.sprites.front_default}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span>
                {poke.nick} / {capitalizeName(poke.name)}
              </span>
              <span>
                <MyButton onClick={() => removePoke(poke)}>X</MyButton>
              </span>
            </MyPokeList>
          );
        })
      ) : (
        <Empty>
          <div>Nothing here</div>
          <div>
            <Link href="/">
              <a>Start Adding</a>
            </Link>
          </div>
        </Empty>
      )}
    </Layout>
  );
};

export default MyPokemon;
