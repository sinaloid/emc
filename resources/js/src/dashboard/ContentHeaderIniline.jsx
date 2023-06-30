const ContentHeaderIniline = ({
    title,
    firstBtn = "",
    secondBtn = "",
    addBtn = "",
    tabView="",
    restForm
}) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 px-1 px-md-2">
                <h1 className="h2 me-auto">{title}</h1>
            </div>
            <div className="row my-3">
            <div className="col-12 col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher..."
                            aria-describedby="basic-addon2"
                        />
                        <span
                            type="button"
                            className="input-group-text bg-primary text-white"
                            id="basic-addon2"
                        >
                            Rechercher
                        </span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex">
                        <div className="btn-group me-auto">
                            {firstBtn !== "" && (
                                <button className="btn btn-tertiary">
                                    {firstBtn}
                                </button>
                            )}
                            {secondBtn !== "" && (
                                <button className="btn btn-secondary">
                                    {secondBtn}
                                </button>
                            )}
                        </div>
                        <div>
                            <div className="d-inline-block me-2">
                                <button className="btn btn-tertiary-full">
                                    <i className="bi bi-arrow-left-square-fill"></i>
                                </button>
                                <div className="d-inline-block mx-2">
                                    1 - sur 10
                                </div>
                                <button className="btn btn-tertiary-full">
                                    <i className="bi bi-arrow-right-square-fill"></i>
                                </button>
                            </div>
                            <button className="btn btn-tertiary me-2">
                                <i className="bi bi-filter-circle-fill"></i> Filtrer
                            </button>
                            {addBtn !== "" && (
                                <button className="btn btn-tertiary-full" data-bs-toggle="modal" data-bs-target={"#"+tabView} onClick={e =>{
                                    e.preventDefault()
                                    console.log(restForm)
                                    restForm.resetForm()
                                }}>
                                    {addBtn}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentHeaderIniline;
