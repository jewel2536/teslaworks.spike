import React, { Component } from 'react';

<<<<<<< HEAD
import withAuthorization from './withAuthorization';
import withAdminAuthorization from './withAdminAuthorization';
=======
import withAuthorization from './withAuthorization/withAuthorization';
import withAdminAuthorization from './withAuthorization/withAdminAuthorization';
import withRoleAuthorization from './withAuthorization/withRoleAuthorization';
>>>>>>> 55956be3781f8ae9a7a68e11a8fa4f748ab1f1e9
import { db } from '../firebase';

import './Users.css';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Users</h1>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(users).map(key =>
        <tr class={users[key].role}>
          <td key={key}>{users[key].username}</td>
          <td key={key}>{users[key].email}</td>
          <td key={key}>{users[key].role}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>

const authCondition = (authUser) => !!authUser;

<<<<<<< HEAD
export default withAdminAuthorization(authCondition)(UserPage);
=======
export default withAdminAuthorization(authCondition, ["ADMIN", "OFFICER"])(UserPage);
>>>>>>> 55956be3781f8ae9a7a68e11a8fa4f748ab1f1e9
