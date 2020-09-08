import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './Component/Forms/Login'
import SignUp from './Component/Forms/SignUp'
import ForgetPassword from './Component/Forms/ForgetPassword'
import Home from './Component/Home'

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/home" component={Home} exact />
      <Route path="/signup" component={SignUp} exact />
      <Route path="/forgetPin" component={ForgetPassword} exact />
    </Switch>
  );
}

export default App;
