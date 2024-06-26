import React, { useState, useEffect, useContext } from "react";
import { Context } from "../..";
import "./front.css";
import { motion } from "framer-motion";
import frontart from "../../assets/nurda.jpg";

import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import sound from "../../assets/music4.mp3";

const Front = () => {
  const { store } = useContext(Context);
  const [info, setInfo] = useState();

  useEffect(() => {
    store
      .getDetail()
      .then((data) => {
        setInfo(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.3 },
    }),
  };

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(info && info.music);
    audio.loop = true;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full relative"
    >
      <img
        src={frontart}
        alt="frontartImg"
        className="w-full h-[70vh] object-cover rounded-b-[150px] floating-image bg-gradient-to-r p-[3px] from-[#db2777] to-[#9333EA]"
      />
      <div className="bird"></div>
      <button
        className="btn-play player__btn-play player"
        onClick={toggleAudio}
      >
        {isPlaying ? (
          <img
            className="relative z-10 left-[-20%]"
            src={pause}
            alt="pauseImg"
          />
        ) : (
          <img className="relative z-10 left-[-20%]" src={play} alt="playImg" />
        )}
      </button>
      <div className="w-full max-w-[600px] m-auto h-full flex flex-col text-center text-slate-700 px-4 mt-12">
        <motion.h1
          className="font-medium text-base"
          custom={1}
          variants={textAnimation}
        >
          Құрметті ағайын-туыс, құда-жекжат, дос-жарандар!
        </motion.h1>
        <h2 className="font-medium text-xs my-5">
          Сіздерді ұлымыз бен келініміз
        </h2>
        <motion.h2
          className="text-3xl text-yellow-600 mb-8 font-vivaldi"
          custom={2}
          variants={textAnimation}
        >
          {info ? info.name : ""}
        </motion.h2>
        <motion.p
          className="font-medium text-xs max-w-[280px] m-auto"
          custom={3}
          variants={textAnimation}
        >
          Шаңырақ көтеру тойына арналған салтанатты ақ дастарханымыздың қадірлі
          қонағы болуға шақырамыз
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Front;
