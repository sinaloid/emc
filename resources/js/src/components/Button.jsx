const Button = ({ children, name, classe, callback = () => {} }) => {
    return (
        <button className={"rounded-1 btn " + classe} onClick={callback}>
            {children ? (
                children
            ) : (
                <>
                    <span>{name}</span>
                </>
            )}
        </button>
    );
};

export default Button;
