export const StepContainer = ({ step, text, children, bg = "bg-gray" }) => {
    return (
        <div className={"text-center position-relative pt-5 pb-4 " + bg}>
            <div
                className="position-absolute w-100"
                style={{ left: "0", top: "-22px" }}
            >
                <div className="mx-auto circle d-flex justify-content-center align-items-center">
                    {step}
                </div>
            </div>
            {children}
            {text && <div className="w-100 pt-3 fw-bold px-4">{text}</div>}
        </div>
    );
};
