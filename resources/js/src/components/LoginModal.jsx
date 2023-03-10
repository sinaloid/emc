import { Link } from "react-router-dom";
import InputField from "./InputField";

const LoginModal = () => {
    return (
        <div id="loginModal" className="modal fade" tabindex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className=" d-inline-block mb-3 text-22">
                                    c'est ma première visite
                                </div>
                                <ul>
                                    {
                                        [...Array(4).keys()].map((data, idx)=>{
                                            return <li key={idx}>Diversifiez votre portefeuille annonceurs</li>
                                        })
                                    }
                                </ul>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-tertiary w-100"
                                        
                                    >
                                        Je crée un compte
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 border-start">
                                <div className="d-inline-block mb-3 text-22">
                                    On se connait déjà ?
                                </div>

                                <div>
                                    <InputField
                                        col="col-md-12"
                                        type={"text2"}
                                        label={"Mon E-mail"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                                <div>
                                    <InputField
                                        col="col-md-12"
                                        type={"text2"}
                                        label={"Mon mot de passe"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                                
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        
                                    >
                                        Je me connecte
                                    </button>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Link className="text-primary" to="#">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <p className="text-center">ou</p>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn text-white w-100 mb-3"
                                        style={{backgroundColor:"#3B5998"}}

                                    >
                                        Se connecter avec Facebook
                                    </button>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn text-white w-100 mb-3"
                                        style={{backgroundColor:"#0E76A8"}}
                                    >
                                        Se connecter avec LinkedIn
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

export default LoginModal;
