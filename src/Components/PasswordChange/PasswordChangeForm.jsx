

import React, { useState } from 'react';
import { withFirebase } from '../../Context/Firebase/context';

const INITIAL_STATE = {
password: '',
confirmPassword: '',
error:null
}

function PasswordChangeFormBase({ firebase }) {
    const [userChangePassword, setUserChangePassword] = useState(INITIAL_STATE)
    const handleOnChange = (e) => {
        const { value, name } = e.target
        setUserChangePassword((prevUser) => ({
            ...prevUser,
            [name]:value
        }))
    }
const isInvalid = () => {
  const { password, confirmPassword } = userChangePassword;
  return (
    password !== confirmPassword ||
    password === ''  );
    };
    const invalid = isInvalid()
    const handleSignUp = async (e) =>
    {
        e.preventDefault()
        try {
            await firebase.doPasswordUpdate(userChangePassword.password)
            setUserChangePassword({ ...INITIAL_STATE })
            
        }
        catch (error) {
            setUserChangePassword((prevUser)=>({...prevUser , error: error.message}))
        }
        
    }
    
    return (
        <>
        {userChangePassword.error && <h3 style={{color:"red"}}>{ userChangePassword.error}</h3>}
          <form onSubmit={handleSignUp} className='styleForm'>
               
                      <input
          name="password"
          value={userChangePassword.password}
          onChange={handleOnChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="confirmPassword"
          value={userChangePassword.confirmPassword}
          onChange={handleOnChange}
          type="password"
          placeholder="Confirm New Password"
        />
              <button disabled={invalid} type="submit">Reset My Password</button>

      </form>
      </>
  )
}
const PasswordChangeForm = withFirebase(PasswordChangeFormBase);
export default PasswordChangeForm