import React from "react";
import styled from "styled-components";

export default function UserDisplay({ userInfo }) {
  return (
    <UserBanner>
      <UserInfo>
        <StyledUserImage src={userInfo.image} alt="" />
        <UserName>{userInfo.name}</UserName>
      </UserInfo>
    </UserBanner>
  );
}

const UserBanner = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1.5em;
  padding-top: 1.5em;
`;

const UserInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 166px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 25px;
  padding: 0.3em;
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
