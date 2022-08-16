// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COIN, SAVE_EXPENSES, REMOVE_ITEM, CHANGE_BUTTON } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  buttonEdit: [false, 0],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COIN:
    return ({
      ...state,
      currencies: action.coins,
    });
  case SAVE_EXPENSES:
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: action.infos.id,
          value: action.infos.value,
          description: action.infos.description,
          currency: action.infos.currency,
          method: action.infos.method,
          tag: action.infos.tag,
          exchangeRates: action.infos.exchangeRates,
        },
      ],
    });
  case REMOVE_ITEM:
    return ({
      ...state,
      expenses: [
        ...action.newItens,
      ],
    });
  case CHANGE_BUTTON:
    return ({
      ...state,
      buttonEdit: [
        !state.buttonEdit[0],
        action.position,
      ],
    });
  default:
    return state;
  }
};

export default wallet;
