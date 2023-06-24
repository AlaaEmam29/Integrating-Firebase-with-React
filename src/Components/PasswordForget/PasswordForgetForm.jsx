import  {  useState } from 'react'
import {  withFirebase } from '../../Context/Firebase/context'

const INITIAL_STATE = {
email: '',
error:null
}

function PasswordForgetBase({ firebase }) {
    const [passwordForget, setPasswordForget] = useState(INITIAL_STATE)
    const   isInvalid = passwordForget.email === '';
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await firebase.doPasswordReset(passwordForget.email)
            setPasswordForget({...INITIAL_STATE})
        }
        catch (error) {
            setPasswordForget((user)=>({...user , error:error.message}))
        }
    }
    const handleChange = (e) => {
        const { value ,name} = e.target
        setPasswordForget((user) => ({
            ...user,
            [name]:value

        }))
    }
  return (
      <>
          <>
        {passwordForget.error && <h3 style={{color:"red"}}>{ passwordForget.error}</h3>}
          <form onSubmit={handleSignUp} className='styleForm'>
              
        <input
          name="email"
          value={passwordForget.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
              />
          
              <button disabled={isInvalid} type="submit">          Reset My Password</button>

      </form>
      </>
      
      </>
  )
}
const PasswordForgetForm = withFirebase(PasswordForgetBase)
export default PasswordForgetForm