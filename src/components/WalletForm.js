import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionGetCoins, actionSaveExpenses, removeItemAction } from '../redux/actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  state = {
    id: 0,
    ...initialState,
  };

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  changeState = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  addIten = async () => {
    const { id } = this.state;
    const { saveExpenses } = this.props;

    try {
      const getCoins = async () => {
        const response = await fetch('https://economia.awesomeapi.com.br/json/all');
        const data = await response.json();
        return data;
      };
      const coins = await getCoins();
      this.setState({
        exchangeRates: coins,
      });
    } catch (error) {
      console.log('deu ruim :(', error);
    }

    saveExpenses(this.state);

    this.setState({
      id: (id + 1),
      ...initialState,
    });
  };

  editItemFunc = (position) => {
    const { id, value, description, currency, method, tag } = this.state;
    const { expenses, editItem } = this.props;
    const edited = {
      ...expenses[position],
      value,
      description,
      currency,
      method,
      tag,
    };

    expenses.splice(position, 1, edited);
    editItem(expenses);

    this.setState({
      id: (id + 1),
      ...initialState,
      exchangeRates: {},
    });
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { coins, edit, editPosition } = this.props;

    return (
      <form>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          placeholder="Gastos"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          placeholder="Descrição"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
          value={ currency }
        >
          { coins.map((coin) => (
            <option
              name="currency"
              key={ coin }
            >
              { coin }
            </option>)) }
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
          value={ method }
        >
          <option
            name="dinheiro"
          >
            Dinheiro
          </option>
          <option
            name="credito"
          >
            Cartão de crédito
          </option>
          <option
            name="debito"
          >
            Cartão de débito
          </option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          type="dropdown"
          value={ tag }
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        >
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>
        {
          !edit ? (
            <button
              type="button"
              onClick={ () => this.addIten() }
            >
              Adicionar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ () => this.editItemFunc(editPosition) }
            >
              Editar despesa
            </button>
          )
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCoins: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  edit: state.wallet.buttonEdit[0],
  editPosition: state.wallet.buttonEdit[1],
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(actionGetCoins()),
  saveExpenses: (infos) => dispatch(actionSaveExpenses(infos)),
  editItem: (newItens) => dispatch(removeItemAction(newItens)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
