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
    nom_entreprise: "",
    type_entreprise: "",
    secteur_activite: "",
};

const LoginModal = () => {
    const appCtx = useContext(AppContext);
    const { onUserChange } = appCtx;
    const navigate = useNavigate();
    const [isregisterForm, setIsRegisterForm] = useState(false);
    const [editePassword, setEditePassword] = useState(false);
    const [formStep, setFormStep] = useState("email");
    const [userForm, setUserForm] = useState(initUser);
    const stepMessage = {
        email: {
            title: "Vérification de votre email",
            button: "Envoyez le code",
        },
        otp: {
            title: "Vérifiez votre adresse mail",
            button: "Vérifié le code",
        },
        creation: {
            title: "Créer votre compte sur EMC",
            button: "Je crée un compte",
        },
        editePassword: {
            title: "Modification du mot de passe",
            button: "Modifier le mot de passe",
        },
    };
    const statuts = [
        { name: "Média", slug: "Média" },
        { name: "Annonceur", slug: "Annonceur" },
        { name: "Régie publicitaire", slug: "Régie publicitaire" },
    ];
    const entreprises = [
        {
            slug: "société en commandite simple (SCS)",
            name: "La société en commandite simple (SCS)",
        },
        {
            slug: "société en nom collectif (SNC)",
            name: "La société en nom collectif (SNC)",
        },
        {
            slug: "société à responsabilité limitée (SARL)",
            name: "La société à responsabilité limitée (SARL)",
        },
        { slug: "société anonyme (SA)", name: "La société anonyme (SA)" },
        {
            slug: "société par actions simplifiée (SAS)",
            name: "La société par actions simplifiée (SAS)",
        },
        {
            slug: "société en participation (SEP)",
            name: "La société en participation (SEP)",
        },
    ];
    const modalBtn = useRef();
    const onConnect = () => {
        navigate(listLink.dashboard + "tdb");
    };
    const changeForm = (e) => {
        e.preventDefault();
        setIsRegisterForm(!isregisterForm);
        setFormStep("email");
    };

    const editMyPassword = (e) => {
        changeForm(e);
        setEditePassword(true);
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
                if (editePassword) {
                    editPasswordOTP({ email: values.email });
                } else {
                    generateOTP({ email: values.email });
                }
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

            if (formStep === "editePassword") {
                const { email, otp, password, ...user } = values;
                changePassword({
                    email: userForm.email,
                    otp: userForm.otp,
                    password: values.password,
                });
            }
        },
    });

    const formikLogin = useFormik({
        initialValues: initUser,
        onSubmit: (values) => {
            console.log(values);
            login(values);
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
                        if (editePassword) {
                            setFormStep("editePassword");
                        } else {
                            setFormStep("creation");
                        }
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
    const editPasswordOTP = async (email) => {
        const response = await toast.promise(
            request.post(endPoint.editPasswordOTP, email),
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
                        console.log(data);
                        onUserChange({
                            isAuth: true,
                            status: data.data.user.status,
                            profile: data.data.user.image,
                            name:
                                data.data.user.lastname +
                                " " +
                                data.data.user.firstname,
                            token: data.data.access_token,
                            campagne: data.data.user.slug,
                        });
                        modalBtn.current.click();
                        onConnect();
                        return "Félicitations, votre compte a été créé avec succès";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);

                        const res = data.response.data;
                        return res.errors !== undefined
                            ? res.errors[0]
                            : res.error;
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
                            name:
                                data.data.user.lastname +
                                " " +
                                data.data.user.firstname,
                            token: data.data.access_token,
                            campagne: data.data.user.slug,
                        });
                        modalBtn.current.click();
                        onConnect();
                        console.log(data.data);
                        return "Connexion réussi !";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        const res = data.response.data;
                        return res.errors !== undefined
                            ? res.errors[0]
                            : res.error;
                    },
                },
            }
        );
        console.log(response);
    };
    const changePassword = async (data) => {
        console.log(data);
        const response = await toast.promise(
            request.post(endPoint.changePassword, data),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        //setFormStep("creation");
                        setFormStep("email");
                        setIsRegisterForm(false);
                        console.log(data);

                        //modalBtn.current.click();

                        return "Félicitations, votre mot de passe a été modifié avec succès";
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);

                        const res = data.response.data;
                        return res.errors !== undefined
                            ? res.errors[0]
                            : res.error;
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
                                        C’est ma première visite ?
                                    </div>
                                    <p>
                                        Créer votre compte sur EMC et, comme de
                                        nombreux annonceurs, diffuser de manière
                                        sécurisée,
                                        <br /> simple et fiable, vos publicités
                                        sur tous les supports publicitaires sans
                                        vous déplacer.
                                    </p>
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
                                            label={"Email"}
                                            placeholder={
                                                "Veuillez saisir votre adresse e-mail"
                                            }
                                            formik={formikLogin}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type={"password"}
                                            name={"password"}
                                            label={"Mot de passe"}
                                            placeholder={
                                                "Veuillez entrer votre mot de passe"
                                            }
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
                                        <span
                                            className="text-primary cursor"
                                            onClick={editMyPassword}
                                        >
                                            Mot de passe oublié ?
                                        </span>
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
                                        {editePassword
                                            ? "Mot de passe oublié ?"
                                            : stepMessage[formStep].title}
                                    </div>

                                    {formStep === "email" && (
                                        <div>
                                            <p>
                                                {editePassword
                                                    ? "Pour réinitialiser votre mot de passe, veuillez saisir votre adresse mail"
                                                    : `Pour continuer, nous devons
                                                    d'abord vérifier votre adresse
                                                    e-mail`}
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
                                                Nous venons juste de vous
                                                envoyer un code à 4 chiffres à
                                                l’adresse :
                                                <span className="text-primary">
                                                    {" "}
                                                    {userForm.email}
                                                </span>
                                            </p>
                                            <Input
                                                type={"text"}
                                                label={
                                                    "Saisissez-les dans le champ ci-dessous :"
                                                }
                                                placeholder={"Entrez le code"}
                                                name={"otp"}
                                                formik={formik}
                                            />
                                            <p>
                                                Rassurez-vous que cette fenêtre
                                                reste ouverte pendant que vous
                                                consultez votre boite mail.
                                            </p>
                                        </div>
                                    )}
                                    {formStep === "creation" &&
                                        editePassword === false && (
                                            <div>
                                                <p>
                                                    Et faites de la publicité
                                                    autrement !
                                                </p>
                                                <Input
                                                    type={"text"}
                                                    label={"Nom"}
                                                    placeholder={
                                                        "Veuillez saisir votre nom"
                                                    }
                                                    name={"lastname"}
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"text"}
                                                    label={"Prénom"}
                                                    placeholder={
                                                        "Veuillez entrer votre prénom"
                                                    }
                                                    name={"firstname"}
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"select"}
                                                    name={"genre"}
                                                    label={"Genre"}
                                                    placeholder={
                                                        "Sélectionnez votre genre"
                                                    }
                                                    formik={formik}
                                                    options={[
                                                        {
                                                            slug: "Homme",
                                                            name: "Homme",
                                                        },
                                                        {
                                                            slug: "Femme",
                                                            name: "Femme",
                                                        },
                                                    ]}
                                                />
                                                <Input
                                                    type={"text"}
                                                    label={"Numéro"}
                                                    placeholder={
                                                        "Veuillez entrer votre numéro de téléphone"
                                                    }
                                                    name={"number"}
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"select"}
                                                    label={"Statut"}
                                                    placeholder={
                                                        "Veuillez sélectionner un statut"
                                                    }
                                                    name={"status"}
                                                    formik={formik}
                                                    options={statuts}
                                                />
                                                <Input
                                                    type={"password"}
                                                    label={"Mot de passe"}
                                                    placeholder={
                                                        "Veuillez entrer un mot de passe"
                                                    }
                                                    name={"password"}
                                                    formik={formik}
                                                />
                                                <Input
                                                    type={"file"}
                                                    label={"Photo"}
                                                    placeholder={""}
                                                    name={"image"}
                                                    formik={formik}
                                                />
                                                <div className="border-bottom d-inline-block mb-3 text-22">
                                                    Informations de votre
                                                    entreprise
                                                </div>
                                                <div>
                                                    <Input
                                                        type={"text"}
                                                        name={"nom_entreprise"}
                                                        label={
                                                            "Nom de l'entreprise"
                                                        }
                                                        placeholder={
                                                            "Entrez le nom de l'entreprise"
                                                        }
                                                        formik={formik}
                                                    />
                                                    <Input
                                                        type={"select"}
                                                        name={"type_entreprise"}
                                                        label={
                                                            "Type d'entreprise"
                                                        }
                                                        placeholder={
                                                            "Sélectionnez le type d'entreprise"
                                                        }
                                                        formik={formik}
                                                        options={entreprises}
                                                    />

                                                    <Input
                                                        type={"text"}
                                                        name={
                                                            "secteur_activite"
                                                        }
                                                        label={
                                                            "Secteur d'activité"
                                                        }
                                                        placeholder={
                                                            "Entrez le secteur d'activité"
                                                        }
                                                        formik={formik}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    {formStep === "editePassword" &&
                                        editePassword === true && (
                                            <div>
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Corporis dolor sunt
                                                    cumque quis quos quas error
                                                    sequi incidunt pariatur,
                                                    illo odio possimus, at
                                                    perferendis, ipsa autem
                                                    itaque sit et. Saepe.
                                                </p>
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
                                                    type={"password"}
                                                    label={
                                                        "Comfirmer le mot de passe"
                                                    }
                                                    placeholder={
                                                        "Entrez de nouveau votre mot de passe"
                                                    }
                                                    name={"com_password"}
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
