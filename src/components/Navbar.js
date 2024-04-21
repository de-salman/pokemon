import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const NavDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  background: #000;
`;

const BottomNav = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  align-items: center;
  background: #79c9fa;
`;

const NavH1 = styled.div`
  font-size: 22px;
  font-family: "PokemonSolid", sans-serif;
  letter-spacing: 0.4rem;
  line-height: 1.5;
  text-align: center;
  font-size: 40px;
  font-weight: 100;
  color: #fbc418;
  text-shadow: 3px 3px 3px #3e6cbd;
`;

const SearchDiv = styled.div`
  margin: 0px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const SearchInput = styled.input`
  background-color: #fff;
  color: rgb(122, 125, 128);
  padding: 15px;
  border-radius: 20px;
  font-size: 18px;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  font-size: 22px;
  margin-left: 10px;
  background-color: #fff;
  border-radius: 50%;
  border: none;
`;

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search) {
      router.push(`/search/${search}`);
    }
  };
  return (
    <>
      <NavDiv>
        <Link href={`/`}>
          <img src="/logo.jpg" height={"75px"} />
        </Link>
        <SearchDiv>
          <SearchInput
            type="text"
            placeholder="Search for a Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchDiv>
      </NavDiv>
      <BottomNav>
        <NavH1>Choose your Pokémon Category</NavH1>
      </BottomNav>
    </>
  );
};

export default Navbar;
