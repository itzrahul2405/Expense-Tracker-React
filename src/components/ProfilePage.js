import classes from './ProfilePage.module.css'
import { useEffect, useRef, useState } from 'react';

const ProfilePage = () => {

    const [userName, setUserName] = useState('user')
    const [userImageUrl, setUserImageUrl] = useState('user_profile_pic.avif')

    
    const nameInputRef = useRef()
    const photoUrlInputRef = useRef()

    const updateProfileHandler = async(event) => {
        event.preventDefault()
        try{

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4',{
                method: 'POST',
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    displayName: nameInputRef.current.value,
                    photoUrl: photoUrlInputRef.current.value,
                    returnSecureToken: true
                }),
                headers: {'Content-Type': 'application/json'}
            })
    
            const data = await response.json()
            console.log(data)
    
            if(!response.ok){
                alert(data.error.message)
                throw new Error('Something went wrong',data.error.message)
            }


            getUpdatedProfileData()
        }
        catch(error){
            console.log(error.message)
        }
    }   


    const getUpdatedProfileData = async () => {
        const idToken = localStorage.getItem('token');
        const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAuVAC3jcFhmukTcZotAQrrHnfVzSuM0O4`;
    
        const resp = await fetch(apiUrl, {
        method: 'POST', // or 'GET' depending on your API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idToken: idToken,
        }),
    });
  
    const data = await resp.json();
    // console.log(data)
    // console.log(data.users[0])
    setUserName(data.users[0].displayName);
    setUserImageUrl(data.users[0].photoUrl);
  };
  

  useEffect(() => {
    getUpdatedProfileData()
  }, [userName, userImageUrl])


  return (
    <>
      <div className={classes.container}>
        <p>Winners never quite, Quitters never win.</p>
        <div className={classes.user_profile}>
            <h2>{`Hii ${userName},`}</h2>
            <img alt='user-pic' src={userImageUrl} />
        </div>
        <p>
          Your Profile is <b>64%</b> completed. A complete Profile has higher
          chances of landing a job. <i>complete now</i>
        </p>
      </div>
      <hr />
      <form className={classes.form} onSubmit={updateProfileHandler}>
        <div className={classes.form_header}>
          <h1>Contact Details</h1>
          <button type='button'>Cancel</button>
        </div>
        <div className={classes.form_input}>
          <label htmlFor="full-name">Full Name: </label>
          <input type="text" id="full-name" name="full-name" ref={nameInputRef}/>
          <label htmlFor="profile-photo-url">Profile Photo URL: </label>
          <input type="url" id="profile-photo-url" name="profile-photo" ref={photoUrlInputRef}/>
          <button type='submit'>Update</button>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
