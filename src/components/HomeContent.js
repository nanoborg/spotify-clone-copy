import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function HomeContent() {
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
    <div>
      <StyledH1>HomeContent</StyledH1>
    </div>
  );
}

const StyledH1 = styled.h1`
  color: white;
`;
