import React, { useEffect, useState } from "react";
import AppBar from "../../utils/components/AppBar/AppBar";
import Layout from "../../utils/components/Layout/Layout";
import VideoPlayer from "./VideoPlayer";
import video from "../../utils/assets/video1.mp4";
import video2 from "../../utils/assets/video2.mp4";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import VideoChapters from "./VideoChapters";
import { chapters } from "./VideoData";
import { useHistory } from "react-router-dom";
const Home = () => {
  const [videoState, setVideoState] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [description, setDescription] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [descriptionTitle, setDescriptionTitle] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [videoSrc, setVideoSrc] = useState(video);
  const [totalTime, setTotalTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [timer, setTimer] = useState(0);
  let history = useHistory();

  useEffect(() => {
    setTotalTime(videoRef.current.duration);
    if (!videoState && currentTime !== 0) {
      getTimeStampDetail();
    }
    console.log(videoState);
  }, [videoState]);

  useEffect(() => {
    if (fullScreen) {
      document.getElementsByTagName("html")[0].style.backgroundColor = "black";
    } else {
      document.getElementsByTagName("html")[0].style.backgroundColor =
        "transparent";
    }
  }, [fullScreen]);

  useEffect(() => {
    if (videoLoaded) {
      let seekbar = document.getElementById("seekbar");
      seekbar.style.display = "block";
      seekbar.max = videoRef.current.duration;
      setTotalTime(videoRef.current.duration);
    }
  }, [videoLoaded]);

  useEffect(() => {
    seekbarChange();
    const chapter = chapters.filter((c) =>
      between(currentTime, getSeconds(c.start), getSeconds(c.end))
    );
    if (chapter) {
      setCurrentChapter(chapter[0]);
    }
  }, [currentTime]);

  const mediaClickHandler = () => {
    if (videoState) {
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = currentTime;
      videoRef.current.play();
    }

    setVideoState(!videoState);
  };

  const screenModeHandler = () => {
    setFullScreen(!fullScreen);
  };

  const getTimeStampDetail = () => {
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const start = getSeconds(chapter.start);
      const end = getSeconds(chapter.end);
      const current = new Date(currentTime).getTime();
      if (between(current, start, end)) {
        setCurrentChapter(chapter);
        setDescriptionTitle(chapter.title);
        setDescription(chapter.description);
        setDescription_en(chapter.description_en);
        return;
      }
    }
  };

  const getSeconds = (time) => {
    var ms = time; // your input string
    var a = ms.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 + +a[1];
    return seconds;
  };

  const changeChapter = (chapter) => {
    videoRef.current.currentTime = getSeconds(chapter.start);
    videoRef.current.play();
    setVideoState(true);
  };

  const seekbarChange = () => {
    var seek = document.getElementById("seekbar");
    var value = ((seek.value - seek.min) / (seek.max - seek.min)) * 100;
    if (!videoState) {
      videoRef.current.currentTime = currentTime;
    }
    seek.style.background =
      "linear-gradient(to right, #1e4e9b 0%, #1e4e9b " +
      value +
      "%, #fff " +
      value +
      "%, white 100%)";
  };

  const changeMediaStream = (src) => {
    const time = currentTime;
    setVideoSrc(src);
    setTimeout(() => {
      videoRef.current.currentTime = time;
      videoRef.current.play();
      setVideoState(true);
    }, 450);
  };

  useEffect(() => {
    let interval = null;
    console.log("timer", timer);
    if (timer > 0 && videoState) {
      setTimer(0);
    }
    if (timer === 90) {
      setCurrentTime(0);
      setTimer(0);
      history.push("/");
      return;
    } else {
      if (currentTime !== 0) {
        if (!videoState) {
          interval = setInterval(() => {
            setTimer((timer) => timer + 1);
          }, 1000);
        } else if (videoState && timer !== 0) {
          clearInterval(interval);
        }
      }
    }

    return () => clearInterval(interval);
  }, [videoState, timer]);

  function between(x, min, max) {
    return x >= min && x <= max;
  }

  return (
    <Layout>
      {/* {fullScreen ? <></> : <AppBar />} */}
      <div className="row" style={fullScreen ? {} : video_min_col}>
        <VideoPlayer
          totalTime={totalTime}
          fullScreen={fullScreen}
          videoRef={videoRef}
          videoState={videoState}
          video={videoSrc}
          mediaClickHandler={mediaClickHandler}
          currentTime={currentTime}
          screenModeHandler={screenModeHandler}
          setCurrentTime={setCurrentTime}
          description={description}
          descriptionTitle={descriptionTitle}
          description_en={description_en}
          changeMediaStream={changeMediaStream}
          setVideoLoaded={setVideoLoaded}
        />
        <VideoChapters
          fullScreen={fullScreen}
          chapters={chapters}
          getSeconds={getSeconds}
          currentTime={currentTime}
          changeChapter={changeChapter}
          currentChapter={currentChapter}
          between={between}
          videoState={videoState}
          description={description}
          getTimeStampDetail={getTimeStampDetail}
        />
      </div>
      {!videoState && description !== "" && fullScreen ? (
        <div className="row">
          <div className="col">
            <div style={fullScreen_description}>
              <h5>{descriptionTitle}:</h5>
              <p>De: {description}</p>
              <p></p>
              <hr />
              <p>En: {description_en}</p>
              <p></p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

const fullScreen_description = {
  filter: "drop-shadow(0px 0px 0px black)",
  marginTop: "10%",
  marginBottom: "auto",
  marginLeft: 20,
  marginRight: 20,
  minHeight: 200,
  borderRadius: 10,
  padding: 20,
  background:
    "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(30,78,155,1) 50%)",
  opacity: "0.8",
  color: "white",
};

const video_min_col = {
  // backgroundColor: "#000",
  borderRadius: 5,
  //filter: "drop-shadow(0 0 0.85rem grey)",
  padding: 0,
  margin: 0,
  marginTop: 120,
};
export default Home;
