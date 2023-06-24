import { createContext, useContext, useState } from "react";
import { withFirebase } from "../Firebase/context";
import { useEffect } from "react";

export const AuthContext = createContext(null)
const withAuthentication = (Component) => {
  return  withFirebase( (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const unsubscribe = props.firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <AuthContext.Provider value={authUser}>
        <Component {...props} />
      </AuthContext.Provider>
    )
  })

};

export default withAuthentication;


export const useAuthContext = () => {
  useContext(AuthContext)
}