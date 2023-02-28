import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";
import Fullscreen from "fullscreen-react";

const VideoPlayer = ({
  totalTime,
  fullScreen,
  videoRef,
  videoState,
  video,
  mediaClickHandler,
  currentTime,
  screenModeHandler,
  setCurrentTime,
  description,
  descriptionTitle,
  description_en,
  changeMediaStream,
  setVideoLoaded,
}) => {
  return (
    <Fullscreen isEnter={fullScreen}>
      <div className={fullScreen ? "container-2" : "col-md-9"}>
        <div>
          <div
            onClick={mediaClickHandler}
            className="d-flex justify-content-center"
            style={{
              position: "relative",
              alignItems: "center",
              alignContent: "center",
              height: "100%",
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{
                position: "absolute",
                color: "#1e4e9b",
                width: "100%",
                opacity: "0.7",
                fontSize: 70,
                textAlign: "center",
              }}
            >
              <div
                className="d-felx justify-content-center"
                style={{
                  // border: "5px solid grey",
                  // borderRadius: "1000px",
                  alignContent: "center",
                  alignItems: "center",
                  width: "250px",
                  paddingTop: "45px",
                  paddingBottom: "45px",
                }}
              >
                {videoState ? <></> : <i class="fa fa-play"></i>}
              </div>
            </div>
            <video
              ref={videoRef}
              style={
                fullScreen
                  ? {
                      width: "100%",
                      height: "90vh",
                    }
                  : {
                      width: "100%",
                    }
              }
              onTimeUpdate={(e) => {
                setCurrentTime(e.target.currentTime);
              }}
              src={video}
              loop
              playsInline
              autoPlay={false}
              controls={false}
              preload="auto"
              type="video/mp4"
              onLoadedData={() => {
                setVideoLoaded(true);
              }}
            ></video>
          </div>

          <VideoControls
            totalTime={totalTime}
            currentTime={currentTime}
            mediaClickHandler={mediaClickHandler}
            videoState={videoState}
            videoRef={videoRef}
            fullScreen={fullScreen}
            screenModeHandler={screenModeHandler}
            changeMediaStream={changeMediaStream}
          />
          {description !== "" && !fullScreen ? (
            <div className="row">
              <div className="col">
                <div style={regular_description}>
                  <h5>{descriptionTitle}:</h5>
                  <p>De: {description}</p>
                  <hr />
                  <p>En: {description_en}</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Fullscreen>
  );
};

const regular_description = {
  marginTop: 10,
  marginBottom: "auto",
  minHeight: 200,
  borderRadius: 5,
  padding: 20,
  backgroundColor: "white",
  background: "rgba(30,78,155,1)",
  color: "white",
};

export default VideoPlayer;
