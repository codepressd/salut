import React from 'react';
import {browserHistory} from 'react-router';
import { Menu, Icon, Input } from 'semantic-ui-react';

import styles from '../restaurant.css';

const userId = 'rest';

export function sideMenu (props){

    return (
      <Menu className={styles.menu} icon='labeled' fluid vertical>
        <Menu.Item>
        <h3>Search For Products</h3>
          <Input placeholder='Search...' />
        </Menu.Item>
        
        <Menu.Item className={styles.navButton} name='dashboard' active={props.location.pathname === '/restDash/'+userId} onClick={() => browserHistory.push( '/restDash/'+userId)}>
          <Icon name='settings' />
          Dashboard
        </Menu.Item>

        <Menu.Item className={styles.navButton} name='shop'  active={props.location.pathname === '/restDash/'+userId+'/shop'} onClick={() => browserHistory.push( '/restDash/'+userId+'/shop')}>
          <Icon name='shop' />
          Shop
        </Menu.Item>

        <Menu.Item className={styles.navButton} name='orders'  active={props.location.pathname === '/restDash/'+userId+'/orders'} onClick={() => browserHistory.push( '/restDash/'+userId+'/orders')}>
          <Icon name='payment' />
          Orders
        </Menu.Item>

        <Menu.Item className={styles.navButton} name='suppliers' active={props.location.pathname === '/restDash/'+userId+'/suppliers'} onClick={() => browserHistory.push( '/restDash/'+userId+'/suppliers')}>
          <Icon name='shipping' />
          Suppliers
        </Menu.Item>
      </Menu>
     
    )
}

export default sideMenu;