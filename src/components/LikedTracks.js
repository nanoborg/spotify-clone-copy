import React, { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import styled from "styled-components";

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
      <UserBanner>
        <UserInfo>
          <StyledUserImage src={userInfo.image} alt="" />
          <UserName>{userInfo.name}</UserName>
        </UserInfo>
      </UserBanner>
      <StyledHeader>
        <img
          aria-hidden="false"
          draggable="false"
          loading="eager"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Liked Songs"
          class="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ"
          srcset="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 150w, https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 300w"
          sizes="(min-width: 1280px) 232px, 192px"
        ></img>
        <StyledRightSideHeader>
          <div></div>
          <StyledTitles>
            <h3 style={{ fontSize: ".6em" }}>PLAYLIST</h3>
            <StyledLikedH1>Liked Songs</StyledLikedH1>
            <h3 style={{ fontSize: ".6em" }}>User Info</h3>
          </StyledTitles>
        </StyledRightSideHeader>
      </StyledHeader>

      {likedTracks.map((track) => {
        return (
          <TrackSearchResult
            key={track.uri}
            track={track}
            chooseTrack={chooseTrack}
          />
        );
      })}
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

const UserBanner = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 166px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 25px;
`;

const RootDisplay = styled.div`
  width: 100%;
  background-color: #c32a30;
  background-image: linear-gradient(180deg, #c32a30 0%, #000000 30%);
`;

const StyledUserImage = styled.img`
margin: 0
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 0.8rem;
  margin: 0;
`;
