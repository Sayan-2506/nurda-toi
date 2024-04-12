import { React, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import "./App.css";
import { Front } from "./components";
import Info from "./components/Info";
import Program from "./components/Program";
import DresCode from "./components/DresCode";
import Form from "./components/Form";
import PartyImage from "./components/PartyImage";
import CountDown from "./components/countdown/Countdown";
import { Footer } from "./components/Footer";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div className="App">
      <Front />
      <Info />
      <Program />
      <DresCode />
      <CountDown
        timeTillDate="2024-04-12T13:00:00"
        timeFormat="YYYY-MM-DDTHH:mm:ss"
      />
      <Form />
      <PartyImage />
      <Footer />
    </div>
  );
}

export default observer(App);
