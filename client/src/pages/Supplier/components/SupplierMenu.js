/* eslint-disable */
import React from 'react';
import {browserHistory} from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';

import '../supplier.css';



 function SupplierMenu (props){
    const user = props.activeUser.user;
    return (

      <Menu className='menu' icon='labeled' fluid vertical>
                
        <Menu.Item className='navButton' name='Dashboard' active={props.location.pathname === '/supplier/dashboard/'+user.id} onClick={() => browserHistory.push( '/supplier/dashboard/'+user.id)}>
          <Icon name='settings' />
          Dashboard
        </Menu.Item>

        <Menu.Item className='navButton' name='Products' active={props.location.pathname ===  '/supplier/dashboard/'+user.id+'/products'} onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/products')}>
          <Icon name='shop' />
          Products
        </Menu.Item>
        

        <Menu.Item className='navButton' name='add-product' active={props.location.pathname === '/supplier/dashboard/'+user.id+'/addProducts'} onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/addProducts')}>
          <Icon name='add to cart' />
         Add Products
        </Menu.Item>

        <Menu.Item className='navButton' name='orders' active={props.location.pathname ===  '/supplier/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push('/supplier/dashboard/'+user.id+'/orders')}>
          <Icon name='shipping' />
          Orders
        </Menu.Item>
      </Menu>
     
    )
}

export default SupplierMenu;