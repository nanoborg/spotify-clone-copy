const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    // set spotify API node data
    redirectUri: process.env.REACT_APP_BASE_URL,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SECRET,
    refreshToken, // insert refresh token from useAuth
  });

  // call spotify API
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("server / token refresh:", data);
      console.log("server / token refresh response:", res);
      res.json({
        // send JSON object back to useAuth
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("useAuth, refresh token error:", err);
    });
});

// send code request to spotify API for token
app.post("/login", (req, res) => {
  console.log("server code:", req.body.code);
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    // set spotify API node data
    redirectUri: process.env.REACT_APP_BASE_URL,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SECRET,
  });
  // call spotify api grant code
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        // send JSON object back to useAuth with spotify API results
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("server error:", err);
      res.sendStatus(400);
    });
});

app.listen(port);
