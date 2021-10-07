import * as React from "react";
import { Resource } from "react-admin";
import {
  People as PeopleIcon,
  DirectionsBike as DirectionsBikeIcon,
} from "@material-ui/icons";
import { BikeList, BikeCreate, BikeEdit } from "./bikes";
import { UserList, UserCreate } from "./users";

export const managerResources = [
  <Resource
    name="bikes"
    list={BikeList}
    create={BikeCreate}
    edit={BikeEdit}
    icon={DirectionsBikeIcon}
  />,
  <Resource
    name="users"
    list={UserList}
    create={UserCreate}
    icon={PeopleIcon}
  />,
];
