import Home from './Components/Home/Home.js'
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login.js';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.js';
import Orders from './Components/Orders/Orders.js';
import Checkout from './Components/Checkout/Checkout';
import Admin from './Components/Admin/Admin.js';

export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>
        <PrivateRoute path="/orders">
          <Orders></Orders>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/checkout/:checkoutProduct">
          <Checkout></Checkout>
        </PrivateRoute>
        <PrivateRoute path='/admin'>
          <Admin></Admin>
        </PrivateRoute>
        

      </Switch>

      </Router>

    </UserContext.Provider>

    
  );
}

export default App;
