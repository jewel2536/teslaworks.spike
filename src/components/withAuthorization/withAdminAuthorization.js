import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './../AuthUserContext';
import { firebase, db } from '../../firebase';
import * as routes from '../../constants/routes';

const withAdminAuthorization = (authCondition) => (Component) => {
  class WithAdminAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        var promise = db.getPermission(authUser.email, ["ADMIN"]);
        if (!authCondition(authUser) || !promise) {
          this.props.history.push(routes.HOME);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAdminAuthorization);
}

export default withAdminAuthorization;
