import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, role) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getUser = (uemail) =>
  db.ref('users').once('value').then(function(snapshot) {
    var users = (snapshot.val());
    var role = "NAN";
    Object.keys(users).map(key =>
      (users[key].email === uemail)
        ? role = users[key].role
        : (users[key].role || "NAN")
    );
    return role;
  });


  export const getPermission = (uemail, allowedRoles) => {
    var promise = db.ref('users').once('value').then(function(snapshot) {
        var users = (snapshot.val());
        var role = "NAN";
        Object.keys(users).map(key =>
          (users[key].email === uemail)
            ? role = users[key].role
            : (users[key].role || "NAN")
        );
        return role;
      });
    var role;
    promise.then(function(result) { role = result; });
    return allowedRoles.includes(role);
}
