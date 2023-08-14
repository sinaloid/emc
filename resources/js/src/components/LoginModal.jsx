import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import InputField from "./InputField";
import { useContext, useRef, useState } from "react";
import { useFormik } from "formik";
import Input from "./Input";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../services/context";

const initUser = {
    email: "",
    otp: "",
    number: "",
    firstname: "",
    lastname: "",
    status: "",
    password: "",
};

const LoginModal = () => {
    const appCtx = useContext(AppContext);
    const { onUserChange } = appCtx;
    const navigate = useNavigate();
    const [isregisterForm, setIsRegisterForm] = useState(false);
    const [formStep, setFormStep] = useState("email");
    const [userForm, setUserForm] = useState(initUser);
    const stepMessage = {
        email: {
            title: "Vérification de votre email",
            button: "Envoyez le code",
        },
        otp: {
            title: "Vérification du code envoyé",
            button: "Vérifié le code",
        },
        creation: {
            title: "Création de votre compte",
            button: "Créer mon compte",
        },
    };
    const statuts = [
        {name:"Média",slug:"Média"},
        {name:"Annonceur",slug:"Annonceur"},
        {name:"Régie publicitaire",slug:"Régie publicitaire"},
    ]
    const modalBtn = useRef()
    const onConnect = () => {
        navigate(listLink.dashboard);
    };
    const changeForm = (e) => {
        e.preventDefault();
        setIsRegisterForm(!isregisterForm);
        setFormStep("email");
    };

    const formik = useFormik({
        initialValues: initUser,
        onSubmit: (values) => {
            console.log(values);

            if (formStep === "email") {
                setUserForm({
                    ...userForm,
                    email: values.email,
                });
                generateOTP({ email: values.email });
            }

            if (formStep === "otp") {
                setUserForm({
                    ...userForm,
                    otp: values.otp,
                });
                verifyOTP({
                    email: userForm.email,
                    otp: values.otp,
                });
            }

            if (formStep === "creation") {
                const { email, otp, ...user } = values;
                register({
                    ...userForm,
                    ...user,
                });
            }
        },
    });

    const formikLogin = useFormik({
        initialValues: initUser,
        onSubmit: (values) => {
            console.log(values);
            login(values)
        },
    });

    const generateOTP = async (email) => {
        const response = await toast.promise(
            request.post(endPoint.generateOTP, email),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        setFormStep("otp");
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        return data.response.data.errors[0];
                    },
                },
            }
        );
        console.log(response);
    };

    const verifyOTP = async (otp) => {
        const response = await toast.promise(
            request.post(endPoint.verifyOTP, otp),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        setFormStep("creation");
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        return data.response.data.error;
                    },
                },
            }
        );
        console.log(response);
    };

    const register = async (data) => {
        const response = await toast.promise(
            request.post(endPoint.register, data, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        setFormStep("creation");
                        console.log(data)
                        onUserChange({
                            isAuth: true,
                            status: data.data.user.status,
                            profile: data.data.user.image,
                            name: data.data.user.lastname + " "+data.data.user.firstname,
                            token: data.data.access_token,
                        });
                        modalBtn.current.click()
                        onConnect();
                        return "Félicitations, votre compte a été créé avec succès";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)

                        const res = data.response.data
                        return res.errors !== undefined ? res.errors[0] : res.error;
                    },
                },
            }
        );
        console.log(response);
    };
    const login = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.login, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        setFormStep("creation");
                        onUserChange({
                            isAuth: true,
                            status: data.data.user.status,
                            profile: data.data.user.image,
                            name: data.data.user.lastname + " "+data.data.user.firstname,
                            token: data.data.access_token,
                        });
                        modalBtn.current.click()
                        onConnect();
                        console.log(data.data)
                        return "Connexion réussi !";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)
                        const res = data.response.data
                        return res.errors !== undefined ? res.errors[0] : res.error;
                    },
                },
            }
        );
        console.log(response);
    };
    return (
        <div id="loginModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            ref={modalBtn}
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {!isregisterForm ? (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className=" d-inline-block mb-3 text-22">
                                        c'est ma première visite
                                    </div>
                                    <ul>
                                        {[...Array(4).keys()].map(
                                            (data, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        Diversifiez votre
                                                        portefeuille annonceurs
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-tertiary w-100"
                                            onClick={changeForm}
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
                                        <Input
                                            type={"text"}
                                            name={"email"}
                                            label={"Mon E-mail"}
                                            placeholder={"Mon E-mail"}
                                            formik={formikLogin}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"password"}
                                            name={"password"}
                                            label={"Mot de passe"}
                                            placeholder={"Entrez votre mot de passe"}
                                            formik={formikLogin}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            //data-bs-dismiss="modal"
                                            onClick={formikLogin.handleSubmit}
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
                                            style={{
                                                backgroundColor: "#3B5998",
                                            }}
                                        >
                                            Se connecter avec Facebook
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn text-white w-100 mb-3"
                                            style={{
                                                backgroundColor: "#0E76A8",
                                            }}
                                        >
                                            Se connecter avec LinkedIn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row py-4">
                                <div className="col-md-10 mx-auto">
                                    <div className="d-inline-block mb-3 text-22 text-center">
                                        {stepMessage[formStep].title}
                                    </div>

                                    {formStep === "email" && (
                                        <div>
                                            <p>
                                                Afin de vous inscrire sur EMC,
                                                nous devons d'abord vérifier
                                                votre adresse e-mail.
                                            </p>
                                            <Input
                                                type={"text"}
                                                label={"Mon e-mail"}
                                                placeholder={
                                                    "Entrez votre email"
                                                }
                                                name={"email"}
                                                formik={formik}
                                            />
                                        </div>
                                    )}
                                    {formStep === "otp" && (
                                        <div>
                                            <p>
                                                Votre code a été envoyé à :
                                                <span className="text-primary">
                                                    {" "}
                                                    {userForm.email}
                                                </span>
                                            </p>
                                            <Input
                                                type={"text"}
                                                label={
                                                    "Veuillez copier et coller votre code ici"
                                                }
                                                placeholder={"Entrez le code"}
                                                name={"otp"}
                                                formik={formik}
                                            />
                                        </div>
                                    )}
                                    {formStep === "creation" && (
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Corporis dolor sunt cumque quis
                                                quos quas error sequi incidunt
                                                pariatur, illo odio possimus, at
                                                perferendis, ipsa autem itaque
                                                sit et. Saepe.
                                            </p>
                                            <Input
                                                type={"text"}
                                                label={"Nom"}
                                                placeholder={"Entrez votre nom"}
                                                name={"lastname"}
                                                formik={formik}
                                            />
                                            <Input
                                                type={"text"}
                                                label={"Prénom"}
                                                placeholder={
                                                    "Entrez votre prénom"
                                                }
                                                name={"firstname"}
                                                formik={formik}
                                            />
                                            <Input
                                                type={"text"}
                                                label={"Numéro"}
                                                placeholder={
                                                    "Entrez votre numéro"
                                                }
                                                name={"number"}
                                                formik={formik}
                                            />
                                            <Input
                                                type={"select"}
                                                label={"Statut"}
                                                placeholder={
                                                    "Sélectionnez votre statut"
                                                }
                                                name={"status"}
                                                formik={formik}
                                                options={statuts}
                                            />
                                            <Input
                                                type={"password"}
                                                label={"Mot de passe"}
                                                placeholder={
                                                    "Entrez votre mot de passe"
                                                }
                                                name={"password"}
                                                formik={formik}
                                            />
                                            <Input
                                                type={"file"}
                                                label={"Photo de profile"}
                                                placeholder={""}
                                                name={"image"}
                                                formik={formik}
                                            />
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={formik.handleSubmit}
                                        >
                                            {stepMessage[formStep].button}
                                        </button>
                                    </div>
                                    <div className="d-flex">
                                        <Link
                                            className="text-primary me-auto"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                generateOTP({
                                                    email: userForm.email,
                                                });
                                            }}
                                            to={"#"}
                                        >
                                            Renvoyez le code ?
                                        </Link>
                                        <Link
                                            className="text-primary"
                                            onClick={changeForm}
                                            to={"#"}
                                        >
                                            J'ai déjà un compte ?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default LoginModal;
