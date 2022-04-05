import React, { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

export default function SearchContent({ setPlayingTrack, spotifyApi }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userPlayList, setUserPlayList] = useState([]);

  // Search Tracks & Artists
  useEffect(() => {
    if (!search) return setSearchResults([]);

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
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
    });

    return () => (cancel = true);
  }, [search]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <div>
      <StyledSearchWrapper>
        <StyledSearchIcon />
        <StyledInput
          type="search"
          placeholder="Artists, songs, or podcasts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // {accessToken}
        />
      </StyledSearchWrapper>
      <div className="flex-grow-1 my-2" style={{ overFlowY: "auto" }}>
        songs
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          );
        })}
      </div>
    </div>
  );
}

const StyledSearchWrapper = styled.div`
  display: flex;
  background-color: white;
  border-radius: 25px 25px;
  padding: 0.5em;
  margin: 1em;
`;

const StyledInput = styled.input`
  border: none;
  width: 300px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: black;
`;
