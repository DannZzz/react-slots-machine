import React, { FC, useRef } from "react";
import { Slots } from "../../slots/Slots";
import Slider, { Settings } from "react-slick";
import "./Board.scss";

const Board: FC<{ spinning: boolean; slots: Slots }> = ({
  slots,
  spinning,
}) => {
  const list1Ref = useRef<HTMLDivElement>(null);
  const list2Ref = useRef<HTMLDivElement>(null);
  const list3Ref = useRef<HTMLDivElement>(null);
  const refsInArray = [list1Ref, list2Ref, list3Ref];

  var settings: Settings = {
    // dots: true,
    infinite: true,
    speed: 1200,
    autoplay: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    arrows: false,
    vertical: true,
    accessibility: false,
    // centerPadding: "150px",
    dotsClass: "symbol-icon",
  };
  // let interval: any;
  // let startPercent = 1;
  // if (spinning) {
  //   interval = setInterval(() => {
  //     list1Ref.current &&
  //       (list1Ref.current.style.transform = `translateY(50%);`);
  //   }, 200);
  // } else {
  //   // clearInterval(interval);
  // }

  return (
    <div className="board">
      {slots.symboled().map((symbolList, symbolListIndex) => (
        // <div
        //   ref={refsInArray[symbolListIndex]}
        //   className="symbol-list"
        // >
        <Slider
          key={symbolListIndex + ""}
          className="symbol-list"
          {...settings}
        >
          {symbolList.map((symbol, symbolIndex) => (
            <img
              className="symbol-icon"
              key={`symbol-${symbolIndex}`}
              src={symbol?.icon}
            />
          ))}
        </Slider>
        // </div>
      ))}
    </div>
  );
};

export default Board;
