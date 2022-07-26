import './Notification.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { store } from '../../app/store';
import notificationSlice from './notificationSlice';
import { useEffect, useRef, useState } from 'react';

interface NotificationComponentProps {
  id: string;
  type: string;
  text: string;
  index: number;
};

const Notification = (props: NotificationComponentProps) => {
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementHeight, setElementHeight] = useState<number>(0);
  const notificationElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {    
    if (notificationElRef.current) {
      setElementWidth(notificationElRef.current.offsetWidth);
      setElementHeight(notificationElRef.current.offsetHeight);
    }
  }, []);

  const removeNotification = () => {
    store.dispatch(notificationSlice.actions.remove({ id: props.id }))
  };

  return (
    <div
      className={`Notification animate__animated animate__fadeInUp ${props.type}`}
      style={{bottom: `${props.index * elementHeight * 1.1}px`, left: `calc(50% - ${elementWidth / 2}px)`}}
      ref={notificationElRef}
    >
      <div className="content">
        {props.type === 'info' && <FontAwesomeIcon icon={faCircleInfo} />}
        <div className="message">{props.text}</div>
        <button className="btn-close" onClick={removeNotification}>OK</button>
      </div>
    </div>
  );
};

export default Notification;