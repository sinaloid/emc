import { useFormik } from "formik";
import Section from "../components/Section";
import Page from "./Page";
import { toast } from "react-toastify";
import endPointPublic from "../services/endPointPublic";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import request from "../services/request";
import { useRef } from "react";

const initData = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    date: "",
    //budget: "",
    description: "",
};

const Accompagnement = () => {
    const comfirm = useRef();
    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            console.log(values);
            values.date = "2023-01-01";
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
                        comfirm.current.click();

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
            <Header />
            <Section bg="bg-gray">
                <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5">
                    <div className="row mt-3">
                        <div className="col-12 mb-3">
                            <Link
                                className="text-decoration-none text-body-emphasis text-14 opacity-64"
                                to={"/"}
                            >
                                Accueil / Accompagnement sur mesure
                            </Link>
                        </div>
                        <div className="col-md-7">
                            <div>
                                <h2 className="text-30 fw-bold mb-3">
                                    Faites grandir et rayonner votre
                                    communication !
                                </h2>
                                <div>
                                    <span className="d-block mb-3">
                                        Vous souhaitez communiquer sur un
                                        support ou un média en particulier et :
                                    </span>
                                    <ul>
                                        <li>
                                            Vous ne savez pas sur quel média ou
                                            support communiquer ?
                                        </li>
                                        <li>
                                            Vous ne disposez pas d’éléments
                                            publicitaires (visuel, spots, ...) à
                                            diffuser ?
                                        </li>
                                        <li>
                                            Vous souhaitez être accompagné de
                                            bout en bout dans le lancement de
                                            votre campagne de communication ?
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-30 fw-bold mb-3">
                                    Vous êtes au bon endroit !
                                </h2>
                                <div className="mb-3">
                                    Sur EMC, nous répondons à toutes vos
                                    préoccupations liées à l’achat média. Pour
                                    cela, nous vous donnons la possibilité de
                                    faire une demande sur mesure.{" "}
                                    <span className="fw-bold">
                                        Un expert média vous contactera sous 24h
                                        et se chargera de vous accompagner sur
                                        tout le processus, de A à Z.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 bg-white p-5 text-18">
                            <div className="d-inline-block mb-3">
                                Les champs marqués d'un{" "}
                                <span className="text-primary">*</span> sont
                                obligatoires
                            </div>

                            <div>
                                <Input
                                    type={"text"}
                                    name={"lastname"}
                                    label={"Votre nom de famille"}
                                    placeholder={"Entrez votre nom de famille"}
                                    formik={formik}
                                />
                            </div>
                            <div>
                                <Input
                                    type={"text"}
                                    name={"firstname"}
                                    label={"Votre prénom"}
                                    placeholder={"Entrez votre prénom"}
                                    formik={formik}
                                />
                            </div>
                            <div>
                                <Input
                                    type={"text"}
                                    name={"email"}
                                    label={"Votre adresse E-mail"}
                                    placeholder={"Entrez votre adresse E-mail"}
                                    formik={formik}
                                />
                            </div>
                            <div>
                                <Input
                                    type={"text"}
                                    name={"phone"}
                                    label={"Votre numéro de téléphone"}
                                    placeholder={
                                        "Entrez votre numéro de téléphone"
                                    }
                                    formik={formik}
                                />
                            </div>

                            <div>
                                <Input
                                    type={"textarea"}
                                    name={"description"}
                                    label={"Votre besoin"}
                                    placeholder={"Décrivez ici votre besoin"}
                                    formik={formik}
                                />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100"
                                    onClick={formik.handleSubmit}
                                >
                                    Envoyer ma demande
                                </button>
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
                                            Demande d'accompagnement sur mésure
                                        </div>

                                        <p>
                                            Votre demande a été envoyée avec
                                            succès. Nous vous contacterons très
                                            bientôt pour une prise en charge .{" "}
                                            <br />A très vite sur EMC !
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
            </Section>
            <Footer />
        </>
    );
};

export default Accompagnement;
