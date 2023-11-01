import { list } from "postcss";
import { useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import InputField from "./InputField";
import { URL } from "../services/request";
import { useContext } from "react";
import { AppContext } from "../services/context";

const AddPubComfirmationModal = ({ data }) => {
    const appCtx = useContext(AppContext);
    const { user } = appCtx;
    const navigate = useNavigate();
    console.log(data);
    return (
        <div id="addComfirmationModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title text-white">
                            Campagne ajoutée au panier avec succès
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
                                <span>Il y a {user.panier ? user.panier : "0 "} produit dans votre panier</span>
                                <h2>{data.name}</h2>
                            </div>
                            <div className="col-md-10 mx-auto">
                                <img
                                    width={"100%"}
                                    src={URL + "" + data.image}
                                    alt=""
                                />
                            </div>
                            <div className="col-md-12 my-3">
                                <div className="col-md-10 mx-auto">
                                    <span className="fw-bold">
                                        Catégorie :
                                    </span>
                                    <span> {data?.media?.categorie_media?.name}</span> <br />
                                    <span className="fw-bold">
                                        Média :
                                    </span>
                                    <span> {data?.media?.name}</span> <br />
                                    {
                                        /**
                                         * <span className="fw-bold">
                                        Disponibilité :
                                    </span>
                                    <span> {data.status !== null ? <>à partir du 26 juin 2021</>:<> Immédiate</>}</span>{" "}
                                    <br />
                                         */
                                    }
                                </div>
                            </div>
                            <div className="col-md-10 mx-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary mb-3 me-1"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(listLink.index);
                                    }}
                                >
                                    Continuer mes achats
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary mb-3"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(listLink.panier);
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
