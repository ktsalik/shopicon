import './SignInPage.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const SignInPage = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
            value={name}
            onChange={onNameChange}
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

        <button className="btn-sign-in btn-primary">Sign In</button>
      </div>
    </div>
  );
};

export default SignInPage;