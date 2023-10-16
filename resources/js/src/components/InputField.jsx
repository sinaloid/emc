import { useState } from "react";

const InputField = ({
    type,
    label,
    name,
    value,
    placeholder,
    options,
    onChange,
    col = "col-md-12",
}) => {
    const [check, setCheck] = useState(false)
    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        //onChange(event.target.name, event.target.value);

        if(event.target.name === "checkbox" || event.target.name === "checkbox2"){
            setCheck((val) => !val)
            alert("ok")
        }
    };

    const handleChangeImage = (event) => {
        onChange(event.target.name, event.target.files[0]);
    };
    const checkChange = (e) =>{
        setCheck((val) => !val)
    }
    if (type === "text2") {
        return (
            <div className={col}>
                <div className="mb-3">
                    <label htmlFor={name} className="form-label fw-bold ">
                        {label}
                    </label>
                    <input
                        className="form-control form-control-sm form-floating-height"
                        type="text"
                        id={name}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                </div>
            </div>
        );
    }

    if (type === "select2") {
        return (
            <div className={"mb-3 "+col}>
                <label htmlFor={name} className="form-label fw-bold ">
                    {label}
                </label>
                <select
                    className="form-select form-select-sm"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <option>{"Selectionnez une " + label}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "text") {
        return (
            <div className={col}>
                <div className="form-floating mb-3 fw-bold">
                    <input
                        className="form-control form-control-sm form-floating-height"
                        type="text"
                        id={name}
                        name={name}
                        value={value}
                        placeholder={label}
                        onChange={handleChange}
                    />
                    <label htmlFor={name} className="form-label mb-4">
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    if (type === "date") {
        return (
            <div className="col-md-12">
                <div className="form-floating mb-3 fw-bold">
                    <input
                        className="form-control form-control-sm form-floating-height"
                        type="date"
                        id={name}
                        name={name}
                        value={value}
                        placeholder={label}
                        onChange={handleChange}
                    />
                    <label htmlFor={name} className="form-label mb-4">
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    if (type === "file") {
        return (
            <div className={col}>
                <div className="mb-3">
                    <label htmlFor={name} className="form-label mb-4 fw-bold">
                        {label}
                    </label>
                    <input
                        className="form-control form-control-sm form-floating-height"
                        type="file"
                        id={name}
                        name={name}
                        //value={value}
                        placeholder={label}
                        onChange={handleChangeImage}
                    />
                </div>
            </div>
        );
    }

    if (type === "select") {
        return (
            <div className="col-md-12 mb-3">
                <select
                    className="form-select"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <option>{"Selectionnez une " + label}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "checkbox") {
        return (
            <div className={"mb-0 "+col}>
                <div className="form-check custom-checkbox">
                    <input
                        className={` form-check-input  ${check && " bg-primary"}`}
                        type="checkbox"
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label "
                        htmlFor="flexCheckIndeterminate"
                    >
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    if (type === "checkbox2") {
        return (
            <div className={"mb-3 "+col}>
                <div className="form-check">
                    <input
                        className={`custom-checkbox form-check-input  ${check && " bg-primary"}`}
                        type="checkbox"
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label text-primary"
                        htmlFor="flexCheckIndeterminate"
                    >
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    return null;
};

export default InputField;
