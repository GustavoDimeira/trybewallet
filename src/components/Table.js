import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeItemAction, changeButtonAction } from '../redux/actions';

class Table extends Component {
  editItens = (id, boolean, expenses) => {
    const { changeButton } = this.props;
    if (expenses) {
      const { remove } = this.props;
      remove(expenses.filter((expense) => expense.id !== id));
    }
    changeButton(id, boolean);
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead className="main-th">
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
              <td>
                {
                  (expen.description === '') ? (
                    'Sem descrição'
                  ) : (
                    expen.description
                  )
                }
              </td>
              <td>{ expen.tag }</td>
              <td>{ expen.method }</td>
              <td>
                {
                  parseFloat(expen.value).toFixed(2)
                }
              </td>
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
                  className="btn-remove"
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.editItens(expen.id, false, expenses) }
                >
                  Excluir
                </button>
                <button
                  className="btn-edit"
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editItens(i, true) }
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
  changeButton: (position, boolean) => dispatch(changeButtonAction(position, boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
