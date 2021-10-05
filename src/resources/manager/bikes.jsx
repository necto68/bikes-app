import {
  ArrayField,
  Create,
  Datagrid,
  DateField,
  DateTimeInput,
  Edit,
  List,
  ReferenceField,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { ColorField, ColorInput } from "react-admin-color-input";
import * as React from "react";

export const BikeList = (props) => (
  <List filters={bikeFilters} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="model" />
      <ColorField source="color" />
      <TextField source="location" />
      <RatingField source="rating" />
      <ArrayField source="bookings">
        <Datagrid>
          <ReferenceField label="User" source="userId" reference="users">
            <TextField source="login" />
          </ReferenceField>
          <DateField source="start" showTime />
          <DateField source="end" showTime />
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>
);

export const BikeCreate = (props) => (
  <Create {...props}>
    <SimpleForm initialValues={() => ({ rating: [] })}>
      <TextInput source="id" />
      <TextInput source="model" />
      <ColorInput source="color" />
      <TextInput source="location" />
      <DateTimeInput source="period" />
    </SimpleForm>
  </Create>
);

export const BikeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="model" />
      <ColorInput source="color" />
      <TextInput source="location" />
    </SimpleForm>
  </Edit>
);
