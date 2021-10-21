import { FirebaseDataProvider } from "react-admin-firebase";
import { config } from "../firebaseConfig";

const options = {
  disableMeta: true,
  persistence: "local",
  logging: true,
  lazyLoading: {
    enabled: false,
  },
};

export const dataProvider = FirebaseDataProvider(config, options);
