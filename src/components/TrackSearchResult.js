import React from "react";
import styled from "styled-components";

export default function TrackSearchResult({ track, chooseTrack }) {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <TrackWrapper onClick={handlePlay}>
      <img
        src={track.albumUrl}
        style={{ height: "32px", width: "32px", margin: ".5em" }}
        alt=""
      />
      <div className="m1-3">
        <div style={{ color: "white" }}>{track.title}</div>
        <TrackArtist>{track.artist}</TrackArtist>
      </div>
    </TrackWrapper>
  );
}

const TrackArtist = styled.div``;

const TrackWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(42, 42, 42, 0.8);
  }
  &:hover ${TrackArtist} {
    color: white;
  }
`;
