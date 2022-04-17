import * as React from 'react';
import ReactPlayer from "react-player";
import "./Player.css";

const Player = props => (
  <div className="player-wrapper">
    <ReactPlayer
      url={props.url}
      className="react-player"
      playing
      width="100%"
      height="100%"
      controls={true}
      muted={props.muted}
    />
  </div>
);

export default Player;
