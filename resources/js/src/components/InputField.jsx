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
    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        onChange(event.target.name, event.target.value);
    };

    const handleChangeImage = (event) => {
        onChange(event.target.name, event.target.files[0]);
    };
    if (type === "text2") {
        return (
            <div className={col}>
                <div className="mb-3">
                    <label htmlFor={name} className="form-label">
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
                <label htmlFor={name} className="form-label">
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
                <div className="form-floating mb-3">
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
                <div className="form-floating mb-3">
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
                    <label htmlFor={name} className="form-label mb-4">
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
            <div className={"mb-3 "+col}>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    />
                    <label
                        class="form-check-label"
                        for="flexCheckIndeterminate"
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
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                    />
                    <label
                        class="form-check-label text-primary"
                        for="flexCheckIndeterminate"
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
