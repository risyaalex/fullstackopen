import styles from './Success.styles.css'

const Success = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <div className='success'>{message}</div>
    )
}

export default Success