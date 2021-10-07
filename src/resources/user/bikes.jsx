import React, { useCallback } from "react";
import {
  Datagrid,
  Edit,
  List,
  SelectField,
  SimpleForm,
  TextField,
  SelectInput,
  useRecordContext,
  useGetIdentity,
  FormDataConsumer,
  Toolbar,
  SaveButton,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  required,
  BooleanField,
  Labeled,
} from "react-admin";
import { CardContent } from "@material-ui/core";
import { Field } from "react-final-form";
import { ColorField } from "react-admin-color-input";
import {
  isBefore,
  isAfter,
  parseISO,
  areIntervalsOverlapping,
  startOfDay,
} from "date-fns";

import { UserFilters } from "./filters";
import {
  bikeModelChoices,
  bikeLocationChoices,
  bikeRatingChoices,
} from "../../constants/bikes";

const shouldBeLessThanEnd =
  (end, message = "Start date should be less then end date") =>
  (value) =>
    isAfter(parseISO(value), parseISO(end)) ? message : undefined;
const shouldBeGreaterThanStart =
  (start, message = "End date should be greater then start date") =>
  (value) =>
    isBefore(parseISO(value), parseISO(start)) ? message : undefined;
const shouldBeGreaterThanNow =
  (message = "Date shouldn't be in past") =>
  (value) =>
    isBefore(parseISO(value), startOfDay(Date.now())) ? message : undefined;

const shouldNotBeOverlapped =
  (
    reservations,
    message = "Your reservation range is overlapped with another reservation"
  ) =>
  () => {
    let isOverlapped = false;

    for (let i = 0; i < reservations.length; i += 1) {
      for (let j = i + 1; j < reservations.length; j += 1) {
        const leftStart = parseISO(reservations[i]?.start);
        const leftEnd = parseISO(reservations[i]?.end);

        const rightStart = parseISO(reservations[j]?.start);
        const rightEnd = parseISO(reservations[j]?.end);

        const intervalLeft = { start: leftStart, end: leftEnd };
        const intervalRight = { start: rightStart, end: rightEnd };

        try {
          isOverlapped = areIntervalsOverlapping(intervalLeft, intervalRight);
          // eslint-disable-next-line no-empty
        } catch (e) {}

        if (isOverlapped) {
          break;
        }
      }
    }

    return isOverlapped ? message : undefined;
  };

const getAverageRating = (ratingSource) => {
  const ratingSourceValues = ratingSource
    .map(({ value }) => value)
    .filter(Boolean);
  const sum = ratingSourceValues.reduce((acc, curr) => acc + curr ?? 0, 0);

  return (sum / ratingSourceValues.length).toFixed(2);
};

const editTransform = (data) => ({
  ...data,
  rating: getAverageRating(data.ratingSource),
});

const UserRatingInput = (props) => {
  const { identity, loading } = useGetIdentity();
  const { ratingSource } = useRecordContext();

  if (loading) {
    return null;
  }

  const { id } = identity;

  const usersRatingIndex = ratingSource.findIndex(
    ({ userId }) => userId === id
  );

  const hasUserRated = usersRatingIndex > -1;
  const inputIndex = hasUserRated ? usersRatingIndex : ratingSource.length;

  return (
    <CardContent>
      <FormDataConsumer {...props}>
        {({ formData }) =>
          formData.ratingSource[inputIndex]?.value ? (
            <Field
              hidden
              component="input"
              type="number"
              name={`ratingSource.${inputIndex}.userId`}
              initialValue={id}
            />
          ) : null
        }
      </FormDataConsumer>
      <SelectInput
        label={hasUserRated ? "Your rate" : "Rate this bike"}
        source={`ratingSource.${inputIndex}.value`}
        choices={bikeRatingChoices}
        {...props}
      />
    </CardContent>
  );
};

const ReservationsInput = (props) => {
  const { identity, loading } = useGetIdentity();
  const id = identity?.id;

  const disableRemove = useCallback(
    (record) => ("userId" in record ? record.userId !== id : false),
    [id]
  );

  const {
    record: { isAvailable },
  } = props;

  if (!isAvailable) {
    return (
      <Labeled label="Reservations">
        <TextField
          source="reservations"
          record={{
            reservations: "Sorry, this bike is not available for reservation",
          }}
        />
      </Labeled>
    );
  }

  const renderFormDataConsumer = ({ getSource, scopedFormData, formData }) => {
    const userId = scopedFormData?.userId ?? id;
    const start = scopedFormData?.start ?? "";
    const end = scopedFormData?.end ?? "";
    const reservations = formData?.reservations ?? [];

    return userId === id ? (
      <CardContent>
        <Field
          hidden
          component="input"
          type="number"
          name={getSource("userId")}
          initialValue={id}
        />
        <DateInput
          label="Start"
          source={getSource("start")}
          formatOnBlur={false}
          validate={[
            required(),
            shouldBeLessThanEnd(end),
            shouldBeGreaterThanNow(),
            shouldNotBeOverlapped(reservations),
          ]}
        />
        <DateInput
          label="End"
          source={getSource("end")}
          formatOnBlur={false}
          validate={[
            required(),
            shouldBeGreaterThanStart(start),
            shouldBeGreaterThanNow(),
            shouldNotBeOverlapped(reservations),
          ]}
        />
      </CardContent>
    ) : (
      <CardContent>
        <DateInput label="Start" disabled source={getSource("start")} />
        <DateInput label="End" disabled source={getSource("end")} />
      </CardContent>
    );
  };

  if (loading) {
    return null;
  }

  return (
    <ArrayInput source="reservations" {...props}>
      <SimpleFormIterator disableReordering disableRemove={disableRemove}>
        <FormDataConsumer>{renderFormDataConsumer}</FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export const BikeList = (props) => (
  <List
    aside={<UserFilters />}
    bulkActionButtons={false}
    actions={false}
    {...props}
  >
    <Datagrid rowClick="edit">
      <SelectField source="model" choices={bikeModelChoices} />
      <ColorField source="color" />
      <SelectField source="location" choices={bikeLocationChoices} />
      <TextField source="rating" emptyText="N/A" />
      <BooleanField label="Available?" source="isAvailable" />
    </Datagrid>
  </List>
);

export const BikeEdit = (props) => (
  <Edit {...props} transform={editTransform}>
    <SimpleForm
      toolbar={
        <Toolbar>
          <SaveButton />
        </Toolbar>
      }
      validateOnBlur
    >
      <SelectField source="model" choices={bikeModelChoices} />
      <ColorField source="color" />
      <SelectField source="location" choices={bikeLocationChoices} />
      <TextField source="rating" emptyText="N/A" />
      <UserRatingInput />
      <ReservationsInput />
    </SimpleForm>
  </Edit>
);
