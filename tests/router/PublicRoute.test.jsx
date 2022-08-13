import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import { Routes, Route, MemoryRouter } from "react-router-dom";
describe("PublicRoute.test", () => {
  //Test #1
  it("Debe de Mostrar el Children si no Esta Autenticado", () => {
    const contextValue = {
      authState: {
        logged: false,
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta Publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta Publica")).toBeTruthy();
  });
  //Test #2
  it("Debe de Navegar si Esta Autenticado", () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: "Jaime",
          name: "ABC123",
        },
      },
      login: jest.fn(),
      logout: jest.fn(),
    };
    render(
      <>
        <AuthContext.Provider value={contextValue}>
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <h1>Ruta Publica</h1>
                  </PublicRoute>
                }
              />
              <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      </>
    );
    screen.debug();
    expect(screen.getByText("Pagina Marvel")).toBeTruthy();
  });
  //End Test
});
