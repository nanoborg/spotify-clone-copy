import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PlayLists({ userPlayLists, setCurrentPlayListName }) {
  const capturePlayList = (name) => {
    setCurrentPlayListName(name);
  };

  return (
    <PlayListWrapper>
      {userPlayLists.map((playList) => {
        return (
          <StyledLink
            to={`/playlist-tracks/${playList.id}`}
            key={playList.id}
            onClick={() => capturePlayList(playList.name)}
          >
            {playList.name}
          </StyledLink>
        );
      })}
    </PlayListWrapper>
  );
}

const PlayListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(179, 179, 179);
  transition: 0.3s;
  &:hover {
    color: white;
  }
`;
