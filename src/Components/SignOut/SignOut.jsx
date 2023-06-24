import { withFirebase } from "../../Context/Firebase/context";
function SignOutButton({firebase}) {
  const handleSignOut = async () => {
    await firebase.doSignOut()
    
  }
  return (
    <>
    <button onClick={handleSignOut}>Sign Out</button>
    </>
  )
}


const SignOut = withFirebase(SignOutButton);
export default SignOut