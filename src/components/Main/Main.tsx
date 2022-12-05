import React, { useState } from "react";
import Dann from "dann-util";
import "./Main.scss";
import { DEFAULT_BALANCE, VALID_BETS } from "../../config";
import Board from "../Board/Board";
import { Slots } from "../../slots/Slots";
import BetSystem from "../BetSystem/BetSystem";

const slots = new Slots();

const Main = () => {
  const [balance, setBalance] = useState<number>(DEFAULT_BALANCE);
  const [bestWin, setBestWin] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [lastWin, setLastWin] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const [bet, setBet] = useState<number>(VALID_BETS[0]);

  function changeBalance(amount: number) {
    setBalance(balance + amount);
  }

  function onSpin() {
    if (balance < bet) return;
    changeBalance(-bet);
    setSpinning(true);
  }

  function endSpin() {
    setSpinning(false);
  }

  function setWinning(amount: number) {
    amount *= bet;
    if (bestWin) {
      if (bestWin < amount) setBestWin(amount);
    } else {
      setBestWin(amount);
    }
    changeBalance(amount);
  }

  function setLastWinWithBet(amount: number) {
    amount *= bet;
    setLastWin(amount);
  }

  function startShake() {
    setShake(true);
  }

  function stopShake() {
    setShake(false);
  }

  function setNewBet(amount: number) {
    if (spinning || shake) return;
    setBet(amount);
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
        setLastWin={setLastWinWithBet}
        setWinning={setWinning}
        spinning={spinning}
        endSpin={endSpin}
        slots={slots}
      />
      <div className="control-panel">
        <button
          disabled={spinning || shake}
          onClick={onSpin}
          className="spin-button"
        >
          Spin
        </button>
        <BetSystem bet={bet} setBet={setNewBet} />
      </div>
      <span className="balance">Balance: {Dann.formatNumber(balance)}</span>
    </div>
  );
};

export default Main;
