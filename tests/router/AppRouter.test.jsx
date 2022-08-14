import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe("AppRouter.test", () => {
  //Inicializacion
  //Test #1
  it("Debe de Mostrar el Login si no Esta Autenticado", () => {
    const contextValue = {
      authState: {
        logged: false,
      },
      logged: false,
    };
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Login").length).toBe(2);
  });
  //Test #2
  it("Debe de Mostrar el Componente de Marvel si esta Autenticado", () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: "ABC",
          name: "Juan Carlos",
        },
      },
    };
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
  //End Test
});
