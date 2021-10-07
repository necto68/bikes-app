import React, { useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNotify, useCreate } from "react-admin";
import md5 from "md5";
import { USER_ROLES } from "../constants/users";
import { dataProvider } from "../data-provider";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "0 1em 1em 1em",
  },
  input: {
    marginTop: "1em",
  },
  button: {
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Input = ({
  meta: { touched, error }, // eslint-disable-line react/prop-types
  input: inputProps, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

const validate = (values) => {
  const errors = {
    username: undefined,
    password: undefined,
    repeatPassword: undefined,
  };

  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = "Required";
  }
  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Passwords must be the same";
  }

  return errors;
};

export const NewUserForm = (props) => {
  const notify = useNotify();
  const classes = useStyles(props);
  const [nextUserId, setNextUserId] = useState(null);

  const [create, { loading }] = useCreate();

  const fetchId = useCallback(async () => {
    const { data } = await dataProvider.getList("users", {
      pagination: { page: 1, perPage: 1 },
      sort: { field: "username", order: "DESC" },
      filter: {},
    });

    setNextUserId(data[0].id ? data[0].id + 1 : 1);
  }, []);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  const submit = (values) => {
    const { username, password } = values;

    const newUser = {
      id: nextUserId,
      role: USER_ROLES.user,
      username,
      password: md5(password),
    };

    create("users", newUser);
    notify("User was created", "success");
    props.goBackHandler();
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                autoFocus
                id="username"
                name="username"
                component={Input}
                label="Username"
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="password"
                name="password"
                component={Input}
                label="Password"
                type="password"
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="repeatPassword"
                name="repeatPassword"
                component={Input}
                label="Repeat your password"
                type="password"
                disabled={loading}
              />
            </div>
          </div>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              {loading && (
                <CircularProgress
                  className={classes.icon}
                  size={18}
                  thickness={2}
                />
              )}
              Create new user
            </Button>
          </CardActions>
        </form>
      )}
    />
  );
};
