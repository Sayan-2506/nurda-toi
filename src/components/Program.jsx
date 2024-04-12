import React, { useState, useEffect, useContext } from "react";
import { Context } from "..";
import { motion } from "framer-motion";

const Program = () => {
  const { store } = useContext(Context);
  const [info, setInfo] = useState();
  const [personData, setPersonData] = useState([]);

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
      setPersonData(info.holiday_plans);
    }
  }, [info]);

  const textAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.5 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      className="m-auto mt-20 px-8 w-full max-w-[600px] h-full flex flex-col text-center text-slate-700"
    >
      <h3 className="text-base font-medium mb-6">Той бағдарламасы:</h3>
      <ul>
        {personData.map((item, index) => (
          <li
            key={item.wedding}
            custom={index}
            variants={textAnimation}
            className="flex items-center gap-4 mb-8"
          >
            <img className="w-16 h-16" src={item.icon} alt={item.wedding} />
            <div className="text-left">
              <p>{item.time}</p>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Program;
