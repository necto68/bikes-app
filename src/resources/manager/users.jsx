import {
  Create,
  Datagrid,
  List,
  PasswordInput,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import * as React from "react";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <SelectField
        source="role"
        choices={[
          { id: 0, name: "User" },
          { id: 1, name: "Manager" },
        ]}
      />
      <TextField source="login" />
      <TextField source="password" />
      {/* <ArrayField source="bookings"> */}
      {/*  <Datagrid> */}
      {/*    <ReferenceField label="User" source="userId" reference="users"> */}
      {/*      <TextField source="login" /> */}
      {/*    </ReferenceField> */}
      {/*    <DateField source="start" showTime /> */}
      {/*    <DateField source="end" showTime /> */}
      {/*  </Datagrid> */}
      {/* </ArrayField> */}
    </Datagrid>
  </List>
);

export const UserCreate = (props) => {
  console.log(props);

  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <SelectInput
          source="role"
          choices={[
            { id: 0, name: "User" },
            { id: 1, name: "Manager" },
          ]}
        />
        <TextInput source="username" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
  );
};
