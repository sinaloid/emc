const InputField = ({ type, label, name, value, options, onChange }) => {
    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        onChange(event.target.name, event.target.value);
    };

    const handleChangeImage = (event) => {
        onChange(event.target.name, event.target.files[0]);
    };

    if (type === "text") {
        return (
            <div className="col-md-12">
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
            <div className="col-md-12">
                <div className="form-floating mb-3">
                    <input
                        className="form-control form-control-sm form-floating-height"
                        type="file"
                        id={name}
                        name={name}
                        //value={value}
                        placeholder={label}
                        onChange={handleChangeImage}
                    />
                    <label htmlFor={name} className="form-label mb-4">
                        {label}
                    </label>
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
            <div className="col-md-12 mb-3">
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

    return null;
};

export default InputField;
