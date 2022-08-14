// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COIN } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COIN:
    return {
      ...state,
      currencies: action.coins,
    };
  default:
    return state;
  }
};

export default wallet;
