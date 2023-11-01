import { useFormik } from "formik";
import Input from "./Input";
import InputField from "./InputField";
import { toast } from "react-toastify";
import { useRef } from "react";
import request from "../services/request";
import endPointPublic from "../services/endPointPublic";

const initData = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    date: "",
    //budget: "",
    description: "",
};
const AccompagnementModal = () => {
    const close = useRef();
    const comfirm = useRef();
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            values.date = "2023-01-01"
            post(values);
            formik.resetForm();
        },
    });

    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPointPublic.accompagnements, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        close.current.click();
                        comfirm.current.click();
                        //get();
                        return "Votre demande d'accompagnement a bien été reçue !";
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
            <div id="accompagnement" className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white">
                            Je souhaite un accompagnement sur-mesure
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
                                    <div className="border-bottom d-inline-block mb-3 text-22">
                                        C'est quoi l'accompagnement sur mésure ?
                                    </div>

                                    <p>
                                        Demandez gratuitement <br />
                                        un devis Un expert vous contacte dans
                                        délai de 24h maximum Nous vous
                                        accompagnons sur tout le processus
                                    </p>
                                    <div className="border-bottom d-inline-block mb-3 text-22">
                                        Détails de l'accompagnement
                                    </div>
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"lastname"}
                                            label={"Nom"}
                                            placeholder={"Entrez votre nom"}
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"firstname"}
                                            label={"Prénom"}
                                            placeholder={"Entrez votre prénom"}
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"email"}
                                            label={"Email"}
                                            placeholder={
                                                "Entrez votre adresse mail"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"text"}
                                            name={"phone"}
                                            label={"Téléphone"}
                                            placeholder={
                                                "Entrez votre numéro de téléphone"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                    
                                    {/**
                                     * <div>
                                        <Input
                                            type={"date"}
                                            name={"date"}
                                            label={
                                                "Date de début de la diffusion"
                                            }
                                            formik={formik}
                                        />
                                    </div>
                                     * <div>
                                        <Input
                                            type={"text"}
                                            name={"budget"}
                                            label={"Coût"}
                                            placeholder={"Entrez votre budget"}
                                            formik={formik}
                                        />
                                    </div> */}
                                    <div>
                                        <Input
                                            type={"textarea"}
                                            name={"description"}
                                            label={"Description"}
                                            placeholder={"Décrivez vos besion"}
                                            formik={formik}
                                        />
                                    </div>
                                    <div className="border-bottom d-inline-block mb-3 text-22">
                                        Autres
                                    </div>

                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Aliquam mattis eleifend
                                        tellus, vel viverra ante tincidunt
                                        placerat. Nulla mi dolor, pellentesque
                                        ut massa et, fermentum hendrerit purus.
                                        Suspendisse lacinia neque vitae metus
                                        viverra accumsan.
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
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Aliquam mattis eleifend
                                        tellus, vel viverra ante tincidunt
                                        placerat. Nulla mi dolor, pellentesque
                                        ut massa et, fermentum hendrerit purus.
                                        Suspendisse lacinia neque vitae metus
                                        viverra accumsan.
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

export default AccompagnementModal;
