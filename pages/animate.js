import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAppContext } from "../lib/appContext";

const Animate = (props) => {
  const pokeballControls = useAnimation();
  const pokemonControls = useAnimation();

  const { myPoke, setMyPoke } = useAppContext();

  const variants = {
    left: {
      rotate: [-10, 10, 0],
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
    right: {
      rotate: [10, -10, 0],
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
    fail: {
      transitionEnd: {
        display: "none",
      },
    },
  };

  const namePokemon = () => {
    let pokeNickname = prompt("Enter Nickname", props.name);

    if (pokeNickname === null || pokeNickname === "") {
      return;
    }

    const samePokeSameNick = myPoke.findIndex(
      (poke) => poke.name === props.pokemon.name && poke.nick === pokeNickname
    );

    if (samePokeSameNick !== -1) {
      pokeNickname = null;
      namePokemon();
    } else {
      setMyPoke([...myPoke, { ...props.pokemon, nick: pokeNickname }]);
    }
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      const sequence = async () => {
        // start catching animation
        if (props.skip) {
          skip();
        }
        if (props.isCatching) {
          pokeballControls.set({ rotate: 0, display: "block", scale: 0.5 });
          pokemonControls.set({ scale: 1, display: "block" });
          await pokemonControls.start({
            scale: 0.1,
            transition: { duration: 1 },
          });
          await pokeballControls.start(variants.left);
          await pokeballControls.start(variants.right);
          await pokeballControls.start(variants.left);
          if (!props.isCaught) {
            // fail animation
            await pokeballControls.start(variants.fail);
            await pokemonControls.start({ scale: 1 });
          } else {
            if (!props.skip) {
              namePokemon();
            }
          }

          props.setIsCatching(false);
          props.setIsCaught(false);
        }
      };

      sequence();
    } else {
      didMount.current = true;
    }
  }, [props.isCatching]);

  const skip = () => {
    pokeballControls.stop();
    pokemonControls.stop();

    if (!props.isCaught) {
      pokeballControls.set(variants.fail);
      pokemonControls.set({ scale: 1 });
    } else {
      pokemonControls.set({ scale: 0.1 });
      namePokemon();
    }

    props.setIsCaught(false);
    props.setSkip(false);
    props.setIsCatching(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          width: 150,
          height: 150,
          borderRadius: 30,
          cursor: "pointer",
        }}
        animate={pokemonControls}
      >
        <Image src={props.image} height={150} width={150} />
      </motion.div>
      <motion.img
        src="/images/pokeball.png"
        style={{
          width: 75,
          height: 75,
          borderRadius: 30,
          position: "absolute",
          display: "none",
          zIndex: 1000,
        }}
        animate={pokeballControls}
      />
    </div>
  );
};

export default Animate;
