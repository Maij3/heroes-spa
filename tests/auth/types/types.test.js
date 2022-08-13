import { types } from "../../../src/auth/types/types";

describe("types.test", () => {
  //Test #1
  it("Debe de Regresar Estos Types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
  //End Test
});
