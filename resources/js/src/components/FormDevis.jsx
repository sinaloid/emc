import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Banier from "./Banier";
import InputField from "./InputField";

const FormDevis = ({produit,link}) => {
    return (
        <>
            <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5 bg-gray">
                <div className="row">
                    <div className="col-md-10 mx-auto py-4 order-2 order-md-1">
                        <h2 className="fw-bold text-40 mb-3">
                            Demande de devis pour {produit?.name}
                        </h2>
                        <p className="mb-3">
                            Les champs marqués d'un * sont obligatoires
                        </p>
                        <div className="border-bottom d-inline-block mb-3">
                            informations relatives à votre identité
                        </div>
                        <div className="row">
                            <div>
                                <InputField
                                    type={"text2"}
                                    col="col-md-3"
                                    label={"Nom *"}
                                    value={""}
                                    placeholder={"Exemple: Kaboré"}
                                />
                            </div>
                            <div>
                                <InputField
                                    type={"text2"}
                                    col="col-md-3"
                                    label={"Prénom (s) *"}
                                    value={""}
                                    placeholder={"Exemple: Karim"}
                                />
                            </div>
                            <div>
                                <InputField
                                    type={"text2"}
                                    col="col-md-3"
                                    label={"Adresse mail *"}
                                    value={""}
                                    placeholder={"moi@gmail.com"}
                                />
                            </div>
                        </div>
                        <div className="border-bottom d-inline-block mb-3">
                            informations sur l'entreprise
                        </div>
                        <div className="row">
                            <div>
                                <InputField
                                    type={"text2"}
                                    col="col-md-3"
                                    label={"Nom ou raison sociale"}
                                    value={""}
                                    placeholder={""}
                                />
                            </div>
                            <InputField
                                col="col-md-3"
                                type={"select2"}
                                label={"Type d'entreprise"}
                                value={""}
                                options={[]}
                            />
                        </div>
                        <div className="border-bottom d-inline-block mb-3">
                            Détails de la campagne
                        </div>
                        <div className="row">
                            <div>
                                <InputField
                                    col="col-md-3"
                                    type={"select2"}
                                    label={"Tranches journalières"}
                                    value={""}
                                    options={[]}
                                />
                            </div>
                            <div>
                                <InputField
                                    col="col-md-3"
                                    type={"select2"}
                                    label={"Plage horaire"}
                                    value={""}
                                    options={[]}
                                />
                            </div>
                            <div className="row">
                                <InputField
                                    col="col-md-3"
                                    type={"select2"}
                                    label={"Durée du spot"}
                                    value={""}
                                    options={[]}
                                />
                                <InputField
                                    col="col-md-3"
                                    type={"text2"}
                                    label={"Coût"}
                                    placeholder={"Entrez le coût"}
                                    value={""}
                                    options={[]}
                                />
                                <div>
                                    <InputField
                                        col="col-md-3"
                                        type={"select2"}
                                        label={"Date de diffusion"}
                                        placeholder={"Entrez le coût"}
                                        value={""}
                                        options={[]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom d-inline-block mb-3">
                            Fichiers
                        </div>
                        <div className="row">
                            <div>
                                <InputField
                                    type={"file"}
                                    col="col-md-3"
                                    label={"Nom ou raison sociale"}
                                    value={""}
                                    placeholder={""}
                                />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Aliquam mattis eleifend tellus,
                                vel viverra ante tincidunt placerat. Nulla mi
                                dolor, pellentesque ut massa et, fermentum
                                hendrerit purus. Suspendisse lacinia neque vitae
                                metus viverra accumsan.
                            </p>
                            <div>
                                <InputField
                                    col="col-md-12"
                                    type={"checkbox2"}
                                    label={
                                        "Je certifie avoir lu et accepté les conditions"
                                    }
                                    value={""}
                                    options={[]}
                                />
                            </div>
                            <div className="col-md-4">
                                <Link
                                    to={link}
                                    className="btn btn-primary"
                                >
                                    Envoyer la demande de service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Banier
                fitrstTitle={"Qu'est-ce qu'un spot publicitaire ?"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={
                    "Les avantages à communiquer par un spot publicitaire"
                }
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={""}
                bg={"bg-white"}
                hasImgs={false}
            />
        </>
    );
};

export default FormDevis;
