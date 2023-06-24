import React, { useEffect, useState } from 'react'
import {  withFirebase } from '../../Context/Firebase/context'
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
username: '',
email: '',
password: '',
confirmPassword: '',
error:null
}

function SignUpFormBase({ firebase }) {
    let navigate = useNavigate();
    const [userSignUp, setUserSignUp] = useState(INITIAL_STATE)
    const handleOnChange = (e) => {
        const { value, name } = e.target
        setUserSignUp((prevUser) => ({
            ...prevUser,
            [name]:value
        }))
    }
const isInvalid = () => {
  const { password, confirmPassword, email, username } = userSignUp;
  return (
    password !== confirmPassword ||
    password === '' ||
    email === '' ||
    username === ''
  );
    };
    const invalid = isInvalid()
    const handleSignUp = async (e) =>

    {
  const { password, confirmPassword, email, username } = userSignUp;

      e.preventDefault()
        try {
            const authUser =   await firebase.doCreateUserWithEmailAndPassword(userSignUp.email, userSignUp.password)
          const { uid } = authUser.user 
     
          await firebase.setUser(uid,{username,email,})

          setUserSignUp({ ...INITIAL_STATE })
            navigate(ROUTES.HOME)
            
        }
        catch (error) {
            setUserSignUp((prevUser)=>({...prevUser , error: error.message}))
        }
        
    }
    
    return (
        <>
        {userSignUp.error && <h3 style={{color:"red"}}>{ userSignUp.error}</h3>}
          <form onSubmit={handleSignUp} className='styleForm'>
               <input
          name="username"
          value={userSignUp.username}
          onChange={handleOnChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={userSignUp.email}
          onChange={handleOnChange}
          type="email"
          placeholder="Email Address"
              />
                      <input
          name="password"
          value={userSignUp.password}
          onChange={handleOnChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="confirmPassword"
          value={userSignUp.confirmPassword}
          onChange={handleOnChange}
          type="password"
          placeholder="Confirm Password"
        />
              <button disabled={invalid} type="submit">Sign Up</button>

      </form>
      </>
  )
}
const SignUpForm = withFirebase(SignUpFormBase);
export default SignUpForm