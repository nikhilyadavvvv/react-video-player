import React from "react";
import { useHistory } from "react-router-dom";

const VideoChapters = ({
  fullScreen,
  chapters,
  getSeconds,
  currentTime,
  changeChapter,
  currentChapter,
  between,
  videoState,
  description,
  getTimeStampDetail,
}) => {
  let history = useHistory();
  return (
    <div
      className="col-md-3"
      style={fullScreen ? { display: "none" } : { display: "block" }}
    >
      <div style={chapter_col}>
        <h5>Chapters:</h5>
        {chapters.map((chapter, key) => {
          const active = between(
            currentTime,
            getSeconds(chapter.start),
            getSeconds(chapter.end)
          );
          getTimeStampDetail();
          return (
            <div
              onClick={() => {
                changeChapter(chapter);
              }}
              style={{
                ...chapter_button,
                backgroundColor: active ? "#1e4e9b" : "",
                color: active ? "white" : "black",
              }}
            >
              <div
                className="d-flex"
                style={{ alignContent: "center", alignItems: "center" }}
              >
                <div style={{ wordWrap: "break-word" }}>{chapter.title}</div>
                <div
                  style={{
                    wordWrap: "break-word",
                    marginLeft: "auto",
                    fontSize: 10,
                  }}
                >
                  {chapter.start}-{chapter.end}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const chapter_button = {
  borderRadius: 4,
  borderColor: "#1e4e9b",
  borderWidth: "1px",
  borderStyle: "solid",
  marginTop: 5,
  padding: 10,
};

const chapter_col = {
  borderRadius: 5,
  height: "100%",
  width: "100%",
  padding: 20,
  backgroundColor: "white",
  opacity: "0.95",
};
export default VideoChapters;
