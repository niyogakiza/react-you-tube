import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";
import SearchBar from "./components/SearchBar";
import VideoDetails from "./components/VideoDetails";
import VideoList from "./components/VideoList";

import "./styles.css";

import youtube from "./Api/index";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetails video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function handleSubmit(searchTerm) {
    const {
      data: { items: videos }
    } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: process.env.REACT_APP_API_KEY,
        q: searchTerm
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
