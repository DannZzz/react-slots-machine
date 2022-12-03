import React, { useState } from "react";
import Dann from "dann-util";
import "./Main.scss";
import { DEFAULT_BALANCE } from "../../config";
import Board from "../Board/Board";
import { Slots } from "../../slots/Slots";

const slots = new Slots();

const Main = () => {
  const [balance, setBalance] = useState<number>(DEFAULT_BALANCE);
  const [spinning, setSpinning] = useState<boolean>(false);

  function onSpin() {
    setSpinning(true);
    const timeout = setTimeout(() => {
      setSpinning(false);
      clearTimeout(timeout);
    }, 6000);
  }

  return (
    <div className="main">
      <div className="top-bar">
        <span>Balance: {Dann.formatNumber(balance)}</span>
      </div>
      <Board spinning={spinning} slots={slots} />
      <button onClick={onSpin} className="spin-button">
        Spin
      </button>
    </div>
  );
};

export default Main;
