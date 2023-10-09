import styles from './Notification.styles.css'

const Notification = ({notificationMessage}) => {
  if (notificationMessage === null) return null;
    
    const { type, text } = notificationMessage;

    console.log(type)
  return (
    <div className={`notification ${type}`}>{text}</div>
  );
};

export default Notification;