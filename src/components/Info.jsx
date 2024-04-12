import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { motion } from "framer-motion";
import insta from "../assets/insta.png";
import togis from "../assets/togis.png";

const Info = () => {
  const { store } = useContext(Context);
  const [info, setInfo] = useState();
  const [personData, setPersonData] = useState({
    hostsWedding: "",
    weddingDate: "",
    weddingTime: "",
    nameRest: "",
    address: "",
  });

  useEffect(() => {
    store
      .getDetail()
      .then((data) => {
        setInfo(data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (info) {
      const dateOnly = info.WeddingDate.split(" ")[0];
      const parts = dateOnly.split("-");
      const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

      const dateTime = info.WeddingDate.split(" ")[1];

      setPersonData({
        hostsWedding: info.hosts_wedding,
        weddingDate: formattedDate,
        weddingTime: dateTime,
        nameRest: info.name_rest,
        address: info.address,
        gisAddress: info.gis_address,
      });
    }
  }, [info]);

  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.5 },
    }),
  };

  const buttonVibrations = {
    hidden: {
      x: 0,
      y: 0,
    },
    visible: (custom) => ({
      [custom === "x" ? "x" : "y"]: [-1, 1, -1, 1, 0],
      transition: { repeat: Infinity, repeatDelay: 2 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="m-auto mt-20 px-8 w-full max-w-[600px] h-full flex flex-col text-center text-slate-700"
    >
      <h3 className="text-base">Той иелері:</h3>
      <motion.h2
        custom={1}
        variants={textAnimation}
        className="text-2xl text-yellow-600 mb-5 font-vivaldi"
      >
        {personData.hostsWedding ? personData.hostsWedding : ""}
      </motion.h2>
      <motion.h2
        custom={2}
        variants={textAnimation}
        className="text-2xl text-yellow-600 font-snell"
      >
        {personData.weddingDate}
      </motion.h2>
      <h3 className="text-base uppercase mb-5">
        Басталу уақыты {personData.weddingTime}
      </h3>
      <motion.h2
        custom={3}
        variants={textAnimation}
        className="text-2xl text-yellow-600 font-snell"
      >
        {personData.nameRest} мейрамханасы
      </motion.h2>
      <h3 className="text-base uppercase">{personData.address}</h3>
      <div className="flex items-center justify-center gap-4 mt-5">
        <a
          href="https://instagram.com/toiga_sait_shakirtu?igshid=MzNlNGNkZWQ4Mg=="
          target="_blank"
          rel="noreferrer"
        >
          <motion.img
            custom={"x"}
            variants={buttonVibrations}
            className="w-16 h-16"
            src={insta}
            alt="instaImg"
          />
        </a>

        <a href={personData.gisAddress} target="_blank" rel="noreferrer">
          <motion.img
            custom={"y"}
            variants={buttonVibrations}
            className="w-16 h-16"
            src={togis}
            alt="togisImg"
          />
        </a>
      </div>
    </motion.div>
  );
};

export default Info;
