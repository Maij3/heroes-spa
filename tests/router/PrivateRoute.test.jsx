import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe("PrivateRoute.test", () => {
  Storage.prototype.setItem = jest.fn();
  it("Debe de Mostrar el Children si Esta Autenticado", () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: "abd",
          name: "Jaime",
        },
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Ruta Privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta Privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath' , '/search?q=batman');
  });
});
