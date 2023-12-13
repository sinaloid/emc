import { useFormik } from "formik";
import Section from "../components/Section";
import Page from "./Page";
import { toast } from "react-toastify";
import endPointPublic from "../services/endPointPublic";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { StepOne } from "../components/imgs/StepOne";
import { StepContainer } from "../components/StepContainer";
import { StepThree } from "../components/imgs/StepThree";
import { StepTwo } from "../components/imgs/StepTwo";

const initData = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    date: "",
    //budget: "",
    description: "",
};

const CommentCaMarche = () => {
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
                <div className="col-12 col-md-10 col-lg-7 mx-auto pb-5">
                    <div className="row my-3">
                        <div className="col-12 mb-3">
                            <Link
                                className="text-decoration-none text-body-emphasis text-14 opacity-64"
                                to={"/"}
                            >
                                Accueil / Comment ça marche
                            </Link>
                        </div>
                        <div className="col-12">
                            Avec EMC nous souhaitons digitaliser et fluidifier
                            le processus d'achat d'espaces publicitaires afin de
                            permettre aux entreprises de toutes les tailles de
                            faire de la publicité facilement. De là où vous
                            êtes, communiquez sur les meilleurs médias aux
                            meilleurs tarifs et ce, sans parcourir le moindre
                            kilomètre grâce à notre plateforme.
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6 bg-white">
                            <StepContainer step={1} bg="bg-white">
                                <StepOne />
                            </StepContainer>
                        </div>
                        <div className="col-12 col-md-6">
                            <div>
                                <div className="text-primary text-36 my-3">
                                    Demande de devis
                                </div>
                                <div>
                                    Vous faites votre demande de devis
                                    gratuitement sur la base des espaces
                                    publicitaires choisis.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <div>
                                <div className="text-primary text-36 my-3">
                                    Réception du devis & Paiement
                                </div>
                                <div>
                                    Nous vous envoyons automatiquement votre
                                    devis par e-mail et vous procédez à son
                                    règlement.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 bg-white">
                            <StepContainer step={2} bg="bg-white">
                                <StepTwo />
                            </StepContainer>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6 bg-white">
                            <StepContainer step={3} bg="bg-white">
                                <StepThree />
                            </StepContainer>
                        </div>
                        <div className="col-12 col-md-6">
                            <div>
                                <div className="text-primary text-36 my-3">
                                    Diffusion & Envoi des justificatifs de
                                    campagne
                                </div>
                                <div>
                                    Nous diffusons vos éléments et vous envoyons
                                    vos justificatifs de campagne.
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

export default CommentCaMarche;
