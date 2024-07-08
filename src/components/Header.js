import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let soma = 0;

class Header extends Component {
  emailValidation = (email) => {
    if (email === '') {
      return ('Nenhum email cadastrado');
    }
    return email;
  };

  render() {
    const { email, values } = this.props;
    soma = 0;

    values.forEach((obj) => {
      const multiplyer = obj.exchangeRates[obj.currency].ask;
      const ammount = obj.value;
      soma += multiplyer * ammount;
    });

    return (
      <header id="header">
        <p data-testid="email-field">
          { this.emailValidation(email) }
        </p>
        <p data-testid="total-field">
          { soma.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
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
