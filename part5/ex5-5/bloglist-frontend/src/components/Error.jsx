import styles from './Error.styles.css'

const Error = ({ message }) => {
    console.log('Error message:', message); 
    if (message === null) {
        return null
    }
    return (
        <div className='error'>{message}</div>
    )
}

export default Error