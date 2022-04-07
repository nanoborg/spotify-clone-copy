import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackSearchResult from "./TrackSearchResult";
import styled from "styled-components";
import UserDisplay from "./UserDisplay";
import SearchContent from "./SearchContent";

export default function PlayListTracks({
  spotifyApi,
  setPlayingTrack,
  currentPlayListName,
  userInfo,
}) {
  const [tracks, setTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    spotifyApi.getPlaylist(id).then(
      (data) => {
        setTracks(
          data.body.tracks.items.map(({ track }) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
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
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  }, [id]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <TrackList>
      <UserDisplay userInfo={userInfo} />
      {tracks.length === 0 ? (
        <div>
          <StyledHeader>
            <img
            // aria-hidden="false"
            // draggable="false"
            // loading="eager"
            // src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            // alt="Liked Songs"
            // className="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ"
            // srcset="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 150w, https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 300w"
            // sizes="(min-width: 1280px) 232px, 192px"
            ></img>
            <StyledRightSideHeader>
              <div></div>
              <StyledTitles>
                <StyledLikedH1>{currentPlayListName}</StyledLikedH1>
                <h3 style={{ fontSize: ".6em" }}>{userInfo.name}</h3>
              </StyledTitles>
            </StyledRightSideHeader>
          </StyledHeader>
          <h2>No Music In List... </h2>
          <SearchContent
            setPlayingTrack={setPlayingTrack}
            spotifyApi={spotifyApi}
          />
        </div>
      ) : (
        <div>
          <StyledHeader>
            <img
            // aria-hidden="false"
            // draggable="false"
            // loading="eager"
            // src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            // alt="Liked Songs"
            // className="mMx2LUixlnN_Fu45JpFB CmkY1Ag0tJDfnFXbGgju _EShSNaBK1wUIaZQFJJQ"
            // srcset="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 150w, https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png 300w"
            // sizes="(min-width: 1280px) 232px, 192px"
            ></img>
            <StyledRightSideHeader>
              <div></div>
              <StyledTitles>
                <h3 style={{ fontSize: ".6em" }}></h3>
                <StyledLikedH1>{currentPlayListName}</StyledLikedH1>
                <h3 style={{ fontSize: ".6em" }}>{userInfo.name}</h3>
              </StyledTitles>
            </StyledRightSideHeader>
          </StyledHeader>
          <StyledH1>{currentPlayListName}</StyledH1>
          <StyledTrackBackground>
            {tracks.map((track, index) => {
              return (
                <div key={index}>
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack}
                  />
                </div>
              );
            })}
          </StyledTrackBackground>
        </div>
      )}
    </TrackList>
  );
}

const TrackList = styled.div`
  width: 100vw;
  overflow-y: auto;
  background-color: #c32a30;
  background-image: linear-gradient(180deg, #c32a30 0%, #000000 30%);
`;

const StyledH1 = styled.h1`
  color: white;
`;

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

const StyledTrackBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 1) 30%
  );
`;
