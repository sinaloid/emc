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
                    </div>
                </div>
            </Section>
            {/** <Footer /> */}
        </>
    );
};

export default CommentCaMarche;
