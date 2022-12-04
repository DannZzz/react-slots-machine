import React, { useState } from "react";
import Dann from "dann-util";
import "./Main.scss";
import { DEFAULT_BALANCE } from "../../config";
import Board from "../Board/Board";
import { Slots } from "../../slots/Slots";

const slots = new Slots();

const Main = () => {
  const [balance, setBalance] = useState<number>(DEFAULT_BALANCE);
  const [bestWin, setBestWin] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [lastWin, setLastWin] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);

  function changeBalance(amount: number) {
    setBalance(balance + amount);
  }

  function onSpin() {
    changeBalance(-1);
    setSpinning(true);
  }

  function endSpin() {
    setSpinning(false);
  }

  function setWinning(amount: number) {
    if (bestWin) {
      if (bestWin < amount) setBestWin(amount);
    } else {
      setBestWin(amount);
    }
  }

  function startShake() {
    setShake(true);
  }

  function stopShake() {
    setShake(false);
  }

  return (
    <div className={"main" + (shake ? " winning" : "")}>
      <div className="top-bar">
        <span>Best Win: {Dann.formatNumber(bestWin)}</span>
        <span className="amount">Last Win: {Dann.formatNumber(lastWin)}</span>
      </div>
      <Board
        startShake={startShake}
        stopShake={stopShake}
        lastWin={lastWin}
        setLastWin={setLastWin}
        setWinning={setWinning}
        changeBalance={changeBalance}
        spinning={spinning}
        endSpin={endSpin}
        slots={slots}
      />
      <button
        disabled={spinning || shake}
        onClick={onSpin}
        className="spin-button"
      >
        Spin
      </button>
      <span className="balance">Balance: {Dann.formatNumber(balance)}</span>
    </div>
  );
};

export default Main;
