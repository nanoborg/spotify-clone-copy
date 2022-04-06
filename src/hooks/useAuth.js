import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  // send access token request to server
  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code, // pass code through to express to spotify API
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
        console.log("refresh token:", res);
      })
      .catch((error) => {
        console.log("useAuth, token request:", error);
      });
  }, [code]);

  // refresh token 1 minute before expiry
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          // issue redirect to home
          window.location = "/";
        });
      // expires in 3600s - 1s (converted to milliseconds)
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  // return accessToken to Dashboard
  return accessToken;
}
