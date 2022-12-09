import React, { FC } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { VALID_BETS } from "../../config";
import "./BetSystem.scss";

const BetSystem: FC<{ bet: number; setBet: (amount: number) => void }> = ({
  bet,
  setBet,
}) => {
  function up() {
    const index = VALID_BETS.indexOf(bet);
    if (index + 1 === VALID_BETS.length) return;
    setBet(VALID_BETS[index + 1]);
  }

  function down() {
    const index = VALID_BETS.indexOf(bet);
    if (index === 0) return;
    setBet(VALID_BETS[index - 1]);
  }

  return (
    <div className="bet-system">
      <BsFillCaretUpFill className="bet-arrow up" onClick={up} />
      <span>{bet}</span>
      <BsFillCaretDownFill className="bet-arrow down" onClick={down} />
    </div>
  );
};

export default React.memo(BetSystem);
