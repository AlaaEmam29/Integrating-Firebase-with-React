import { AuthContext } from "../../Context/Auth/context";
import WithAuthorization from "../../Context/Authorization/Authorization";
import PasswordChangeForm from "../PasswordChange/PasswordChangeForm";
import PasswordForgetForm from "../PasswordForget/PasswordForgetForm";

function AccountPage() {
  return <AuthContext.Consumer>
    {authUser => (
      <div className="styleFormPage">
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthContext.Consumer>
}
const isAuthorized = authUser => authUser != null
const Account = WithAuthorization(isAuthorized)(AccountPage)
export default Account
