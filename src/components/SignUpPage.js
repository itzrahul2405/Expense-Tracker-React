import classes from "./SignUpPage.module.css";
import React, { useContext, useState } from "react";
import AuthContext from "../auth-context";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {
    const [haveAccount, setHaveAccount] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const authCtx = useContext(AuthContext)
    const history = useHistory()

    const accountExistenseHandler = () => {
        setHaveAccount(!haveAccount)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            let url;
            let body;
            if(!haveAccount){
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4'
                if(password === confirmPassword){
                    body = {email: email, password: password, returnSecureToken: true}
                }
                else{
                    alert('Kindly, Check Your Password!')
                    return
                }
            }
            else{
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4'
                body = {email: email, password: password, returnSecureToken: true}
            }
    
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            })

            const data = await response.json()
            console.log(data)

            if(!response.ok){
                alert(data.error.message)
                throw new Error(`Something Went Wrong!! ${data.error.message}`)
            }



            authCtx.login(data.idToken);
            history.replace('/homePage')

            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
        catch(error){
            console.log(error.message)
        }


    }

  return (
    <div className={classes.container}>
        <form className={classes.signup_form} onSubmit={submitHandler}>
            {!haveAccount ? <h1>Sign Up</h1> : <h1>Log In</h1>}
            <div>
                <label htmlFor="e-mail">Enter Email: </label>
                <input
                    type="email"
                    name="email"
                    id="e-mail"
                    placeholder="enter email"
                    required
                    onChange={emailHandler}
                />        
            </div>
            <div>
                <label htmlFor="password">Enter Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="enter password"
                    required
                    onChange={passwordHandler}
                />
            </div>
            {!haveAccount && <div>
                <label htmlFor="confirm-password">Confirm Password: </label>
                <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="please confirm password"
                    required
                    onChange={confirmPasswordHandler}
                />
            </div>}
            <button type="submit">{!haveAccount ? 'Sign Up ': 'Log In'}</button>
            {haveAccount && <a href="/forgot-password">forgot password</a>}


            {!haveAccount ? <p>Have an account <button onClick={accountExistenseHandler}>login</button></p> : <p>Not have an account <button onClick={accountExistenseHandler}>SignUp</button></p>}

        </form>
    </div>
  );
};

export default SignUpPage;
