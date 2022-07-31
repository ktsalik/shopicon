import './SignInPage.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signin = () => {
    axios.post(`http://localhostt/eshop-server/register`, {
      email: email,
      password: password,
    }).then(() => {

    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      
      // end of remove this
    });
  };

  return (
    <div className="SignInPage">
      <div className="account-page-switch">
        <Link to="/sign-in" className="active">
          <FontAwesomeIcon icon={faSignInAlt} size="lg" />
          <span>Sign In</span>
        </Link>
        <span className="seperator">|</span>
        <Link to="/sign-up">
          <FontAwesomeIcon icon={faUserCheck} size="lg" />
          <span>Sign Up</span>
        </Link>
      </div>

      <div className="form">
        <div className="form__input">
          <span className="form__label">Email</span>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </div>

        <div className="form__input">
          <span className="form__label">Password</span>
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>

        <button
          className="btn-sign-in btn-primary"
          onClick={signin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;