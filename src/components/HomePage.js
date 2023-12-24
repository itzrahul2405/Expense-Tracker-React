import classes from './HomePage.module.css'
import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.upper_container}>
        <p>WelCome to Expense Tracker !!</p>
        <p>
          Your Profile is incomplete.<NavLink to="/profile">Complete Now</NavLink>
        </p>
      </div>
        <hr />
    </div>
  );
};

export default HomePage;
