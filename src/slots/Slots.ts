import bar from "../attachments/bar.png";
import twoBar from "../attachments/twoBar.png";
import threeBar from "../attachments/threeBar.png";
import seven from "../attachments/seven.png";
import cherry from "../attachments/cherry.png";

export type SymbolName = "bar" | "twoBar" | "threeBar" | "cherry" | "seven";

export interface ISymbol {
  name: SymbolName;
  icon: any;
}

export type SlotsBoard = SymbolName[][];

export class Slots {
  static symbols: ISymbol[] = [
    {
      name: "threeBar",
      icon: threeBar,
    },
    {
      name: "bar",
      icon: bar,
    },
    {
      name: "twoBar",
      icon: twoBar,
    },
    {
      name: "seven",
      icon: seven,
    },
    {
      name: "cherry",
      icon: cherry,
    },
  ];

  static getSymbol(name: SymbolName) {
    return this.symbols.find((symbol) => symbol.name === name);
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
