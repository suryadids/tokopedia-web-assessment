import Head from "next/head";
import NavLink from "./nav-link";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/react";
import Image from "next/image";

export const siteTitle = "Tokopedia Web Platform Project Assessment";

const Container = styled.div`
  max-width: 36rem;
  margin: 2rem auto 6rem;

  @media (max-width: 480px) {
    margin: 4rem auto 4rem;
  }
`;

const NavStyle = css`
  background-color: white;
  z-index: 100;

  @media (max-width: 480px) {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;

const TopNavStyle = css`
  ${NavStyle}
  display: none;

  @media (max-width: 480px) {
    display: block;
    top: 0;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Nav = styled.div`
  background-color: white;
  z-index: 100;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0px -5px 5px -5px rgba(0, 0, 0, 0.1);
  }
`;

const TopNav = styled.div`
  ${TopNavStyle}
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px;
  margin-top: 0;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const NavListItem = styled(NavLink)`
  margin: 5px;
  a {
    color: black;
    font-size: 14px;
    font-weight: 600;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Tokopedia Web Platform Project Assessment"
        />
        <title>{siteTitle}</title>
      </Head>
      <TopNav>
        <div
          style={{
            position: "relative",
            width: 80,
            height: 70,
            margin: "auto",
          }}
        >
          <Image
            src="/images/pokemon_logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </TopNav>

      <Nav>
        <NavList>
          <NavListItem href="/" name="Home" />
          <NavListItem href="/mypokemon" name="MyPoke" />
        </NavList>
      </Nav>
      <Container>
        <main suppressHydrationWarning>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
