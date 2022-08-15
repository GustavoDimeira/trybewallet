import App from "../App";
import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndRedux } from "./helpers/renderWith";
import mockData from './helpers/mockData';
import { Component } from "react/cjs/react.production.min";

describe("Testando a pagina Wallet", () => {
  test("Campos e função do bota Adicionar despesa", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const gastos = screen.getByPlaceholderText(/gastos/i);
    const descricao = screen.getByPlaceholderText(/descrição/i);
    const currency = screen.getByTestId(/currency-input/i);
    const method = screen.getByTestId(/method-input/i);
    const tag = screen.getByTestId(/tag-input/i);
    const button = screen.getByText(/adicionar despesa/i);

    userEvent.type(gastos, /10/i);
    userEvent.type(descricao, /descricao teste/i);
    
    userEvent.click(method);
    const optionMethod = screen.getByText(/Cartão de crédito/i);
    userEvent.click(optionMethod);

    userEvent.click(tag);
    const tapOption = screen.getByText(/Lazer/i);
    userEvent.click(tapOption);
    
    userEvent.click(button);
    
    expect(gastos.value).toBe('');
    expect(descricao.value).toBe('');
    expect(currency.value).toBe('');
    expect(method.value).toBe('Dinheiro');
    expect(tag.value).toBe('Alimentação');
  });
});