import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './component/Review/Review';
import NotFound from './component/NotFound/NotFound';
import Inventory from './component/Inventory/Inventory';
import ProductDetail from './component/ProductDetail/ProductDetail';
import Login from './component/Login/Login';
import { AuthContextProvider, PrivateRoute } from './component/Login/useAuth';
import Shipment from './component/Shipment/Shipment';




function App(props) {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path='/product/:productKey'>
              <ProductDetail></ProductDetail>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
            </PrivateRoute>           
            <Route path="*">
              <NotFound></NotFound>
            </Route>

          </Switch>
        </Router>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
