import React from 'react';
import { Provider } from 'react-redux';
import { Router,  IndexRoute, Route, browserHistory } from 'react-router';

//Import Components
import WrapApp from './pages/App/App';

//Frontend components
import Home from './pages/Home/pages/home';
import Login from './pages/Login/pages/login';
import Signup from './pages/Signup/pages/signup';
import About from './pages/About/pages/about';
import Faq from './pages/FAQ/pages/faq';

//Backend components
import Logout from './pages/Login/pages/logout';

//supplier routes
import SupplyDash from './pages/Supplier/pages/SupplierDashboard';
import SupplyProducts from './pages/Supplier/pages/supplierProducts';
import SupplyAddProducts from './pages/Supplier/pages/supplierAddProducts';
import SupplyOrders from './pages/Supplier/pages/supplierOrders';
import SupplyEarnings from './pages/Supplier/pages/supplierEarnings';
import PostProductSucess from './pages/Supplier/pages/productSuccess';

//Restaurant Routes
import RestaurantDash from './pages/Restaurant/pages/restaurantDashboard';


export default function App (props) {
    return (
      <Provider store={props.store}>
        <Router history={browserHistory}>
          <Route path='/' component={WrapApp}>
            <IndexRoute component={Home}></IndexRoute>
              <Route path='/about' component={About} />
              <Route path='/faq' component={Faq} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
            {/*Backend Routes*/}
          {/*Supplier Routes*/}
            <Route path='/supplier/dashboard/:userid' component={SupplyDash} />
            <Route path='/supplier/dashboard/:userid/products' component={SupplyProducts} />
            <Route path='/supplier/dashboard/:userid/addProducts' component={SupplyAddProducts} />
            <Route path='/supplier/dashboard/:userid/addProductSuccess' component={PostProductSucess} />
            <Route path='/supplier/dashboard/:userid/orders' component={SupplyOrders} />
            <Route path='/supplier/dashboard/:userid/earnings' component={SupplyEarnings} />
          {/*Restaurant Routes*/}
            <Route path='/restaurant/dashboard/:userid' compontent={RestaurantDash} />
          </Route>
        </Router>
      </Provider>
    );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};

