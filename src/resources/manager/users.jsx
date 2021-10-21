import * as React from "react";
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
  TopToolbar,
  CreateButton,
  required,
  Edit,
} from "react-admin";
import md5 from "md5";
import { userRoleChoices } from "../../constants/users";

export const UserList = (props) => (
  <List
    actions={
      <TopToolbar>
        <CreateButton />
      </TopToolbar>
    }
    {...props}
  >
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <SelectField source="role" choices={userRoleChoices} />
      <TextField source="username" />
      <TextField label="Password (hash)" source="password" />
    </Datagrid>
  </List>
);

const createOrEditTransform = (data) => ({
  ...data,
  password: md5(data.password),
});

export const UserCreate = (props) => (
  <Create {...props} transform={createOrEditTransform}>
    <SimpleForm redirect="list">
      <SelectInput
        source="role"
        choices={userRoleChoices}
        validate={required()}
      />
      <TextInput source="username" validate={required()} />
      <PasswordInput source="password" validate={required()} />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props} transform={createOrEditTransform}>
    <SimpleForm>
      <TextField source="id" />
      <SelectInput
        disabled
        source="role"
        choices={userRoleChoices}
        validate={required()}
      />
      <TextInput source="username" validate={required()} />
      <PasswordInput source="password" validate={required()} />
    </SimpleForm>
  </Edit>
);
