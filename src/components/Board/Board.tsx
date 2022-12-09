import React, { FC, useEffect, useRef } from "react";
import { Slots, SlotsIndex } from "../../slots/Slots";
import Slider, { Settings } from "react-slick";
import "./Board.scss";
import { createTimeout } from "../../util/timeout";

const Board: FC<{
  endSpin: () => void;
  spinning: boolean;
  startShake: () => void;
  stopShake: () => void;
  slots: Slots;
  spinTo: SlotsIndex;
  lastWin: number;
  setLastWin: (amount: number) => void;
  setWinning: (amount: number) => void;
  setSpinTo: (indexes: SlotsIndex) => void;
}> = ({
  slots,
  spinning,
  endSpin,
  setWinning,
  spinTo,
  setLastWin,
  stopShake,
  startShake,
  setSpinTo,
}) => {
  const list1Ref = useRef<Slider>(null);
  const list2Ref = useRef<Slider>(null);
  const list3Ref = useRef<Slider>(null);
  const refsInArray = [list1Ref, list2Ref, list3Ref];

  const slider = (i: number) => refsInArray?.[i - 1]?.current;

  useEffect(() => {
    if (spinTo && !refsInArray.some((n) => !n)) {
      spinTo.forEach((ind, i) => {
        refsInArray[i]?.current?.slickGoTo(ind);
      });
    }
  }, [spinTo]);

  var sliderSettings: Settings = {
    infinite: true,
    arrows: false,
    draggable: false,
    speed: 10,
    autoplaySpeed: 10,
    // slidesToShow: 3,
    slidesToScroll: 0.5,
    vertical: true,
    accessibility: false,
    dotsClass: "symbol-icon",
  };

  useEffect(() => {
    if (spinTo?.length > 0) {
      spinTo.forEach((indexSlide, i) => {
        slider(i + 1)?.slickGoTo(indexSlide);
      });
    }
  }, [spinTo]);

  if (spinning) {
    const spree = Slots.spree();

    // starting
    slider(1)?.slickPlay();
    slider(2)?.slickPlay();
    slider(3)?.slickPlay();
    // ending first
    createTimeout(() => {
      slider(1)?.slickPause();
      createTimeout(() => slider(1)?.slickGoTo(spree[0]), 50);

      // ending second
      createTimeout(() => {
        slider(2)?.slickPause();
        createTimeout(() => slider(2)?.slickGoTo(spree[1]), 50);

        // ending third
        createTimeout(() => {
          slider(3)?.slickPause();
          createTimeout(() => slider(3)?.slickGoTo(spree[2]), 50);

          // calcuting winnings
          createTimeout(async () => {
            const winning = spree.calc();
            if (winning.won) {
              startShake();
              const pieces = Math.ceil(
                winning.amount / ((winning.amount * 5) / 100)
              );
              endSpin();

              createTimeout(() => {
                stopShake();
                setLastWin(winning.amount);
                setWinning(winning.amount);
              }, pieces * 100);
              let i = 1;
              const interval = setInterval(() => {
                setLastWin(Math.floor(((winning.amount * 5) / 100) * i++));
                if (i === pieces) clearInterval(interval);
              }, 100);
            } else {
              endSpin();
            }
          }, 500);
        });
      });
    });
  }

  return (
    <div className="board">
      {slots.symboled().map((symbolList, symbolListIndex) => (
        <Slider
          ref={refsInArray[symbolListIndex]}
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
  );
};

export default Board;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
