const Input = ({ type, label, name, placeholder, formik, options = [] }) => {
    if (type === "text") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold ">
                    {label}
                </label>
                <input
                    className="form-control form-control-sm form-floating-height"
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                />
            </div>
        );
    }

    if (type === "select") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold ">
                    {label}
                </label>
                <select
                    className="form-select form-select-sm form-floating-height"
                    id={name}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                >
                    <option value={""}>{placeholder}</option>
                    {
                        options.map((data, idx) =>{
                            return <option value={data} key={data+idx}>{data}</option>
                        })
                    }
                </select>
            </div>
        );
    }

    if (type === "password") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold ">
                    {label}
                </label>
                <input
                    className="form-control form-control-sm form-floating-height"
                    type="password"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                />
            </div>
        );
    }

    if (type === "file") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold ">
                    {label}
                </label>
                <input
                    className="form-control form-control-sm form-floating-height"
                    type="file"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={e =>{
                        formik.setFieldValue(name,e.target.files[0])
                    }}
                    
                />
            </div>
        );
    }
};

export default Input;
