import * as React from "react";
import {
  ArrayField,
  Create,
  Datagrid,
  DateField,
  BooleanInput,
  Edit,
  List,
  ReferenceField,
  SimpleForm,
  TextField,
  BooleanField,
  EditButton,
  useListFilterContext,
  SelectField,
  SelectInput,
  CreateButton,
  TopToolbar,
  required,
} from "react-admin";
import { ColorField } from "react-admin-color-input";
import { useCallback } from "react";
import { ManagerFilters } from "./filters";
import {
  bikeModelChoices,
  bikeColorChoices,
  bikeLocationChoices,
} from "../../constants/bikes";

const BikePanel = () => {
  const { filterValues } = useListFilterContext();

  const getRowStyle = useCallback(
    (record) => ({
      backgroundColor:
        record.userId === filterValues["reservations.userId"]
          ? "#efe"
          : "white",
    }),
    [filterValues]
  );

  return (
    <ArrayField source="reservations">
      <Datagrid rowStyle={getRowStyle}>
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <DateField source="start" />
        <DateField source="end" />
      </Datagrid>
    </ArrayField>
  );
};

export const BikeList = (props) => (
  <List
    aside={<ManagerFilters />}
    actions={
      <TopToolbar>
        <CreateButton />
      </TopToolbar>
    }
    {...props}
  >
    <Datagrid
      rowClick="expand"
      expand={<BikePanel />}
      isRowExpandable={(row) => Boolean(row.reservations.length)}
    >
      <TextField source="id" />
      <SelectField source="model" choices={bikeModelChoices} />
      <ColorField source="color" />
      <SelectField source="location" choices={bikeLocationChoices} />
      <TextField source="rating" emptyText="N/A" />
      <BooleanField label="Available?" source="isAvailable" />
      <TextField label="Reservations" source="reservations.length" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BikeCreate = (props) => (
  <Create {...props}>
    <SimpleForm
      redirect="list"
      initialValues={() => ({
        rating: "",
        ratingSource: [],
        reservations: [],
      })}
    >
      <SelectInput
        source="model"
        choices={bikeModelChoices}
        validate={required()}
      />
      <SelectInput
        source="color"
        choices={bikeColorChoices}
        validate={required()}
      />
      <SelectInput
        source="location"
        choices={bikeLocationChoices}
        validate={required()}
      />
      <BooleanInput source="isAvailable" defaultValue validate={required()} />
    </SimpleForm>
  </Create>
);

export const BikeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <SelectInput source="model" choices={bikeModelChoices} />
      <SelectInput source="color" choices={bikeColorChoices} />
      <SelectInput source="location" choices={bikeLocationChoices} />
      <BooleanInput source="isAvailable" />
    </SimpleForm>
  </Edit>
);
