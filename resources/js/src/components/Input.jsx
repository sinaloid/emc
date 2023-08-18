const Input = ({ type, label, name, placeholder, formik, options = [] }) => {
    if (type === "text") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold1 ">
                    {label}
                </label>
                <input
                    className="form-control form-control-sm1 form-floating-height1"
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

    if (type === "textarea") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold1 ">
                    {label}
                </label>
                <textarea
                    className="form-control"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    value={formik.values[name]} 
                    rows={3}
                ></textarea>
            </div>
        );
    }

    if (type === "select") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <select
                    className="form-select"
                    id={name}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                >
                    <option value={""}>{placeholder}</option>
                    {
                        options.map((data, idx) =>{
                            return <option value={data.slug} key={data+idx}>{data.name}</option>
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
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <input
                    className="form-control"
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
    if (type === "files") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <input
                    className="form-control"
                    type="file"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={e =>{
                        formik.setFieldValue(name,e.target.files)
                    }}
                    multiple
                />
            </div>
        );
    }

    if (type === "date") {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label fw-bold1 ">
                    {label}
                </label>
                <input
                    className="form-control form-control-sm1 form-floating-height1"
                    type="date"
                    id={name}
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]} 
                />
            </div>
        );
    }
};

export default Input;
