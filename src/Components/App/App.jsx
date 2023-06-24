import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../Account/Account';
import AdminPage from '../Admin/Admin';
import HomePage from '../Home/Home';
import LandingPage from '../Landing/Landing';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';
import PasswordForgetPage from '../PasswordForget/PasswordForget';
import SignInPage from '../SignIn/SignIn';
import SignUpPage from '../SignUp/SignUp';
import withAuthentication from '../../Context/Auth/context';

const App = () => {

  return <>

  <Router>
    <div>
      <Navigation />

      <hr />
      <Routes>
        <Route exact path={ROUTES.LANDING} element={<LandingPage />} />
        <Route exact path={ROUTES.SIGN_UP} element={<SignUpPage/>} />
        <Route exact path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          element={<PasswordForgetPage />}
          />
        <Route exact path={ROUTES.HOME} element={<HomePage/> } />
        <Route exact path={ROUTES.ACCOUNT} element={<AccountPage/> } />
            <Route exact path={ROUTES.ADMIN} element={<AdminPage/>} />
                  <Route path="*" element={<NotFound/>} />

      </Routes>
    </div>
  </Router>
    </>
};

export default withAuthentication(App);