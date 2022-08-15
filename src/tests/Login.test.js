import App from "../App";
import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndRedux } from "./helpers/renderWith";

describe("Testando a pagina de Login", () => {
  test("Botão é habilitado e desabilitado nos momentos corretos", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId("email-input")
    const senha = screen.getByTestId("password-input")
    const button = screen.getByRole("button", {name: /entrar/i});

    expect(button.disabled).toBe(true);

    userEvent.type(email, 'a@a.com');
    userEvent.type(senha, '123456');

    expect(button.disabled).toBe(false);

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
