import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveEmailAction } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  }

  emailValidation = (email) => {
    const test1 = email.split('@');
    const test2 = email.split('.');
    const value1 = (test1[0] !== undefined && test1[1] !== undefined);
    const value12 = (test1[0] !== '' && test1[1] !== '');
    const value2 = (test2[0] !== undefined && test2[1] !== undefined);
    const value22 = (test2[0] !== '' && test2[1] !== '');
    return (value1 && value2 && value12 && value22);
  }

  validationCamps = () => {
    const { email, password } = this.state;
    const minLength = 4;
    if (password.length > minLength && this.emailValidation(email)) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
    this.validationCamps();
  }

  loggin = (email) => {
    const { history, saveEmail } = this.props;
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <input
            type="email"
            value={ email }
            onChange={ ({ target }) => this.handleChange(target.type, target.value) }
            data-testid="email-input"
            placeholder="Email"
          />
          <input
            type="password"
            value={ password }
            onChange={ ({ target }) => this.handleChange(target.type, target.value) }
            data-testid="password-input"
            placeholder="Senha"
          />
          <button
            type="submit"
            disabled={ disabled }
            onClick={ () => this.loggin(email) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => { dispatch(saveEmailAction(email)); },
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
