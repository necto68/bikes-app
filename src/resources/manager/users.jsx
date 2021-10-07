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
  useGetList,
  NumberInput,
  TopToolbar,
  CreateButton,
  required,
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

export const UserCreate = (props) => {
  const { ids, loading, error } = useGetList(
    "users",
    { page: 1, perPage: 1 },
    { field: "id", order: "DESC" }
  );

  if (loading || error) {
    return null;
  }

  const id = ids.length ? ids[0] + 1 : 1;

  return (
    <Create {...props} transform={createOrEditTransform}>
      <SimpleForm redirect="list" initialValues={() => ({ id })}>
        <NumberInput disabled source="id" validate={required()} />
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
};
