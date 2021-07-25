import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyNavBar from './components/nav/index';
import { useState } from 'react';
import User from './models/User';
import SignInForm from './components/User/SignInForm';
import SignUpForm from './components/User/SignUpForm';
import React from 'react';
import { GHRepositories } from './components/GHRepositories';

function App() {
  const [user, setUser] = useState(new User());
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar onLogOut={(userAuth) => {
          setUser(userAuth)
        }}
          user={user} />
        <Switch>
          {
            user.isAuth
              ?
              <Route
                exact
                path="/"
                render={(props) => {
                  return (
                    <GHRepositories user={user}/>
                  )
                }}
              />
              :
              <React.Fragment>
                <Route
                  exact
                  path="/"
                  render={(props) => {
                    return (
                      <SignInForm onAuth={(userAuth) => {
                        setUser(userAuth)
                      }} />
                    )
                  }}
                />
                <Route
                  exact
                  path="/signup"
                  render={(props) => {
                    return (
                      <SignUpForm />
                    )
                  }}
                />
              </React.Fragment>
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
