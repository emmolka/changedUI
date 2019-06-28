import React from "react";
import { Row, Col, Inputs, LoginCore } from "adminlte-2-react";
import { ErrorMessage, Formik, Form as FormikForm, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const { Text } = Inputs;
console.log(Text);
class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  setEmail = event => {
    console.log(event.currentTarget.value);
    this.setState({
      email: event.currentTarget.value
    });
  };
  setPassword = event => {
    console.log(event.currentTarget.value);
    this.setState({
      password: event.currentTarget.value
    });
  };
  logIn = async event => {
    try {
      const data = await axios.post(
        "https://api.shipments.test-y-sbm.com/login",
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      const result = data.data.data[0];

      localStorage.setItem(
        "token",
        JSON.stringify(result.token).replace(/\"/g, "")
      );

      this.props.history.push("/main");
    } catch (e) {
      alert("Username or password incorrect");
    }
  };

  render() {
    const { state } = this;

    return (
      <Row>
        <Col xs={12} md={8}>
          <LoginCore>
            <p className="login-box-msg">Login to move forward</p>
            <Formik>
              <FormikForm
                className="Form"
                onSubmit={e => {
                  e.preventDefault();
                  this.logIn();
                }}
                key="formik-field"
              >
                <Text
                  key="email-field"
                  name="email"
                  label="E-mail"
                  labelPosition="above"
                  placeholder="email@email.com"
                  iconRight="fas-envelope"
                  value={state.email}
                  onChange={event => {
                    this.setEmail(event);
                  }}
                />

                <ErrorMessage
                  className="help-block validacao-erro"
                  component="span"
                  name="email"
                  key="error-message"
                />

                <Text
                  key="password-field"
                  name="password"
                  label="Password"
                  labelPosition="above"
                  placeholder="Password"
                  iconRight="fas-lock"
                  value={state.password}
                  onChange={event => {
                    this.setPassword(event);
                  }}
                />

                <ErrorMessage
                  className="help-block text-center validacao-erro "
                  component="span"
                  name="password"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Log In
                </button>
              </FormikForm>
            </Formik>
            <p>- OR -</p>
            <a
              href="#"
              className="btn btn-block btn-social btn-facebook btn-flat"
            >
              <FontAwesomeIcon
                style={{ marginTop: 5 }}
                icon={["fab", "facebook"]}
              />
              Sign in using Facebook
            </a>
            <a
              href="#"
              className="btn btn-block btn-social btn-google btn-flat"
            >
              <FontAwesomeIcon
                style={{ marginTop: 5 }}
                icon={["fab", "google-plus"]}
              />
              Sign in using Google+
            </a>
          </LoginCore>
        </Col>
      </Row>
    );
  }
}

export default Login;
