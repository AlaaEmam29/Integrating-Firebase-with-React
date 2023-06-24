import PasswordForgetLink from "../PasswordForget/PasswordForgetLink";
import SignUpLink from "../SignUp/SignUpLink";
import SignInForm from "./SignInForm";

 

export default function SignIn() {
  return (
    <div className="styleFormPage">
      <h1>Sign In</h1>
      <SignInForm />
          <PasswordForgetLink/>

      <SignUpLink/>

    </div>
  )
}
