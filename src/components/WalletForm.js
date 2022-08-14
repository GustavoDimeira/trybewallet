import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionGetCoins, actionSaveExpenses } from '../redux/actions';

const Alimentação = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: Alimentação,
    exchangeRates: {},
  };

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins('first');
  }

  changeState = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  addIten = async () => {
    const { id } = this.state;
    const { saveExpenses } = this.props;

    // pegar as infos da exchangeRates e colocar no state

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
      console.log('deu ruim :(');
    }

    //

    saveExpenses(this.state);

    this.setState({
      id: (id + 1),
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      exchangeRates: {},
    });
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { coins } = this.props;

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
        <button
          type="button"
          onClick={ () => this.addIten() }
        >
          Adicionar despesa
        </button>
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
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(actionGetCoins()),
  saveExpenses: (infos) => dispatch(actionSaveExpenses(infos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
