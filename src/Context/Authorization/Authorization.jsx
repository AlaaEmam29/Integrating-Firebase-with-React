import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../Auth/context';
import { withFirebase } from '../Firebase/context';

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const unsubscribe = props?.firebase?.auth?.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            navigate(ROUTES.SIGN_IN);
          }
        },
        () => navigate(ROUTES.SIGN_IN)
      );

      return () => {
        unsubscribe();
      };
    }, [condition, navigate, props.firebase]);

    return (
      <AuthContext.Consumer>
        {(authUser) => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthContext.Consumer>
    );
  };

  return withFirebase(WithAuthorization);
};

export default withAuthorization;
