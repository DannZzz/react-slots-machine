import React, { FC, useContext, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import { ModalContext } from "../../contexts/Modal";
import { Slots, SlotsIndex } from "../../slots/Slots";
import Down from "../slots-arrows/Down/Down";
import Up from "../slots-arrows/Up/Up";
import "./ModalSlots.scss";

const slots = new Slots();

const ModalSlots: FC<{ setSpinTo: (indexes: SlotsIndex) => void }> = ({
  setSpinTo,
}) => {
  const list1Ref = useRef<Slider>(null);
  const list2Ref = useRef<Slider>(null);
  const list3Ref = useRef<Slider>(null);
  const refsInArray = [list1Ref, list2Ref, list3Ref];
  const [indexes, setIndexes] = useState<SlotsIndex>([0, 0, 0]);
  const slider = (i: number) => refsInArray?.[i - 1]?.current;

  const { toggle } = useContext(ModalContext);

  var sliderSettings: Settings = {
    infinite: true,
    arrows: true,
    // swipe: true,
    draggable: false,
    speed: 10,
    slidesToShow: 3,
    autoplaySpeed: 10,
    slidesToScroll: 0.5,
    vertical: true,
    accessibility: false,
    // dotsClass: "symbol-icon",
  };

  return (
    <>
      <div className="modal-slots">
        {slots.symboled().map((symbolList, symbolListIndex) => (
          <Slider
            beforeChange={(_, nextIndex) => {
              const _indexes = [...indexes] as SlotsIndex;
              _indexes[symbolListIndex] = nextIndex;
              setIndexes(_indexes);
            }}
            ref={refsInArray[symbolListIndex]}
            key={symbolListIndex + ""}
            nextArrow={
              <Down onClick={() => slider(symbolListIndex + 1).slickNext()} />
            }
            prevArrow={
              <Up onClick={() => slider(symbolListIndex + 1).slickPrev()} />
            }
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
      <button
        onClick={() => {
          setSpinTo(indexes.map((i) => ++i) as any);
          toggle();
        }}
      >
        Save
      </button>
    </>
  );
};

export default ModalSlots;
