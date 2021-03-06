import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props =>  {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawerVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible)
  }

  return (
    <Auxilary>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer 
        isAuth={props.isAuthenticated}
        open={sideDrawerVisible}
        closed={sideDrawerCloseHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Auxilary>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
