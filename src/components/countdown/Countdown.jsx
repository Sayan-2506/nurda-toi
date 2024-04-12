import React, { useState, useEffect } from "react";
import moment from "moment-timezone"; // Импорт библиотеки moment-timezone
import { motion } from "framer-motion";
import "./countdown.scss";

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

const Countdown = ({ timeTillDate, timeFormat }) => {
  const [countdown, setCountdown] = useState({
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const then = moment.tz(timeTillDate, "Asia/Almaty"); // Указываем временную зону Астаны
      const now = moment();
      const diff = moment.duration(then.diff(now));
      const days = diff.days();
      const hours = diff.hours();
      const minutes = diff.minutes();
      const seconds = diff.seconds();

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeTillDate, timeFormat]);

  if (!countdown.seconds) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="m-auto mt-20 px-8 w-full max-w-[600px] h-full flex flex-col text-center text-slate-700"
    >
      <motion.h3
        custom={1}
        variants={textAnimation}
        className="text-base font-medium mb-6"
      >
        Тойдың басталуына:
      </motion.h3>
      <div className="countdown-wrapper">
        {Object.keys(countdown).map((key) => {
          if (countdown[key] !== undefined) {
            return (
              <CountdownItem
                key={key}
                value={countdown[key]}
                unit={
                  key === "days"
                    ? "күн"
                    : key === "hours"
                    ? "сағат"
                    : key === "minutes"
                    ? "минут"
                    : "секунд"
                }
              />
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
};

const CountdownItem = ({ value, unit }) => {
  const radius = mapNumber(
    value,
    unit === "күн" ? 0 : unit === "сағат" ? 24 : 60,
    0,
    0,
    360
  );

  return (
    <div className="countdown-item">
      <SVGCircle radius={radius} />
      <p>{value}</p>
      <span>{unit}</span>
    </div>
  );
};

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#333"
      strokeWidth="2"
      d={describeArc(50, 50, 40, 0, radius)}
    />
  </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

export default Countdown;
