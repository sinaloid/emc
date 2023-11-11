import { useFormik } from "formik";
import Section from "../components/Section";
import Page from "./Page";
import { toast } from "react-toastify";
import endPointPublic from "../services/endPointPublic";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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
            <Header />
            <Section bg="bg-gray">
                <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5">
                    <div className="row mt-3">
                        <div className="col-12 mb-3">
                            <Link className="text-decoration-none text-body-emphasis" to={"/"}>
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
                                <div className="text-muted">
                                    Nous vous demandons de remplir vos
                                    coordonnées dans le formulaire ci-contre
                                    uniquement pour que nos experts média
                                    puissent échanger avec vous sur votre
                                    projet. Vos données ne seront utilisées à
                                    aucune autre fin que celle-ci.
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
                            <div className="d-inline-block">
                                Besoin d’éléments publicitaires ?
                            </div>

                            <p className="p-0 m-0 text-muted">
                                (Visuel publicitaire, Sport radio ou TV,
                                Communiqué, etc)
                            </p>
                            <div>
                                <Input
                                    type={"radio"}
                                    name={"visuel"}
                                    label={"Oui, j’en ai besoin !"}
                                    formik={formik}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    type={"radio"}
                                    name={"visuel"}
                                    label={"Non, j’en ai déjà !"}
                                    formik={formik}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={formik.handleSubmit}
                                >
                                    Envoyer ma demande
                                </button>
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
