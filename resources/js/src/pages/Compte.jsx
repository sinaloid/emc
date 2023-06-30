import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import endPoint from "../services/endPoint";
import request, { URL_ } from "../services/request";
import { useFormik } from "formik";
import Input from "../components/Input";
import { AppContext } from "../services/context";
//import del from "../assets/imgs/delete.png";

const initUser = {
    lastname: "",
    firstname: "",
    status: "",
    image: "",
    number: "",
    email: "",
};
const Compte = () => {
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;
    const [datas, setDatas] = useState([]);
    const [medias, setMedias] = useState([]);
    const [viewData, setViewData] = useState(initUser);
    const statuts = [
        { name: "Média", slug: "Média" },
        { name: "Annonceur", slug: "Annonceur" },
        { name: "Régie publicitaire", slug: "Régie publicitaire" },
    ];
    const imageRef = useRef();
    const [password, setPassword] = useState({
        new: "",
        newRepeat: "",
        old: "",
    });

    useEffect(() => {
        get();
    }, []);

    const formik = useFormik({
        initialValues: initUser,
        onSubmit: (values) => {
            console.log(values);
            values.password=password.new
            values.oldPassword=password.old
            console.log(values)
            update(values);
        },
    });

    const get = () => {
        request
            .get(endPoint.users + "/auth")
            .then((res) => {
                setDatas(res.data.users);
                console.log(res.data.users);
                const user = res.data.users;
                formik.setFieldValue("lastname", user.lastname);
                formik.setFieldValue("firstname", user.firstname);
                formik.setFieldValue("email", user.email);
                formik.setFieldValue("status", user.status);
                formik.setFieldValue("number", user.number);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const update = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.users + "/update", values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        //window.location.reload()
                        //get();
                        onUserChange({
                            ...user,
                            status: data.data.user.status,
                            profile: data.data.user.image,
                            name:
                                data.data.user.lastname +
                                " " +
                                data.data.user.firstname,
                        });
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        return data.response.data.errors;
                    },
                },
            }
        );
    };

    const onChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="row">
                <h1 className="h2">Paramètres de mon compte</h1>
            </div>
            <div className="row my-4">
                <div className="col-12 col-md-5 col-lg-4">
                    <img
                        width="100%"
                        src={
                            formik.values.image === ""
                                ? URL_ + "" + datas.image
                                : URL.createObjectURL(formik.values.image)
                        }
                        alt=""
                    />
                    <div className="my-3">
                        <button
                            className="btn btn-primary me-2 w-100"
                            onClick={(e) => {
                                e.preventDefault();
                                imageRef.current.click();
                            }}
                        >
                            Modifier la photo
                        </button>
                        <img src={""} alt="" />
                    </div>
                    <div className="border border-1 p-4 mt-4">
                        <p className="text-16 text-bold">Autres actions</p>
                        <button
                            className="btn border border-1 my-2 w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#password"
                        >
                            Modification du mot de passe
                        </button>
                        {/*<button
              className="btn border border-1 my-2 w-100"
              data-bs-dismiss="modal"
            >
              Aide et support
            </button>
            <button
              className="btn border border-1 my-2 w-100"
              data-bs-dismiss="modal"
            >
              Conditions d’utilisation
            </button>*/}
                    </div>
                </div>
                <div className="col-12 col-md-7 col-lg-6 mx-auto border border-1 p-4">
                    <p className="text-16 text-bold">
                        Mes informations personnelles
                    </p>
                    <form onSubmit={formik.handleSubmit} className="w-100">
                        <Input
                            type={"text"}
                            name={"lastname"}
                            label={"Nom"}
                            placeholder={"Entrez votre nom"}
                            formik={formik}
                        />
                        <Input
                            type={"text"}
                            name={"firstname"}
                            label={"Prénom"}
                            placeholder={"Entrez votre prénom"}
                            formik={formik}
                        />
                        <Input
                            type={"text"}
                            name={"email"}
                            label={"Email"}
                            placeholder={"Entrez votre adresse mail"}
                            formik={formik}
                        />

                        <Input
                            type={"text"}
                            name={"number"}
                            label={"Téléphone"}
                            placeholder={"Entrez votre numéro de téléphone"}
                            formik={formik}
                        />

                        <Input
                            type={"select"}
                            name={"status"}
                            label={"Statut"}
                            placeholder={"Entrez votre statut"}
                            formik={formik}
                            options={statuts}
                        />
                        <input
                            ref={imageRef}
                            type="file"
                            hidden
                            onChange={(e) =>
                                formik.setFieldValue("image", e.target.files[0])
                            }
                        />
                        <div className="d-flex justify-content-start border-0">
                            <button type="submit" className="btn btn-primary">
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="password">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Modification du mot de passe
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <p className="fw-bold text-danger">
                            Le mot de passe doit être composé d'au moins 8 caractères, incluant obligatoirement une lettre majuscule, un caractère spécial, ainsi que des chiffres ou des lettres.
                            </p>
                            <div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="oldMdp"
                                        className="form-label"
                                    >
                                        Ancien mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="oldMdp"
                                        placeholder="Entrer l’ancien mot de passe"
                                        name="old"
                                        value={password.old}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label
                                        htmlFor="newMdp"
                                        className="form-label"
                                    >
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newMdp"
                                        placeholder="Entrer le nouveau mot de passe"
                                        name="new"
                                        value={password.new}
                                        onChange={onChange}
                                    />
                                    {password.newRepeat !== "" &&
                                        password.newRepeat.length >=
                                            password.new.length &&
                                        password.newRepeat !== password.new && (
                                            <p className="fw-bold text-danger mt-2">
                                                Les mots de passe que vous avez
                                                saisis ne correspondent pas
                                            </p>
                                        )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="comfMdp"
                                        className="form-label"
                                    >
                                        Confirmation du nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="comfMdp"
                                        placeholder="Confirmer le nouveau mot de passe"
                                        name="newRepeat"
                                        value={password.newRepeat}
                                        onChange={onChange}
                                    />
                                    {password.newRepeat !== "" &&
                                        password.newRepeat.length >=
                                            password.new.length &&
                                        password.newRepeat !== password.new && (
                                            <p className="fw-bold text-danger mt-2">
                                                Les mots de passe que vous avez
                                                saisis ne correspondent pas
                                            </p>
                                        )}
                                </div>

                                <div className="modal-footer d-flex justify-content-start border-0">
                                    <button
                                        type="reset"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Fermer
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        onClick={formik.handleSubmit}
                                        disabled={
                                            password.newRepeat !==
                                                password.new ||
                                            password.new === "" ||
                                            password.newRepeat === ""
                                                ? true
                                                : false
                                        }
                                    >
                                        Enrégistrer les modifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Compte;
