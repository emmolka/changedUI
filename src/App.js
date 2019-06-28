import React from "react";
import Login from "./Login/Login";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main/Main";
import { Route, Redirect } from "react-router";
import LoginAndAdmin from "./LoginAndAdmin";

const checkLogIn = () => !!window.localStorage.getItem("token");

function App() {
  let isLoggedIn = checkLogIn(); //we check if user is already logged in

  console.log(isLoggedIn);

  return (
    <BrowserRouter /*redirecting to suitable domain*/>
      <Route
        exact
        path="/"
        render={() =>
          isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />
        }
      />

      <Route path="/login" component={LoginAndAdmin} />
      <Route
        path="/main"
        render={props => <Main {...props} isLoggedIn={checkLogIn()} />}
      />
    </BrowserRouter>
  );
}

export default App;
