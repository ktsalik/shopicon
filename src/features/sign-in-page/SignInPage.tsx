import './SignInPage.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSignInAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { store } from '../../app/store';
import accountSlice from '../account/accountSlice';
import { useAppSelector } from '../../app/hooks';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loading = useAppSelector((state: any) => state.account.processing);
  const loggedIn = useAppSelector((state: any) => state.account.loggedIn);
  if (loggedIn) {
    navigate('/account');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signin = () => {
    store.dispatch(accountSlice.actions.login({ email, password }));
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
          {
            loading
              ? <FontAwesomeIcon icon={faCircleNotch} spin />
              : 'Sign In'
          }
        </button>
      </div>
    </div>
  );
};

export default SignInPage;