import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("SearchPage.test", () => {
  beforeEach(() => jest.clearAllMocks());

  //Test #1
  it("Debe de Mostrarse Correctamente con Valores por Defectos", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    screen.debug();
    expect(container).toMatchSnapshot();
  });
  //Text #2
  it("Debe de Mostrar a Batman y el input con el valor queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");
    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    const alert = screen.getByLabelText("alert-danger");
    console.log(alert.style.display);
    expect(alert.style.display).toBe("none");
  });
  //Test #3
  it("Debe de Mostrar un Error si no Encuentra el Hero", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    screen.debug();
    const alert = screen.getByLabelText("alert-danger");
    console.log(alert.style.display);
    expect(alert.style.display).toBe("");
  });
  //Text #4
  it("Debe de Llamar el Navigate a la Pantalla Nueva", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    //screen.debug();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: "superman" },
    });
    const form = screen.getByLabelText("form");
    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman");
  });
  //End Test
});
