import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { Slots } from "../../slots/Slots";
import Down from "../slots-arrows/Down/Down";
import Up from "../slots-arrows/Up/Up";
import "./ModalSlots.scss";

const slots = new Slots();

const ModalSlots = () => {
  // const list1Ref = useRef<Slider>(null);
  // const list2Ref = useRef<Slider>(null);
  // const list3Ref = useRef<Slider>(null);
  // const refsInArray = [list1Ref, list2Ref, list3Ref];

  // const slider = (i: number) => refsInArray?.[i - 1]?.current;

  var sliderSettings: Settings = {
    infinite: true,
    arrows: true,
    swipe: true,
    draggable: false,
    speed: 10,
    slidesToShow: 3,
    autoplaySpeed: 10,
    slidesToScroll: 0.5,
    vertical: true,
    accessibility: false,
    dotsClass: "symbol-icon",
    nextArrow: <Down />,
    prevArrow: <Up />,
  };

  return (
    <>
      <div className="modal-slots">
        {slots.symboled().map((symbolList, symbolListIndex) => (
          <Slider
            // ref={refsInArray[symbolListIndex]}
            key={symbolListIndex + ""}
            className="symbol-list"
            {...sliderSettings}
          >
            {symbolList.map((symbol, symbolIndex) => (
              <img
                className="symbol-icon"
                key={`symbol-${symbolIndex}`}
                src={symbol?.icon}
              />
            ))}
          </Slider>
        ))}
      </div>
      <button>Save</button>
    </>
  );
};

export default ModalSlots;
