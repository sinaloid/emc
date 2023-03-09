const Button = ({
    children,
    name,
    classe,
    callback = () => {},
    isModal = false,
    idModal = ""
}) => {
    return (
        <>
            {isModal ? (
                <button
                    data-bs-toggle="modal"
                    data-bs-target={idModal}
                    className={"rounded-1 btn " + classe}
                    onClick={callback}
                >
                    {children ? (
                        children
                    ) : (
                        <>
                            <span>{name}</span>
                        </>
                    )}
                </button>
            ) : (
                <button
                    className={"rounded-1 btn " + classe}
                    onClick={callback}
                >
                    {children ? (
                        children
                    ) : (
                        <>
                            <span>{name}</span>
                        </>
                    )}
                </button>
            )}
        </>
    );
};

export default Button;
