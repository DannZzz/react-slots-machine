import React from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import "./Up.scss";

const Up: React.FC<{
  onClick?: () => any;
  className?: string;
  style?: any;
}> = ({ onClick, className, style }) => {
  return (
    <BsFillCaretUpFill
      className={"bet-arrow up " + (className || "")}
      onClick={onClick}
      style={style}
    />
  );
};

export default Up;
