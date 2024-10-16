import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
//import UserPage from '../UserPage/UserPage';
//import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import GrantList from '../GrantList/GrantList';
import GrantDetails from '../GrantDetails/GrantDetails';
import GrantForm from '../GrantForm/GrantForm';
import GrantSuccess from '../GrantSuccess/GrantSuccess';
import AdminPage from '../AdminPage/AdminPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from='/' to='/home' />

          <Route exact path='/home'>
            <LandingPage />
          </Route>

          <Route exact path='/login'>
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path='/registration'>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <ProtectedRoute exact path='/grantlist'>
            <GrantList />
          </ProtectedRoute>
          <ProtectedRoute exact path='/grantform'>
            <GrantForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/grantsuccess'>
            <GrantSuccess />
          </ProtectedRoute>

          <ProtectedRoute exact path='/administrator'>
            <AdminPage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/grantlist/:id'>
            <GrantDetails />
          </ProtectedRoute>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

{
  /* <Route exact path='/home'>
  {user.id ? (
    // If the user is already logged in,
    // redirect them to the /user page
    <Redirect to='/grantlist' />
  ) : (
    // Otherwise, show the Landing page
    <LandingPage />
  )}
</Route>; */
}

//  <ProtectedRoute
//    // logged in shows UserPage else shows LoginPage
//    exact
//    path='/user'
//  >
//    <UserPage />
//  </ProtectedRoute>;

{
  /* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */
}

// logged in shows InfoPage else shows LoginPage
