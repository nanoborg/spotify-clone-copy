import React, { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import styled from "styled-components";
import UserDisplay from "./UserDisplay";

export default function LikedTracks({ spotifyApi, setPlayingTrack, userInfo }) {
  const [likedTracks, setLikedTracks] = useState([]);

  // Get liked tracks
  useEffect(() => {
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 1,
      })
      .then(
        function (data) {
          setLikedTracks(
            data.body.items.map(({ track }) => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (smallest.height < image.height) return image;
                  return smallest;
                },
                track.album.images[0]
              );

              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          );
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <RootDisplay>
      <UserDisplay userInfo={userInfo} />
      <StyledHeader>
        <img
          aria-hidden="false"
          draggable="false"
          loading="eager"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          className="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ"
          srcset="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 150w, https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 300w"
          sizes="(min-width: 1280px) 232px, 192px"
          style={{ boxShadow: "0 4px 60px rgb(0 0 0 / 50%)" }}
        ></img>
        <StyledRightSideHeader>
          <div></div>
          <StyledTitles>
            <h3 style={{ fontSize: ".6em" }}>PLAYLIST</h3>
            <StyledLikedH1>Liked Songs</StyledLikedH1>
            <h3 style={{ fontSize: ".6em" }}>{userInfo.name}</h3>
          </StyledTitles>
        </StyledRightSideHeader>
      </StyledHeader>

      <StyledTrackBackground>
        {likedTracks.map((track) => {
          return (
            <TrackSearchResult
              key={track.uri}
              track={track}
              chooseTrack={chooseTrack}
            />
          );
        })}
      </StyledTrackBackground>
    </RootDisplay>
  );
}

const StyledHeader = styled.header`
  display: flex;
  height: 300px;
  padding: 1em;
`;

const StyledRightSideHeader = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-column: 1fr;
  width: 100%;
`;

const StyledTitles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1em;
  box-sizing: border-box;
`;

const StyledLikedH1 = styled.h1`
  font-size: 96px;
  line-height: 96px;
  color: white;
  font-weight: 800;
`;

const RootDisplay = styled.div`
  width: 100vw;
  background-color: #4f389a;
  background-image: linear-gradient(180deg, #4f389a 0%, #291e51 94%);

  overflow-y: auto;
`;

const StyledTrackBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 1) 30%
  );
`;

const StyledImage = styled.div`
  // box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
`;
