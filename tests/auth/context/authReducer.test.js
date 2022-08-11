import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("authReducer.test", () => {
  //Prueba #1
  it("Debe de Retornar el Estado por Defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  //Prueba #2
  it("Debe del Login Llamar el Autenticar y Establecer el User", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Jaime",
        id: "123",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });
  //Prueba #3
  it("Debe de Logout Borrar el Name del Usuario y Logged en False", () => {
    const state = {
      logged: true,
      user: { id: "123", name: "Juan" },
    };

    const action = {
      type: types.logout,
    };
    const newState = authReducer(state, action);
    expect(newState).toEqual({ logged: false });
  });
  //Fin Test
});
