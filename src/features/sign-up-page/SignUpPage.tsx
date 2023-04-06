import './SignUpPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');

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

  const onPasswordAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(e.target.value);
  };
  
  const submit = () => {
    
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
          <label htmlFor="input-terms">I agree with the <Link to="/terms" target="_blank">terms and conditions</Link> of this website</label>
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