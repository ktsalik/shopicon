import './AccountPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const AccountPage = (props: any) => {
  
  return (
    <div className="AccountPage">
      <div className="d-flex flex-direction-column" style={{color: '#AAAAAA'}}>
        <FontAwesomeIcon icon={faCode} size="4x" />
        <span style={{marginTop: '20px'}}>Account page is under construction</span>
      </div>
    </div>
  );
}

export default AccountPage;