import * as React from "react";
import { Resource } from "react-admin";
import { DirectionsBike as DirectionsBikeIcon } from "@material-ui/icons";
import { BikeList, BikeEdit } from "./bikes";

export const userResources = [
  <Resource
    name="bikes"
    list={BikeList}
    edit={BikeEdit}
    icon={DirectionsBikeIcon}
  />,
  <Resource name="users" />,
];
