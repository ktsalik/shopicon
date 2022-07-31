import './ContactPage.scss';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faFax, faMapLocationDot, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  const mapElRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (mapElRef.current && mapElRef.current.parentElement) {
      mapElRef.current.setAttribute('width', mapElRef.current.parentElement.offsetWidth.toString());
    }
  }, [mapElRef]);

  return (
    <div className="ContactPage">
      <h1 className="title text-dark">Contact Us</h1>

      <span className="text-dark fs-3 mt-3 mx-auto">Drop Us a Message</span>

      <div className="form">
        <div className="d-flex flex-direction-row">
          <div className="form__input">
            <span className="form__label text-dark">Name</span>
            <input type="text"></input>
          </div>
          
          <div className="form__input ms-2">
            <span className="form__label text-dark">Email</span>
            <input type="email"></input>
          </div>
        </div>
        
        <div className="form__input">
          <span className="form__label text-dark">Message</span>
          <textarea rows={7}></textarea>
        </div>

        <button className="btn-send btn-primary">Send</button>
      </div>

      <span className="mt-5 fs-3 text-dark mx-auto">Or Call Us</span>

      <div className="mt-3 mx-auto d-flex align-items-center">
        <FontAwesomeIcon icon={faPhoneSquare} size="2x" className="text-dark" />
        <span className="ms-1 fs-3 text-dark">(555) 555-1234</span>
      </div>

      <div className="mt-2 text-center">
        <a href="tel:5555551234" className="btn-call btn-primary outline">Call Now</a>
      </div>

      <div className="seperator"></div>

      <div className="contact-info">
        <div className="contact-info__item">
          <FontAwesomeIcon icon={faEnvelopeOpenText} size="3x" className="text-dark" />
          <span className="mt-2 fs-3 text-dark">info@shopicon.com</span>
        </div>

        <div className="contact-info__item">
          <FontAwesomeIcon icon={faFax} size="3x" className="text-dark" />
          <span className="mt-2 fs-3 text-dark">(555) 554-1234</span>
        </div>

        <div className="contact-info__item">
          <FontAwesomeIcon icon={faMapLocationDot} size="3x" className="text-dark" />
          <span className="mt-2 fs-3 text-dark text-center">My Street, Kingston<br />New York 12401</span>
        </div>
      </div>

      <iframe id="map-canvas" width="600" height="500" ref={mapElRef} src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no"></iframe>
    </div>
  )
};

export default ContactPage;