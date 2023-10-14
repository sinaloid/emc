import { useFormik } from "formik";
import Input from "./Input";
import InputField from "./InputField";
import { toast } from "react-toastify";
import { useContext, useRef, useState } from "react";
import request from "../services/request";
import endPointPublic from "../services/endPointPublic";
import { list } from "postcss";
import { getCampagne, setCampagne } from "../services/storage";
import { AppContext } from "../services/context";

const initData = {
    lastname: "",
    firstname: "",
    email: "",
    number: "",
    name: "",
    files: "",
    budget: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "En cours",
};
const CampagneModal = ({ refresh }) => {
    const appCtx = useContext(AppContext);
    const { user } = appCtx;
    const close = useRef();
    const comfirm = useRef();
    const list = getCampagne();
    const [email, setEmail] = useState("")

    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            const { lastname, firstname, email, number, files, ...data } =
                values;
            const userData = {
                lastname: lastname,
                firstname: firstname,
                email: email,
                number: number,
                status: "Annonceur",
            };
            postDemande({
                slug: user.campagne ? user.campagne : "null",
                user: userData,
                campagne: data,
                publicite: list,
                files: files,
            });
            //formik.resetForm();
        },
    });

    const postDemande = async (values) => {
        console.log(values);
        const response = await toast.promise(
            request.post(endPointPublic.demandeDevis, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        //close.current.click();
                        comfirm.current.click();
                        setCampagne([]);
                        refresh();
                        setEmail(res.data.data)
                        //get();
                        return "Votre demande de devis a bien été reçue !";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        const res = data.response.data;
                        return res.errors !== undefined
                            ? res.errors
                            : res.error;
                    },
                },
            }
        );
    };
    return (
        <>
            <div id="campagne" className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white">
                                Demande de devis
                            </h5>
                            <button
                                type="button"
                                className="btn-close bg-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={close}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    {!user.campagne && (
                                        <>
                                            <div className="border-bottom d-inline-block mb-3 text-22">
                                                Informations personnel
                                            </div>
                                            <div>
                                                <Input
                                                    type={"text"}
                                                    name={"lastname"}
                                                    label={"Nom"}
                                                    placeholder={
                                                        "Entrez votre nom"
                                                    }
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"text"}
                                                    name={"firstname"}
                                                    label={"Prénom"}
                                                    placeholder={
                                                        "Entrez votre prénom"
                                                    }
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"text"}
                                                    name={"email"}
                                                    label={"Email"}
                                                    placeholder={
                                                        "Entrez votre email"
                                                    }
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"text"}
                                                    name={"number"}
                                                    label={"Téléphone"}
                                                    placeholder={
                                                        "Entrez votre numéro"
                                                    }
                                                    formik={formik}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="border-bottom d-inline-block mb-3 text-22">
                                        Détails de le campagne publicitaire
                                    </div>
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"name"}
                                            label={"Nom"}
                                            placeholder={
                                                "Entrez le nom de campagne"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                    {/**
                                     * <div>
                                        <Input
                                            type={"date"}
                                            name={"startDate"}
                                            label={"Date de debut"}
                                            placeholder={"Entrez votre prénom"}
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"date"}
                                            name={"endDate"}
                                            label={"Date de fin"}
                                            placeholder={
                                                "Entrez votre numéro de téléphone"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"budget"}
                                            label={"Coût"}
                                            placeholder={"Entrez votre budget"}
                                            formik={formik}
                                        />
                                    </div>
                                     */}
                                    <div>
                                        <Input
                                            type={"files"}
                                            name={"files"}
                                            label={
                                                "Joindre des fichiers à la campagne"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"textarea"}
                                            name={"description"}
                                            label={"Description"}
                                            placeholder={"Décrivez vos besion"}
                                            formik={formik}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={formik.handleSubmit}
                                        >
                                            Envoyer ma demande
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                ref={comfirm}
                type="hidden"
                data-bs-toggle="modal"
                data-bs-target="#comfirmation"
            />
            <div id="comfirmation" className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white"></h5>
                            <button
                                type="button"
                                className="btn-close bg-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={close}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    <div className="border-bottom d-inline-block mb-3 text-22">
                                        Votre demande a été envoyée avec succès.
                                    </div>

                                    <p>
                                        Votre demande a été envoyée avec succès.
                                        Nous vous remercions d’avoir choisi EMC
                                        pour acheter vos espaces publicitaires.
                                        Nous vous avons envoyé votre devis par
                                        mail à l’adresse suivante :<br />
                                        <span className="text-primary">{email}</span>. <br />
                                        A très vite sur EMC !1
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            Fermer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampagneModal;
