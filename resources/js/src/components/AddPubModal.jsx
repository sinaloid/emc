import InputField from "./InputField";

const AddPuBModal = () => {
    return (
        <div id="addModal" className="modal fade" tabindex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title text-white">
                            Pour ajouter ce produit à votre panier, veuillez
                            nous fournir quelques détails
                        </h5>
                        <button
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    width={"100%"}
                                    src="https://source.unsplash.com/random/800x600/?product=1"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-8 border-start">
                                <div className="border-bottom d-inline-block mb-3 text-22">
                                    Description du produit
                                </div>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aliquam mattis eleifend
                                    tellus, vel viverra ante tincidunt placerat.
                                    Nulla mi dolor, pellentesque ut massa et,
                                    fermentum hendrerit purus. Suspendisse
                                    lacinia neque vitae metus viverra accumsan.
                                </p>
                                <div className="border-bottom d-inline-block mb-3 text-22">
                                    Détails de la campagne
                                </div>
                                <div>
                                    <InputField
                                        col="col-md-6"
                                        type={"select2"}
                                        label={"Date de diffusion"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                                <div className="border-bottom d-inline-block mb-3 text-22">
                                    Fichiers
                                </div>
                                <div>
                                    <InputField
                                        col="col-md-6"
                                        type={"file"}
                                        label={"Télécharger votre fichier"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aliquam mattis eleifend
                                    tellus, vel viverra ante tincidunt placerat.
                                    Nulla mi dolor, pellentesque ut massa et,
                                    fermentum hendrerit purus. Suspendisse
                                    lacinia neque vitae metus viverra accumsan.
                                </p>
                                <div>
                                    <InputField
                                        col="col-md-12"
                                        type={"checkbox2"}
                                        label={"Je certifie avoir lu et accepté les conditions"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addComfirmationModal"
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPuBModal;
