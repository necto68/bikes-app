import md5 from "md5";
import { dataProvider } from "../data-provider";

export const authProvider = {
  login: async ({ username, password }) => {
    const { data } = await dataProvider.getList("users", {
      pagination: { page: 1, perPage: 1 },
      sort: { field: "username", order: "ASC" },
      filter: {
        username,
        password: md5(password),
      },
    });

    if (data.length) {
      const { id, role, username: login } = data[0];

      localStorage.setItem(
        "auth",
        JSON.stringify({ id, role, username: login })
      );

      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, username } = JSON.parse(localStorage.getItem("auth"));

      return Promise.resolve({ id, fullName: username });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    try {
      const { role } = JSON.parse(localStorage.getItem("auth"));

      return Promise.resolve(role);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
