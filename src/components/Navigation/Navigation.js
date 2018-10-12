import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './../AuthUserContext';
import SignOutButton from './../SignOut';
import * as routes from '../../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><Link to={routes.HOME} class="nav-link">
          Home</Link>
        </li>
        <li class="nav-item"><Link to={routes.ACCOUNT} class="nav-link">
          Account</Link>
        </li>
        <li class="nav-item"><Link to={routes.USERS} class="nav-link">
          Users</Link>
        </li>
        <li><SignOutButton/></li>
      </ul>
    </div>
  </nav>

const NavigationNonAuth = () =>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><Link to={routes.LANDING} class="nav-link">
          Landing Page</Link>
        </li>
        <li class="nav-item"><Link to={routes.SIGN_IN} class="nav-link">
          Sign In</Link>
        </li>
      </ul>
    </div>
  </nav>

export default Navigation;
