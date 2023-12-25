import { NavLink } from "react-router-dom";
import classes from './NavigationBar.module.css'
import AuthContext from "../../auth-context";
import { useContext } from "react";

const NavigationBar = () => {
    const authCtx = useContext(AuthContext)
    const logoutHandler = () => {
        authCtx.logout()
    }
    return(
        <ul className={classes.navList}>
            <li><NavLink to='/homePage'>Home</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><button onClick={logoutHandler}>logout</button></li>
        </ul>
    );
}

export default NavigationBar;