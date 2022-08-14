import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionGetCoins } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesas: '',
    despesasDescricao: '',
    pagamento: 'Dinheiro',
    categoria: 'Alimentação',
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

  render() {
    const { despesas, despesasDescricao, pagamento, categoria } = this.state;
    const { coins } = this.props;

    return (
      <form>
        <input
          type="text"
          name="despesas"
          value={ despesas }
          data-testid="value-input"
          placeholder="Gastos"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        />
        <input
          type="text"
          name="despesasDescricao"
          value={ despesasDescricao }
          data-testid="description-input"
          placeholder="Descrição"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        />
        <select
          name="coin"
          data-testid="currency-input"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
        >
          { coins.map((coin) => (<option key={ coin }>{ coin }</option>)) }
        </select>
        <select
          name="pagamento"
          data-testid="method-input"
          onChange={ ({ target }) => this.changeState(target.value, target.name) }
          value={ pagamento }
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
          name="categoria"
          data-testid="tag-input"
          type="dropdown"
          value={ categoria }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
