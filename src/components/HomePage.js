import classes from './HomePage.module.css'
import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {

  const verifyEmailHandler = async() => {
    try{
      const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4',{
        method: 'POST',
        body: JSON.stringify({requestType: "VERIFY_EMAIL", idToken: localStorage.getItem('token')}),
        headers: {'Content-Type': 'application/json'}
      })
      if(!resp.ok){
        throw new Error('Email Verification Failed!')
      }
      const data = await resp.json()
      console.log(data)
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.upper_container}>
        <p>WelCome to Expense Tracker !!</p>
        <p>
          Your Profile is incomplete.<NavLink to="/profile">Complete Now</NavLink>
        </p>
      </div>
        <hr />
      <div>
        <button onClick={verifyEmailHandler}>Verify Email</button>
      </div>
    </div>
  );
};

export default HomePage;
