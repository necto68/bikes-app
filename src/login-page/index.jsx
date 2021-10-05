// LoginPage.js
import React from "react";
import { Login, LoginForm as DefaultLoginForm } from "react-admin";

const LoginForm = (props) => (
  <div>
    <div style={{ fontFamily: "monospace", marginLeft: "15px" }}>
      <p>Username: test@example.com</p>
      <p>Password: password</p>
    </div>
    <DefaultLoginForm {...props} />
  </div>
);

const LoginPage = (props) => <Login loginForm={<LoginForm />} {...props} />;

export default LoginPage;
