import React from "react";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import {AuthContextProvider} from './auth-context.js'
import ProfilePage from "./components/ProfilePage.js";


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
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path='/'>
          <Redirect to='/auth'/>
        </Route>
      </Switch>
    </div>
    </AuthContextProvider>
  );
}

export default App;