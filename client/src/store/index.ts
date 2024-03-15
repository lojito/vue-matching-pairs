import { createStore } from "vuex";
import Game from "../types/Game";
import Category from "../types/Category";
import Language from "../types/Language";
import Entry from "../types/Entry";
import axios from "axios";
import data from "../data/json/dictionary.json";
import categories from "../data/json/categories.json";

export interface State {
  games: Game[];
  language: Language;
  dictionary: Entry[];
  categories: Category[];
}

const BACKEND_URL = "/games";

export default createStore<State>({
  state: {
    games: [],
    language: Language.ENGLISH,
    dictionary: data,
    categories,
  },

  getters: {
    getGame: (state) => {
      return (id: string) => state.games.find((game: Game) => game._id == id);
    },

    getGames: (state) => {
      return state.games;
    },

    getLanguage: (state) => {
      return state.language;
    },

    getCategories: (state) => {
      return state.categories;
    },

    getDictionary: (state) => {
      return state.dictionary;
    },

    getTerm: (state) => {
      return <T extends keyof Entry>(term: T) => {
        if (state.dictionary.length) {
          return state.dictionary[state.language][term];
        } else {
          return "";
        }
      };
    },
  },

  mutations: {
    setLanguage(state, language: Language) {
      state.language = language;
    },

    setGames(state, games) {
      this.replaceState(Object.assign(state, { games }));
    },

    addGame(state, game: Game) {
      state.games.push(game);
    },

    removeGame(state, id: string) {
      const gamesNumber = state.games.length;

      if (gamesNumber > 0) {
        state.games = state.games.filter((game) => {
          return game._id != id;
        });
      }
    },
  },

  actions: {
    setLanguage(context, language: Language) {
      context.commit("setLanguage", language);
    },

    loadGames(context) {
      axios
        .get(BACKEND_URL)
        .then((res) => {
          context.commit("setGames", res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },

    addGame: (context, game: Game) => {
      axios
        .post(BACKEND_URL, { ...game })
        .then((res) => {
          context.commit("addGame", res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },

    removeGame: (context, id: string) => {
      return axios
        .delete(BACKEND_URL, {
          data: { id },
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          context.commit("removeGame", id);
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  },

  modules: {},
});
