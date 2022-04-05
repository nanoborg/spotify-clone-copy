import styled from "styled-components";

export const LoginPage = styled.div`
  display: grid;
  background-color: black;
  height: 100vh;
  place-items: center;
`;

export const StyledA = styled.a`
  color: white;
  text-decoration: none;
  padding: 20px;
  border-radius: 99px;
  font-weight: 700;
  background-color: #1db954;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    color: white;
    transition: 0.5s;
    transform: scale(1.1);
  }
`;

export const StyledImage = styled.img`
  height: 200px;
`;
