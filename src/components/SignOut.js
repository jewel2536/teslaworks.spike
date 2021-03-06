import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    class="btn btn-secondary"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;
