import React, { Component } from 'react';
import { FormErrors } from './FormErrors/FormErrors.js';
import './Form.css';
import authorization from '../../api/authorization.js';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {[name]: value}, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || value.length === 0;
        fieldValidationErrors.email = emailValid ? '' : 'Укажите корректный email адрес';
        break;
      case 'password':
        passwordValid = value.length >= 8 || value.length === 0;
        fieldValidationErrors.password = passwordValid ? '': 'Пароль должен быть не менее 8 символов';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  submitForm = (e) => {
    e.preventDefault();
    const userData ={email: this.state.email, password: this.state.password};
    authorization(userData).then(function (response) {
      if ("success" === response.data.status){
        alert('Добро пожаловать!');
      }else{
        alert('Такого пользователя не существует');
      }
    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form>
        <h2>Вход</h2>
        <p>Для существующих пользователей</p>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">E-Mail: </label>
          <input type="email" required className="form-control" name="email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
          <FormErrors formErrors={this.state.formErrors.email} />  
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Пароль: </label>
          <input type="password" className="form-control" name="password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
          <FormErrors formErrors={this.state.formErrors.password} />
        </div>
        <button type="submit" onClick={this.submitForm} className="btn btn-primary" disabled={!this.state.formValid}>Войти в систему</button>
      </form>
    )
  }
}

export default Form;
