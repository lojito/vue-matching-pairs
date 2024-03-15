import { RequestHandler } from "express";

import Game from "../models/game";

type Square =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

interface Game {
  _id?: string;
  time: string;
  clicks: number;
  fails: number;
  categoryId: number;
  folder: string;
  squares: Square[];
}

export const getGames: RequestHandler = (req, res, next) => {
  Game.find({})
    .then((games: Game[]) => {
      res.send(games);
    })
    .catch(next);
};

export const createGame: RequestHandler = (req, res, next) => {
  Game.create(req.body)
    .then((game) => {
      res.send(game);
    })
    .catch(next);
};

export const removeGame: RequestHandler = (req, res, next) => {
  Game.findByIdAndRemove({ _id: req.body.id })
    .then((game: Game) => {
      res.send(game);
    })
    .catch(next);
};
