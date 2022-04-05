import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackSearchResult from "./TrackSearchResult";

export default function PlayListTracks({
  spotifyApi,
  setPlayingTrack,
  currentPlayListName,
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
    <div>
      {tracks.length === 0 ? (
        <div>
          <h1>{currentPlayListName}</h1>
          <h1>No Tracks</h1>
        </div>
      ) : (
        <div>
          <h1>{currentPlayListName}</h1>
          {tracks.map((track) => {
            return (
              <div>
                <div></div>
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
