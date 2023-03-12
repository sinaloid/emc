const ContentHeader = ({ title }) => {
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
                        <span type="button" class="input-group-text bg-primary text-white" id="basic-addon2">
                            Rechercher
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentHeader;
