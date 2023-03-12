const ContentHeader = ({ title, firstBtn = "", secondBtn ="", addBtn = ""}) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 px-1 px-md-2">
                <h1 className="h2 me-auto">{title}</h1>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div class="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher..."
                            aria-describedby="basic-addon2"
                        />
                        <span
                            type="button"
                            class="input-group-text bg-primary text-white"
                            id="basic-addon2"
                        >
                            Rechercher
                        </span>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="d-flex">
                    <div className="btn-group me-auto">
                        {
                            firstBtn !=="" && <button className="btn btn-tertiary">
                            {firstBtn}
                        </button>
                        }
                        {
                            secondBtn !=="" && <button className="btn btn-secondary">
                            {secondBtn}
                        </button>
                        }
                    </div>
                    <div>
                        <div className="d-inline-block me-2">
                            <button className="btn btn-tertiary-full">
                                <i class="bi bi-arrow-left-square-fill"></i>
                            </button>
                            <div className="d-inline-block mx-2">
                                1 - sur 10
                            </div>
                            <button className="btn btn-tertiary-full">
                                <i class="bi bi-arrow-right-square-fill"></i>
                            </button>
                        </div>
                        <button className="btn btn-tertiary me-2">
                            <i class="bi bi-filter-circle-fill"></i> Filtrer
                        </button>
                        {
                            addBtn !=="" && <button className="btn btn-tertiary-full">
                            {addBtn}
                        </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentHeader;
