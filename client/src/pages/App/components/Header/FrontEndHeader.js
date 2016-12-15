import React from 'react';
import { browserHistory } from 'react-router';
import { Menu } from 'semantic-ui-react';
import './Header.css';

export function FrontEndHeader(props, context) {

  return (
    <div className="header">
        <Menu className="navColor" pointing secondary>
        <span className="myBrand">Salut.io</span>
          <Menu.Item name='home' active={context.router.isActive('/', true)} onClick={()=> browserHistory.push('/')} />
          <Menu.Item name='About' active={context.router.isActive('/about', true)} onClick={()=> browserHistory.push('/about')} />
          <Menu.Item name='FAQ'  active={context.router.isActive('/faq', true)} onClick={()=> browserHistory.push('/faq')} />
          <Menu.Menu position='right'>
            <Menu.Item name='Signup'  active={context.router.isActive('/signup', true)} onClick={()=> browserHistory.push('/signup')} />
            <Menu.Item name='Login'  active={context.router.isActive('/login', true)} onClick={()=> browserHistory.push('/login')} />
          </Menu.Menu>
        </Menu>
    </div>
  );
}

FrontEndHeader.contextTypes = {
  router: React.PropTypes.object,
};

export default FrontEndHeader;