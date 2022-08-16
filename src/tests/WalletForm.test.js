import App from "../App";
import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndRedux } from "./helpers/renderWith";

describe("Testando a pagina Wallet", () => {
  test("Campos e botões", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const gastos = screen.getByPlaceholderText(/gastos/i);
    const descricao = screen.getByPlaceholderText(/descrição/i);
    const currency = screen.getByTestId(/currency-input/i);
    const method = screen.getByTestId(/method-input/i);
    const tag = screen.getByTestId(/tag-input/i);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(gastos, /10/i);
    userEvent.type(descricao, /descricao teste/i);
    userEvent.selectOptions(currency, 'CAD');
    userEvent.selectOptions(method, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Trabalho');

    userEvent.click(button);
    
    expect(gastos.value).toBe('');
    expect(descricao.value).toBe('');
    expect(currency.value).toBe('');
  });
});