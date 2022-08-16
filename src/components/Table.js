import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeItemAction, changeButtonAction } from '../redux/actions';

class Table extends Component {
  editItens = (id, expenses) => {
    if (expenses !== undefined) {
      const { remove } = this.props;
      remove(expenses.filter((expense) => expense.id !== id));
    } else {
      const { changeButton } = this.props;
      changeButton(id);
    }
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expen, i) => (
            <tr
              key={ expen.id }
            >
              <td>{ expen.description }</td>
              <td>{ expen.tag }</td>
              <td>{ expen.method }</td>
              <td>{ parseFloat(expen.value).toFixed(2) }</td>
              <td>{ expen.exchangeRates[expenses[i].currency].name }</td>
              <td>
                {
                  parseFloat(expen.exchangeRates[expenses[i].currency].ask).toFixed(2)
                }
              </td>
              <td>
                {
                  (expen.value * expen.exchangeRates[expenses[i].currency].ask).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.editItens(expen.id, expenses) }
                >
                  Excluir
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editItens(i) }
                >
                  Editar
                </button>
              </td>
            </tr>)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
  changeButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (newItens) => dispatch(removeItemAction(newItens)),
  changeButton: (position) => dispatch(changeButtonAction(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
