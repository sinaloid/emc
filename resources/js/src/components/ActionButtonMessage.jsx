const ActionButtonMessage = ({ btnViewProps, btnEditProps, data, editData, destroy, view}) => {
    return (
        <div className="btn-group">
            <button
                type="button"
                className="btn btn-tertiary me-1 rounded"
                {...btnViewProps}
                onClick={e =>{
                    e.preventDefault()
                    view(data)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill d-inline"
                    viewBox="0 0 16 16"
                >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                </svg>
            </button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#destroy" className="btn btn-secondary rounded" onClick={e =>{
                    e.preventDefault()
                    console.log(data)

                    editData(data)
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill d-inline"
                    viewBox="0 0 16 16"
                >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
            </button>

            <div className="modal fade" id="destroy">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Suppression de données
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-start">
                            Vous êtes sur le point de supprimer definitivement des données,<br />
                                    Voulez-vous continuer ?
                            </p>
                            <div className="modal-footer d-flex justify-content-start border-0 p-0">
                                <button
                                    type="reset"
                                    className="btn btn-tertiary"
                                    data-bs-dismiss="modal"
                                    ref={close}
                                >
                                    Non
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                    onClick={e =>{
                                        e.preventDefault()
                                        destroy(data)
                                    }}
                                    data-bs-dismiss="modal"
                                >
                                    Oui
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionButtonMessage;
