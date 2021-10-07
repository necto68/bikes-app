import * as React from "react";
import { useCallback, useState } from "react";
import { Login, LoginForm } from "react-admin";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NewUserForm } from "./new-user-form";

const useStyles = makeStyles(() => ({
  button: {
    width: "100%",
  },
}));

export const LoginPage = (props) => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const classes = useStyles(props);
  const handleNewUserClick = useCallback(() => {
    setShowNewUserForm(true);
  }, [setShowNewUserForm]);
  const handleGoBackClick = useCallback(() => {
    setShowNewUserForm(false);
  }, [setShowNewUserForm]);

  return (
    <Login {...props}>
      {showNewUserForm ? (
        <NewUserForm goBackHandler={handleGoBackClick} />
      ) : (
        <>
          <Typography style={{ textAlign: "center" }}>admin / admin</Typography>
          <LoginForm />
        </>
      )}
      {showNewUserForm ? (
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          className={classes.button}
          onClick={handleGoBackClick}
        >
          Go back
        </Button>
      ) : (
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          className={classes.button}
          onClick={handleNewUserClick}
        >
          Create new user
        </Button>
      )}
    </Login>
  );
};
