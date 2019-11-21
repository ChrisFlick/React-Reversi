import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_CHAT,
  UPDATE_BOARD,
  UPDATE_OPPONENT_ELO,
  UPDATE_OPPONENT_SCORE,
  UPDATE_PLAYER_ELO,
  UPDATE_PLAYER_SCORE,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {

    case UPDATE_BOARD:
      return {
        ...state,
        board: action.board,
      }

    case UPDATE_PLAYER_ELO: 
      return {
        ...state,
        playerElo: action.playerElo
      }

    case UPDATE_OPPONENT_ELO: 
      return {
        ...state,
        opponentElo: action.opponentElo
      }

    case UPDATE_PLAYER_SCORE:
      return {
        ...state,
        playerScore: action.playerScore
      }

    case UPDATE_OPPONENT_SCORE:
      return {
        ...state,
        opponentScore: action.opponentScore
      }


    case ADD_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.chat]
      }


  default:
    return state;
  }
};

const ReversiState = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
   board: [[]],
   chat: [],
   playerElo: 0,
   opponentElo: 0,
   playerScore: 2,
   opponentScore: 2,
  });

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     posts: [],
//     currentPost: {
//       _id: 0,
//       title: "",
//       body: "",
//       author: ""
//     },
//     favorites: [],
//     loading: false
//   });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { ReversiState, useStoreContext };
