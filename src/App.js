import React, { useContext } from "react";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import { AuthContextProvider } from "./auth-context.js";
import ProfilePage from "./components/ProfilePage.js";
import ForgotPassword from "./components/ForgotPassword.js";
import NavigationBar from "./components/navbar/NavigationBar.js";
import Expenses from "./components/Expenses.js";
import AuthContext from "./auth-context.js";

function App() {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn)
  return (
    <AuthContextProvider>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route path="/homePage">
            <HomePage />
          </Route>
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/auth">
            <SignUpPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

export default App;
