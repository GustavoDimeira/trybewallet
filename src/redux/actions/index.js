// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const GET_COIN = 'GET_COIN';

export const GET_COIN_FAIL = 'GET_COIN_FAIL';

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const getCoinSucess = (coins) => ({ type: GET_COIN, coins });

export const getCoinFail = (error) => ({ type: GET_COIN_FAIL, error });

export function actionGetCoins() {
  return async (dispacth) => {
    try {
      const getCoins = async () => {
        const response = await fetch('https://economia.awesomeapi.com.br/json/all');
        const data = await response.json();
        const coins = Object.keys(data);
        const noUSDT = coins.filter((coin) => coin !== 'USDT');
        return noUSDT;
      };
      const coins = await getCoins();
      dispacth(getCoinSucess(coins));
    } catch (error) {
      dispacth(getCoinFail(error));
    }
  };
}

export const actionSaveExpenses = (infos) => ({
  type: SAVE_EXPENSES,
  infos,
});
