import { useState } from 'react'
import classes from './ForgotPassword.module.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const forgotPasswordHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4',{
            method: 'POST',
            body: JSON.stringify({requestType: "PASSWORD_RESET", email: email}),
            headers: {'Content-Type': 'application/json'}
        })
        .then((resp) => {
            if(!resp.ok){
                throw new Error('forgot password failed!')
            }

            return resp.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => console.log(err.message))

        setEmail('')
    }

    return(
        <div className={classes.ForgotPassword_container}>
            <label id='e-mail'>Enter the registered email.</label>
            <input type='email' placeholder='email' name='email' id='e-mail' required value={email} onChange={emailHandler}/>
            <button onClick={forgotPasswordHandler}>Send Link</button>
        </div>
    );
}

export default ForgotPassword;