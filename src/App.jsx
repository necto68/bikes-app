import * as React from "react";
import { Admin } from "react-admin";
// import {
//   FirebaseAuthProvider,
// } from "react-admin-firebase";
import { authProvider } from "./auth-provider";
import { dataProvider } from "./data-provider";
import { managerResources } from "./resources/manager";
import { userResources } from "./resources/user";
import { LoginPage } from "./login-page";
import { USER_ROLES } from "./constants/users";
// import { config } from './firebaseConfig';

// const options = {
//   logging: true,
// };

// const authProvider = FirebaseAuthProvider(config, options);

const App = () => (
  <Admin
    loginPage={LoginPage}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    {(permissions) =>
      permissions === USER_ROLES.manager ? managerResources : userResources
    }
  </Admin>
);

export default App;
