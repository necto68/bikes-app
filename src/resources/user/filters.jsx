import * as React from "react";
import { FilterList, FilterListItem, useGetIdentity } from "react-admin";

import { Card as MuiCard, CardContent, withStyles } from "@material-ui/core";
import {
  Book as BookIcon,
  DirectionsBike as DirectionBikeIcon,
  ColorLens as ColorLensIcon,
  LocationOn as LocationOnIcon,
  Star as StarIcon,
} from "@material-ui/icons";
import {
  bikeModelChoices,
  bikeColorChoices,
  bikeLocationChoices,
  bikeRatingChoices,
} from "../../constants/bikes";

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

export const UserFilters = () => {
  const { identity, loading } = useGetIdentity();

  if (loading) {
    return null;
  }

  const { id: userId } = identity;
  return (
    <Card>
      <CardContent>
        <FilterList label="Reservations" icon={<BookIcon />}>
          <FilterListItem
            label="My"
            value={{ "reservations.userId": userId }}
          />
        </FilterList>
        <FilterList label="Model" icon={<DirectionBikeIcon />}>
          {bikeModelChoices.map(({ id, name }) => (
            <FilterListItem key={id} label={name} value={{ model: id }} />
          ))}
        </FilterList>
        <FilterList label="Color" icon={<ColorLensIcon />}>
          {bikeColorChoices.map(({ id, name }) => (
            <FilterListItem key={id} label={name} value={{ color: id }} />
          ))}
        </FilterList>
        <FilterList label="Location" icon={<LocationOnIcon />}>
          {bikeLocationChoices.map(({ id, name }) => (
            <FilterListItem key={id} label={name} value={{ location: id }} />
          ))}
        </FilterList>
        <FilterList label="Rating" icon={<StarIcon />}>
          {bikeRatingChoices
            .slice(0, bikeRatingChoices.length - 1)
            .reverse()
            .map(({ id, name }) => (
              <FilterListItem
                key={id}
                label={`${name}+`}
                value={{ rating_gte: id }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};
