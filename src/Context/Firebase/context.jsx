/* eslint-disable react/display-name */
import {  createContext, useContext } from "react";
import { Firebase } from "../../Components/Firebase";

const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({ children }) => {
  
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};
export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export const useFirebaseContext = () => {
  return useContext(FirebaseContext)
}