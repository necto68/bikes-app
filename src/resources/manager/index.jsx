import { Resource } from "react-admin";
import * as React from "react";
import { BikeCreate, BikeEdit, BikeList } from "../bikes";
import { UserCreate, UserList } from "../users";

export const managerResources = [
  <Resource name="bikes" list={BikeList} create={BikeCreate} edit={BikeEdit} />,
  <Resource name="users" list={UserList} create={UserCreate} />,
];
