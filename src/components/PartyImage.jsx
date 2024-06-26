import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { BsCameraFill } from "react-icons/bs";

const PartyImage = () => {
  const { store } = useContext(Context);
  const [info, setInfo] = useState();
  const [telegramUrl, setTelegramUrl] = useState();

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
      setTelegramUrl(info.telegram_url);
    }
  }, [info]);

  return (
    <div className="m-auto mt-12 px-8 w-full max-w-[600px] h-full flex flex-col text-center text-slate-700 items-center">
      <a
        href={telegramUrl}
        target="_blank"
        rel="noreferrer"
        className="max-w-[200px] w-full flex items-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
      >
        <BsCameraFill className="mr-2" size={30} />
        Тойдың фотолары
      </a>
    </div>
  );
};

export default PartyImage;
