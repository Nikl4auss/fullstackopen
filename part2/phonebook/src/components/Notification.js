const Notification = ({message, notificationClass}) => {
    if (message  === null){
        return null
    }

    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification