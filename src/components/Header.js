import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let soma = 0;
let position = 0;

class Header extends Component {
  render() {
    const { email, values } = this.props;
    if (values[position] !== undefined) {
      const { currency, value, exchangeRates } = values[position];
      const finalAdd = (parseFloat(exchangeRates[currency].ask)) * value;
      soma += finalAdd;
      position += 1;
    }
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { soma.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
