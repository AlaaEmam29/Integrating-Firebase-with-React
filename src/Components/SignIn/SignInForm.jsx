import React, { useEffect, useState } from 'react'
import {  withFirebase } from '../../Context/Firebase/context'
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
email: '',
password: '',
error:null
}

function SignInFormBase({ firebase }) {
    let navigate = useNavigate();
    const [userSignIn, setUserSignIn] = useState(INITIAL_STATE)
    const handleOnChange = (e) => {
        const { value, name } = e.target
        setUserSignIn((prevUser) => ({
            ...prevUser,
            [name]:value
        }))
    }
const isInvalid = () => {
  const { password,  email } = userSignIn;
  return (
    password === '' ||
    email === '' 
  );
    };
    const invalid = isInvalid()
    const handleSignIn = async (e) =>
    {
        e.preventDefault()
        try {
            await firebase.doSignInWithEmailAndPassword(userSignIn.email, userSignIn.password)
            setUserSignIn({ ...INITIAL_STATE })
            navigate(ROUTES.HOME)
            
        }
        catch (error) {
            setUserSignIn((prevUser)=>({...prevUser , error: error.message}))
        }
        
    }
    
    return (
        <>
        {userSignIn.error && <h3 style={{color:"red"}}>{ userSignIn.error}</h3>}
          <form onSubmit={handleSignIn} className='styleForm'>
           
        <input
          name="email"
          value={userSignIn.email}
          onChange={handleOnChange}
          type="email"
          placeholder="Email Address"
              />
                      <input
          name="password"
          value={userSignIn.password}
          onChange={handleOnChange}
          type="password"
          placeholder="Password"
        />
       
              <button disabled={invalid} type="submit">Sign In</button>

      </form>
      </>
  )
}
const SignInForm = withFirebase(SignInFormBase);
export default SignInForm