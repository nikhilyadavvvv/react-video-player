import React, { useEffect, useState } from "react";
import video from "../../utils/assets/video1.mp4";
import video2 from "../../utils/assets/video2.mp4";
const VideoControls = ({
  totalTime,
  currentTime,
  mediaClickHandler,
  videoState,
  videoRef,
  screenModeHandler,
  changeMediaStream,
  fullScreen,
}) => {
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [min_t, setMin_t] = useState("");
  const [sec_t, setSec_t] = useState("");

  useEffect(() => {
    const current_time_f = formattedTime(currentTime);
    setMin(current_time_f["m"]);
    setSec(current_time_f["s"]);

    const total_time_f = formattedTime(totalTime);
    setMin_t(total_time_f["m"]);
    setSec_t(total_time_f["s"]);
  }, [currentTime]);

  useEffect(() => {
    document.getElementById("deButton").classList.add("btn-primary");
  }, []);

  const formattedTime = (time) => {
    var s = parseInt(time % 60);
    s = s.toString().length === 1 ? "0" + s : s;
    var m = parseInt((time / 60) % 60);
    m = m.toString().length === 1 ? "0" + m : m;
    return { s, m };
  };

  const toggleLangButtonStyle = (id) => {
    document.getElementById("deButton").classList.remove("btn-primary");
    document.getElementById("deButton").classList.add("btn-outline-primary");
    document.getElementById("enButton").classList.remove("btn-primary");
    document.getElementById("enButton").classList.add("btn-outline-primary");
    if (id === "deButton") {
      document.getElementById(id).classList.remove("btn-outline-primary");
      document.getElementById(id).classList.add("btn-primary");
      return;
    }
    document.getElementById(id).classList.remove("btn-outline-primary");
    document.getElementById(id).classList.add("btn-primary");
  };

  return (
    <div className="d-flex" style={{ marginBottom: 5, marginTop:10 }}>
      <button onClick={mediaClickHandler} id="mediaButton" style={mediaButton}>
        {videoState ? (
          <i className="fa fa-pause"></i>
        ) : (
          <i className="fa fa-play"></i>
        )}
      </button>

      <button
        id={"deButton"}
        className="btn"
        style={{ marginLeft: 5, border: 0 }}
        onClick={() => {
          changeMediaStream(video);
          toggleLangButtonStyle("deButton");
        }}
      >
        DE
      </button>
      <button
        id={"enButton"}
        className="btn btn-outline-primary"
        style={{ marginLeft: 5, border: 0 }}
        onClick={() => {
          changeMediaStream(video2);
          toggleLangButtonStyle("enButton");
        }}
      >
        EN
      </button>

      <input
        id="seekbar"
        style={seekbar}
        type="range"
        min="0"
        max="100"
        value={currentTime}
        onInput={(e) => {
          videoRef.current.currentTime = e.target.value;
        }}
      ></input>
      <span style={{ margin: "auto", color: "white", marginLeft: 5 }}>
        {min + ":" + sec}/{isNaN(totalTime) ? "" : min_t + ":" + sec_t}
      </span>

      <button
        onClick={screenModeHandler}
        className="btn"
        style={{ color: "#1e4e9b", border: "1px solid white", marginLeft: 5 }}
      >
        {fullScreen ? (
          <i class="fa fa-compress"></i>
        ) : (
          <i className="fa fa-expand"></i>
        )}
      </button>
    </div>
  );
};

const mediaButton = {
  backgroundColor: "transparent",
  borderColor: "#1e4e9b",
  color: "#1e4e9b",
  border: "1px solid white",
  borderRadius: "60px",
  height: "40px",
  width: "40px",
  fontSize: 10,
};

const seekbar = {
  display: "none",
  width: "80%",
  margin: "auto",
  marginLeft: 5,
  background:
    "linear-gradient(to right, #1e4e9b 0%, #1e4e9b 50%, #fff 50%, #fff 100%)",
  border: "solid 1px #1e4e9b",
  borderRadius: "8px",
  height: "7px",
  outline: "none",
  transition: "background 450ms ease-in",
  "-webkit-appearance": "none",
};

export default VideoControls;
