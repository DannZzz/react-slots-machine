import bar from "../attachments/bar.png";
import twoBar from "../attachments/twoBar.png";
import threeBar from "../attachments/threeBar.png";
import seven from "../attachments/seven.png";
import cherry from "../attachments/cherry.png";
import { randomNumber } from "anytool";

export type SymbolName = "bar" | "twoBar" | "threeBar" | "cherry" | "seven";

export interface SlotSlideIndexes {
  0: number;
  1: number;
  2: number;
}

export interface Winning {
  won: boolean;
  amount: number;
}

export interface ISymbol {
  name: SymbolName;
  icon: any;
  group: "bar" | "seven&cherry";
}

export type SlotsBoard = SymbolName[][];

export class Slots {
  static symbols: ISymbol[] = [
    {
      name: "threeBar",
      icon: threeBar,
      group: "bar",
    },
    {
      name: "bar",
      icon: bar,
      group: "bar",
    },
    {
      name: "twoBar",
      icon: twoBar,
      group: "bar",
    },
    {
      name: "seven",
      icon: seven,
      group: "seven&cherry",
    },
    {
      name: "cherry",
      icon: cherry,
      group: "seven&cherry",
    },
  ];

  static getSymbol(name: SymbolName) {
    return this.symbols.find((symbol) => symbol.name === name);
  }

  static at(index: number) {
    return this.symbols.at(
      index >= this.symbols.length ? 0 - (index - this.symbols.length) : index
    );
  }

  static spree() {
    return new WinningSpree();
  }

  private _board: SlotsBoard = [[], [], []];

  get board() {
    return this._board;
  }

  symboled(board?: SlotsBoard) {
    return (board || this.board).map((rows) => {
      return rows.map((symbolName) => Slots.getSymbol(symbolName));
    });
  }

  constructor() {
    Slots.symbols.forEach((symbol) => {
      this._board[0].push(symbol.name);
      this._board[1].push(symbol.name);
      this._board[2].push(symbol.name);
    });
  }
}

class WinningSpree {
  0: number;
  1: number;
  2: number;
  constructor() {
    this.setRandom();
  }

  setRandom() {
    this[0] = randomNumber(0, 4) + try50Chance(0.5);
    this[1] = randomNumber(0, 4) + try50Chance(0.5);
    this[2] = randomNumber(0, 4) + try50Chance(0.5);
  }

  calc(): Winning {
    const indexes = { 0: this[0], 1: this[1], 2: this[2] };
    const asArray = Object.values(indexes);
    const hasCenterLine = asArray.some((n) => n === Math.ceil(n));
    const hasTopOrBottomLine = asArray.some((n) => n !== Math.ceil(n));

    // Wheter there is center line with another type of lines
    if (hasCenterLine === hasTopOrBottomLine) {
      return { won: false, amount: 0 };
    }

    // Wheter the winning line is center
    if (hasCenterLine) {
      const centerLine = asArray.map((indexOfSymbol) =>
        Slots.at(indexOfSymbol)
      );

      const centerLineResult = this.calcLine(centerLine, "center");
      if (centerLineResult.won) return centerLineResult;
    } else {
      console.log(asArray);
      const topLine = asArray.map((indexOfSymbol) =>
        Slots.at(Math.floor(indexOfSymbol))
      );
      const bottomLine = asArray.map((indexOfSymbol) =>
        Slots.at(Math.ceil(indexOfSymbol))
      );
      console.log(topLine, bottomLine);
      const topLineResult = this.calcLine(topLine, "top");
      const bottomLineResult = this.calcLine(bottomLine, "bottom");
      if (topLineResult.won || bottomLineResult.won)
        return {
          won: true,
          amount: topLineResult.amount + bottomLineResult.amount,
        };
    }

    return { won: false, amount: 0 };
  }

  private calcLine(
    line: ISymbol[],
    position: "center" | "top" | "bottom"
  ): Winning {
    let cherryValue = 1000;
    if (position === "top") {
      cherryValue = 2000;
    } else if (position === "bottom") {
      cherryValue = 4000;
    }
    // Wheter the combination won
    if (!line.some((symbol) => symbol.group !== line[0].group)) {
      if (line[0].group !== "bar") {
        // cherry line
        if (!line.some((symbol) => symbol.name !== "cherry")) {
          return { won: true, amount: cherryValue };
        }
        // seven line
        else if (!line.some((symbol) => symbol.name !== "seven")) {
          return { won: true, amount: 150 };
        }
        // cherry and seven
        else {
          return { won: true, amount: 75 };
        }
      } else {
        // same bar line
        if (!line.some((symbol) => symbol.name !== line[0].name)) {
          switch (line[0].name) {
            // bar line
            case "bar":
              return { won: true, amount: 10 };
            // two bar line
            case "twoBar":
              return { won: true, amount: 20 };
            // three bar line
            case "threeBar":
              return { won: true, amount: 50 };
          }
        }
        // any bar line
        else {
          return { won: true, amount: 5 };
        }
      }
    }

    return { won: false, amount: 0 };
  }
}

function try50Chance(_in: number, _out: number = 0) {
  return randomNumber(0, 100) <= 50 ? _in : _out;
}
