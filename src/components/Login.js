import React from "react";
import * as S from "../styles/Login.styles";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${baseUrl}/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private&show_dialog=true`;

export default function Login() {
  return (
    <S.LoginPage>
      <S.StyledImage
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      ></S.StyledImage>
      {console.log("base_url:", process.env.REACT_APP_BASE_URL)}
      <S.StyledA href={AUTH_URL}>LOGIN TO SPOTIFY</S.StyledA>
    </S.LoginPage>
  );
}
