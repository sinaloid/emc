import { list } from "postcss";
import { useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import InputField from "./InputField";

const AddPubComfirmationModal = () => {

    const navigate = useNavigate()
    return (
        <div id="addComfirmationModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title text-white">
                            campagne ajoutée au panier avec succès
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
                            <div className="col-md-12 text-center mx-auto">
                                <span>Il y a 1 produit dans votre panier</span>
                                <h2>Affichage</h2>
                            </div>
                            <div className="col-md-10 mx-auto">
                                <img
                                    width={"100%"}
                                    src="https://source.unsplash.com/random/800x600/?product=1"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-12 my-3">
                                <div className="col-md-10 mx-auto">
                                    <span className="fw-bold">
                                        Dimensions :
                                    </span>
                                    <span> 4/3</span> <br />
                                    <span className="fw-bold">
                                        Situation géographique :
                                    </span>
                                    <span> Tanghin</span> <br />
                                    <span className="fw-bold">
                                        Disponibilité :
                                    </span>
                                    <span> à partir du 26 juin 2021</span>{" "}
                                    <br />
                                </div>
                            </div>
                            <div className="col-md-10 mx-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary mb-3 me-1"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(listLink.index)
                                    }}
                                >
                                    Continuer mes achats
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary mb-3"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(listLink.panier)
                                    }}
                                >
                                    Voir mon panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPubComfirmationModal;
