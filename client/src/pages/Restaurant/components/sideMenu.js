import React from 'react';
import {browserHistory} from 'react-router';
import { Menu, Icon, Input } from 'semantic-ui-react';

import styles from '../restaurant.css';



export function sideMenu (props){
   const user = props.activeUser.user;
    return (
      <Menu className={styles.menu} icon='labeled' fluid vertical>
        <Menu.Item>
        <h3>Search For Products</h3>
          <Input placeholder='Search...' />
        </Menu.Item>
        
        <Menu.Item className={styles.navButton} name='dashboard' active={props.location.pathname === '/restaurant/dashboard/'+user.id} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id)}>
          <Icon name='settings' />
          Dashboard
        </Menu.Item>

        <Menu.Item className={styles.navButton} name='shop'  active={props.location.pathname === '/restaurant/dashboard/'+user.id+'/shop'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/shop')}>
          <Icon name='shop' />
          Shop
        </Menu.Item>

        <Menu.Item className={styles.navButton} name='orders'  active={props.location.pathname === '/restaurant/dashboard/'+user.id+'/orders'} onClick={() => browserHistory.push( '/restaurant/dashboard/'+user.id+'/orders')}>
          <Icon name='payment' />
          Orders
        </Menu.Item>
      </Menu>
     
    )
}

export default sideMenu;