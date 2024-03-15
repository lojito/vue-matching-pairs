import Square from "./Square";

interface Game {
  _id?: string;
  time: string;
  clicks: number;
  fails: number;
  categoryId: number;
  folder: string;
  squares: Square[];
}

export default Game;
