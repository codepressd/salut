import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Router,  IndexRoute, Route, browserHistory } from 'react-router';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

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
import InfoUpdateSuccess from './pages/Supplier/pages/infoUpdateSuccess';
import SupplyProducts from './pages/Supplier/pages/supplierProducts';
import SupplyAddProducts from './pages/Supplier/pages/supplierAddProducts';
import SupplyUpdateProducts from './pages/Supplier/pages/supplierUpdateProduct';
import SupplyOrders from './pages/Supplier/pages/supplierOrders';
import SupplyEarnings from './pages/Supplier/pages/supplierEarnings';
import PostProductSucess from './pages/Supplier/pages/productSuccess';
import SupplierViewOrder from './pages/Supplier/pages/supplierViewOrder';

//Restaurant Routes
import RestaurantDash from './pages/Restaurant/pages/restaurantDashboard';
import RestaurantShop from './pages/Restaurant/pages/restaurantShop';
import RestaurantOrders from './pages/Restaurant/pages/restaurantOrders';
import RestaurantSuppliers from './pages/Restaurant/pages/restaurantSuppliers';
import RestaurantProductPage from './pages/Restaurant/pages/restaurantProductPage';
import RestaurantCheckout from './pages/Restaurant/pages/restaurantCheckout';
import RestaurantOrderSuccess from './pages/Restaurant/pages/orderSuccess';
import RestaurantViewOrder from './pages/Restaurant/pages/restaurantViewOrder';

//not Auth
import { notAuthorized } from './components/actions/authActions';

export default function App (props) {
  const getUserRole = () =>{
    const state = props.store.getState();
    if(!state.ActiveUser.user){
          return null;
    }
    return state.ActiveUser.user.role;
  }

  const supplierAuth = () => {
    const userRole = getUserRole();
     const message = 'Not Authorized For This Content';
    if(userRole !== 'supplier' || userRole.length === 0 || userRole === null){
      props.store.dispatch({type: 'NOT_AUTHORIZED', message: 'Not Authorized For This Content', success: false});
      browserHistory.push('/login');
    }
  }

  const restaurantAuth = () => {
    const userRole = getUserRole();

    if(userRole !== 'restaurant' || userRole.length === 0 || userRole === null){
      props.store.dispatch({type: 'NOT_AUTHORIZED', message: 'Not Authorized For This Content', success: false});
      browserHistory.push('/login');
    }
  }
    return (
      <Provider store={props.store}>
        <Router history={props.history}>
          <Route path='/' component={WrapApp}>
            <IndexRoute component={Home} />
              <Route path='/about' component={About} />
              <Route path='/faq' component={Faq} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
            {/*Backend Routes*/}

          {/*Supplier Routes*/}
                    <Route path='/supplier/dashboard/:userid' component={SupplyDash} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/updateSuccess' component={InfoUpdateSuccess} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/products' component={SupplyProducts} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/addProducts' component={SupplyAddProducts} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/addProductSuccess' component={PostProductSucess} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/updateProducts/:productId' component={SupplyUpdateProducts} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/orders' component={SupplyOrders} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/vieworder/:ordernumber' component={SupplierViewOrder} onEnter={supplierAuth} />
                    <Route path='/supplier/dashboard/:userid/earnings' component={SupplyEarnings} onEnter={supplierAuth} />
            
          {/*Restaurant Routes*/}
                    <Route path='/restaurant/dashboard/:userid' component={RestaurantDash} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/shop' component={RestaurantShop} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/product/:productId' component={RestaurantProductPage} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/checkout' component={RestaurantCheckout} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/orderSuccess' component={RestaurantOrderSuccess} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/orders' component={RestaurantOrders} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/vieworder/:ordernumber' component={RestaurantViewOrder} onEnter={restaurantAuth} />
                    <Route path='/restaurant/dashboard/:userid/suppliers' component={RestaurantSuppliers} onEnter={restaurantAuth} />
            
          </Route>
        </Router>
      </Provider>
    );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};

