import React from "react";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import {AuthContextProvider} from './auth-context.js'


function App() {
  return (
    <AuthContextProvider>
    <div className="App">
      <Switch>
        <Route path="/homePage">
          <HomePage />
        </Route>
        <Route path="/auth">
          <SignUpPage />
        </Route>
      </Switch>
    </div>
    </AuthContextProvider>
  );
}

export default App;
