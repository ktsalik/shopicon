import './SignUpPage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(e.target.value);
  };
  
  const submit = () => {
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
    <div className="SignUpPage">
      <div className="account-page-switch">
        <Link to="/sign-in">
          <FontAwesomeIcon icon={faSignInAlt} size="lg" />
          <span>Sign In</span>
        </Link>
        <span className="seperator">|</span>
        <Link to="/sign-up" className="active">
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

        <div className="form__input">
          <span className="form__label">Re-enter Password</span>
          <input
            type="password"
            value={passwordAgain}
            onChange={onPasswordAgainChange}
          />
        </div>

        <div className="terms">
          <input id="input-terms" type="checkbox"></input>
          <label htmlFor="input-terms">I agree with the <Link to="/terms" target="_blank">terms and conditions</Link> of this website.</label>
        </div>

        <button
          className="btn-sign-up btn-primary"
          onClick={submit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;