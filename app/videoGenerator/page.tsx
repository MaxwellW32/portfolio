"use client"

import React, { useState, useEffect } from "react";
import styles from "./page.module.css"
import axios from "axios";


function MyYoutubeCont(props: {videoId: string; gridLetter: string}) {

const { videoId, gridLetter } = props;

    return (
    <iframe
      id="mainVidIframe"
      className={styles.mainVidIframe}
      style={{
        width: "100%",
        aspectRatio: "16/9",
        gridArea: gridLetter === "x" ? undefined : gridLetter,
      }}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}



function VideoGenerator() {

  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [searchString, setSearchString] = useState("cats");
  const [maxSearchNumber, setMaxSearchNumber] = useState(1);
  const [myLayout, setMyLayout] = useState(true);

  const [backupSearchString, setBackupSearchString] = useState("");

  const [succGotFromYoutube, setSuccGotFromYoutube] = useState(true);

  const gridLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  useEffect(() => {
    //program start fetch
    fetchData();
  }, [maxSearchNumber]);

  useEffect(() => {
    //load backups on api fail
    if (!succGotFromYoutube) {
      const myBackupVideos = [
        "ktBMxkLUIwY",
        "tcaw6lzYt1Q",
        "rULyu_wFWGU",
        "ZD6C498MB4U",
        "ytQ5CYE1VZw",
        "iI34LYmJ1Fs",
        "h3EJICKwITw",
        "3JBKp0YbSEc",
        "r_0JjYUe5jo",
        "oihY8GiXXgQ",
        "nceqQyqIa5o",
        "1RdrlReJmTY",
        "RRl_C73vFtQ",
      ];
      setVideoIds((prevIds) => [...myBackupVideos, ...prevIds]);
    }
  }, [succGotFromYoutube]);

  async function fetchData() {

    try {

      const response = await axios.get(`/api/ytVids?searchString=${searchString}&maxSearchNumber=${maxSearchNumber}`)
      const allVidIds = response.data.allVidIds

      setSuccGotFromYoutube(true);
      setVideoIds(allVidIds);         
        
      } catch (error) {
      console.log(`Hi max Error occurred: ${error}`);
      setSuccGotFromYoutube(false);

    }
  }

  function getRandomWord() {
    const url = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchString(data[0].word);
      })
      .catch((error) => console.error(error));

    fetchData();
  }

  function handleBackupSearch() {
    let id = "";
    if (backupSearchString.includes("youtube.com")) {
      id = backupSearchString.split("v=")[1];
      if (id.includes("&")) {
        id = id.split("&")[0];
      }
    } else if (backupSearchString.includes("youtu.be")) {
      id = backupSearchString.split("/")[3];
    } else {
      id = backupSearchString;
    }

    setVideoIds((prev) => [...prev, id]);
  }

  return (
    <div id="mainVidPlayer" className={styles.mainVidPlayer}>
      <main id="mainNavMainCont" className={styles.mainNavMainCont}>
        <h1>Load random youtube videos</h1>

        {!succGotFromYoutube && (
          <div id="errorVidDivCont" className={styles.errorVidDivCont}>
            <h2>Couldn&apos;t fetch Videos, using backup videos</h2>
            <input
              type="text"
              id="vidBackupSearch"
              value={backupSearchString}
              placeholder="enter any youtube url: "
              onChange={(e) => {
                setBackupSearchString(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBackupSearch();
                }
              }}
            />
            <button onClick={handleBackupSearch}>
              Search Video
            </button>
          </div>
        )}

        {succGotFromYoutube && (
          <>
            <button
              onClick={() => {
                setMaxSearchNumber((prev) => prev + 10);
              }}
            >
              Load 10+ more
            </button>

            {maxSearchNumber > 5 && (
              <button
                onClick={() => {
                  setMaxSearchNumber(1);
                }}
              >
                Load only 1 video
              </button>
            )}
          </>
        )}

        <button
          onClick={() => {
            setMyLayout((prev) => !prev);
          }}
        >
          {myLayout ? "Use Block Layout" : "Use Grid Layout"}
        </button>

        {succGotFromYoutube ? (
          <div id="vidSearchCont" className={styles.vidSearchCont}>
            <input
              placeholder="search any topic: "
              id="vidSearchInput"
              className={styles.vidSearchInput}
              type="text"
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
            />

            <button onClick={fetchData}>
              Search
            </button>
          </div>
        ) : (
          <button onClick={fetchData}>
            Try Random Search Again
          </button>
        )}

        <div
          style={{ display: myLayout ? "grid" : "block" }}
          id="allMyYoutubeVidCont"
          className={styles.allMyYoutubeVidCont}>
          {videoIds.map((each, index) => {
            return (
              <MyYoutubeCont
                key={index}
                gridLetter={gridLetters[index] ? gridLetters[index] : "x"}
                videoId={videoIds[index]}
              />
            );
          })}
        </div>

        <br />
        {succGotFromYoutube && (
          <button onClick={getRandomWord}>
            Random Topic Video
          </button>
        )}
      </main>
    </div>
  );
}

export default VideoGenerator;
