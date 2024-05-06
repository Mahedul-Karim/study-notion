import React, { useEffect, useRef, useState } from "react";

import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import {
  FaBackward,
  FaPlay,
  FaForward,
  FaPause,
  FaExpand,
} from "react-icons/fa";
import { MdSlowMotionVideo, MdPictureInPictureAlt } from "react-icons/md";

const VideoPlayer = ({
  src,
  extraClass = "",
  key,
  markAsComplete,
  setIsEnded,
}) => {
  const videoRef = useRef();
  const durationRef = useRef();
  const currentTimeRef = useRef();
  const timelineRef = useRef();

  const [highVolume, setHighVolume] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [timeline, setTimeline] = useState(0);

  const playPasueVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const draggableTimelime = (e) => {
    const clientWidth = e.target.clientWidth;

    const offsetX = e.offsetX;

    videoRef.current.currentTime =
      (offsetX / clientWidth) * videoRef.current.duration;
  };

  const formatTime = (time) => {
    let seconds = Math.floor(time) % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours === "00") {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const skipForward = () => {
    videoRef.current.currentTime += 5;
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const onTimeUpdate = (e) => {
    const { currentTime, duration } = e.target;

    const percent = (currentTime / duration) * 100;
    setTimeline(percent);
    currentTimeRef.current.innerText = formatTime(currentTime);
  };

  const setVolume = () => {
    if (highVolume) {
      videoRef.current.volume = 0;
      setHighVolume(false);
    } else {
      videoRef.current.volume = 1;
      setHighVolume(true);
    }
  };

  const rangeSlider = (e) => {
    const value = +e.target.value;

    videoRef.current.volume = value;

    if (value > 0) {
      setHighVolume(true);
    } else {
      setHighVolume(false);
    }
  };

  const timelineClick = (e) => {
    const clientWidth = e.target.clientWidth;

    const offsetX = e.nativeEvent.offsetX;

    videoRef.current.currentTime =
      (offsetX / clientWidth) * videoRef.current.duration;
  };

  return (
    <div
      className={`relative overflow-clip group text-white ${extraClass}`}
      key={key}
    >
      <video
        ref={videoRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={() => {
          durationRef.current.innerText = formatTime(videoRef.current.duration);
          markAsComplete(videoRef);
          if (setIsEnded) {
            setIsEnded(false);
          }
        }}
        onEnded={() => {
          if (!setIsEnded) {
            return;
          }
          setIsEnded(true);
        }}
        onPlay={() => {
          setIsPaused(false);
        }}
        onPause={() => {
          setIsPaused(true);
        }}
      >
        <source src={src} />
      </video>
      <div className="absolute -bottom-[32px] group-hover:bottom-3 transition-all duration-300 w-full flex flex-col gap-3 z-10">
        <div
          className="w-full relative bg-richblack-700 h-[4px] cursor-pointer"
          onClick={timelineClick}
        >
          <div
            className={`absolute h-full bg-yellow  cursor-pointer`}
            style={{
              width: `${timeline}%`,
            }}
          >
            <div
              className={`absolute size-4 bg-yellow  right-0 before:rounded-full bottom-[50%] translate-y-[50%] cursor-pointer transition-all duration-300 group-hover:scale-100  scale-0 origin-center rounded-full`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <button onClick={setVolume} type="button">
              {highVolume ? (
                <HiMiniSpeakerWave size={20} />
              ) : (
                <HiMiniSpeakerXMark size={20} />
              )}
            </button>
            <input
              type="range"
              className="h-[4px] hidden 400px:inline-block 400px:w-[50px] sm:w-[75px] text-[10px] accent-yellow cursor-pointer"
              min="0"
              max="1"
              step="any"
              onChange={rangeSlider}
            />
            <p className="text-xs sm:text-sm">
              <span ref={currentTimeRef}>00:00</span> /{" "}
              <span ref={durationRef}>3:00</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-base">
            <button onClick={skipBackward} type="button">
              <FaBackward />
            </button>
            <button onClick={playPasueVideo} type="button">
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>
            <button onClick={skipForward} type="button">
              <FaForward />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xl">
            <div className="flex items-center">
              <button type="button">
                <MdSlowMotionVideo />
              </button>
            </div>
            <button type="button">
              <MdPictureInPictureAlt />
            </button>
            <button type="button">
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
