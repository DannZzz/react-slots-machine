import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import "./Down.scss";

const Down: React.FC<{
  onClick?: () => any;
  className?: string;
  style?: any;
}> = ({ onClick, className, style }) => {
  return (
    <BsFillCaretDownFill
      className={"bet-arrow down " + (className || "")}
      onClick={onClick}
      style={style}
    />
  );
};

export default Down;
