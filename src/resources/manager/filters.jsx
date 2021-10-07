import * as React from "react";
import { FilterList, FilterListItem, useGetList } from "react-admin";
import { Card as MuiCard, CardContent, withStyles } from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";
import { USER_ROLES } from "../../constants/users";

const Card = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      order: -1,
      width: "15em",
      marginRight: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))(MuiCard);

export const ManagerFilters = () => {
  const { data, ids, loading, error } = useGetList(
    "users",
    { page: 1, perPage: 100 },
    { field: "id", order: "ASC" },
    { role: USER_ROLES.user }
  );

  if (loading || error) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <FilterList label="User" icon={<PersonIcon />}>
          {ids.map((id) => (
            <FilterListItem
              key={id}
              label={data[id].username}
              value={{ "reservations.userId": id }}
            />
          ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};
