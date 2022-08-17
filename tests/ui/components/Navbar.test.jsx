import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Navbar.test", () => {
  //Test#1
  it("Debe de Mostrar el Nombre del Usuario", () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: "abc",
          name: "Maria Fernanda",
        },
      },
    };
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    //screen.debug();
    expect(screen.getByText("Maria Fernanda")).toBeTruthy();
  });
  //Test#2
  it("Debe de Llamar el Logout y Navigate Cuando se Hace Click en el boton ", () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: "ABC",
          name: "Santiago Andres Rodriguez Rangel",
        },
      },
      logout: jest.fn(),
    };
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    //screen.debug();
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {
      replace: "true",
    });
  });
  //End Test
});
