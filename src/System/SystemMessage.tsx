const SystemMessage = (limpaSistemMsg: () => void, message?: string): JSX.Element => {
    let element: JSX.Element = (<div></div>);

    if (!message) return element;

    return (
        <div className="alert" onClick={limpaSistemMsg}>
            <span className="closebtn">&times;</span>
            {message}
        </div>
    )
}

export default SystemMessage