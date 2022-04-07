import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserDisplay from "./UserDisplay";
import { Link } from "react-router-dom";

export default function HomeContent({ userInfo, setActiveIcon }) {
  useEffect(() => {
    // get genre
    // useEffect(() => {
    //   if (!accessToken) return;
    //   spotifyApi.getAvailableGenreSeeds().then(
    //     (data) => {
    //       let genreSeeds = data.body;
    //       console.log(genreSeeds);
    //     },
    //     (err) => {
    //       console.log("Something went wrong!", err);
    //     }
    //   );
    // });
  }, []);

  return (
    <StyledHomePage>
      <UserDisplay userInfo={userInfo} />
      <StyledH1>Uniquely yours</StyledH1>
      <Link to="/collection" onClick={() => setActiveIcon("liked")}>
        <img
          aria-hidden="false"
          draggable="false"
          loading="eager"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          className="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ"
          srcset="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 150w, https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 300w"
          sizes="(min-width: 1280px) 100px, 100px"
          style={{ boxShadow: "0 4px 60px rgb(0 0 0 / 50%)" }}
        ></img>
      </Link>
    </StyledHomePage>
  );
}

const StyledH1 = styled.h1`
  color: white;
`;

const StyledHomePage = styled.div`
  width: 100vw;
`;
