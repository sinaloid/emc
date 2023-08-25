import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { toast } from "react-toastify";
import endPoint from "../../services/endPoint";
import { useFormik } from "formik";
import request from "../../services/request";
import Input from "../../components/Input";

const initData = {
    slug: "",
    lastname: "",
    firstname: "",
    phone: "",
    budget: "",
    status: "",
    date: "",
    description: "",
};
const TabAccompagnement = ({ setBtnName = () => {} }) => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState({});
    const viewRef = useRef();
    const message = useRef();

    useEffect(() => {
        setBtnName("");
        //setRestForm(formik);
        get();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#statut",
    };


    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            values._method = "put";
            console.log(values);

            status(values);
        },
    });

    const get = () => {
        request
            .get(endPoint.accompagnements)
            .then((res) => {
                setDatas(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const view = async (values) => {
        const response = await toast.promise(
            request.get(endPoint.accompagnements + "/" + values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data.data);
                        setViewData(data.data.data);
                        viewRef.current.click();
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        return data.response.data.message;
                    },
                },
            }
        );
    };

    const status = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.accompagnements + "/" + values.slug, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        close.current.click();
                        get();
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

    const destroy = async (values) => {
        const response = await toast.promise(
            request.delete(endPoint.accompagnements + "/" + values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        close.current.click();
                        get();
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

    const editData = (data) => {
        console.log(data);
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("lastname", data.lastname);
        formik.setFieldValue("firstname", data.firstname);
        formik.setFieldValue("phone", data.phone);
        formik.setFieldValue("budget", data.budget);
        formik.setFieldValue("date", data.startDate);
        formik.setFieldValue("description", data.description);
    };

    const formikMessage = useFormik({
        initialValues: {
            user: "",
            message: "",
            receiver: "",
            subject: "",
        },
        onSubmit: (values) => {
            console.log(values);

            post(values);
        },
    });

    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.messages, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        close.current.click();
                        get();
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
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Nom prénom</th>
                            <th>Contact</th>
                            <th>Email</th>
                            {/**<th>Date de diffusion</th> */}
                            <th>Demande</th>
                            <th>Description</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {data.lastname + " " + data.firstname}
                                    </td>
                                    <td>{data.phone}</td>
                                    <td>{data.email}</td>
                                    {
                                        /**<td>{data.startDate}</td> */
                                    }
                                    <td>
                                        <span
                                            className={`px-2 fw-bold ${
                                                data.status == 1
                                                    ? "bg-primary-light"
                                                    : "bg-danger text-white"
                                            }`}
                                        >
                                            {data.status == 1
                                                ? "Traitée"
                                                : "En attente"}
                                        </span>
                                    </td>
                                    <td>
                                        <p className="text-container">
                                            {data.description}
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        <ActionButton
                                            btnEditProps={btnEditProps}
                                            data={data}
                                            editData={editData}
                                            destroy={destroy}
                                            view={view}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="statut">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Statut de la demande sur mésure
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-body">
                                <Input
                                    type={"select"}
                                    name={"status"}
                                    label={"statut"}
                                    placeholder={
                                        "Sélectionnez le statut de la demande"
                                    }
                                    formik={formik}
                                    options={[
                                        { slug: 1, name: "Traitée" },
                                        { slug: 0, name: "En attente" },
                                    ]}
                                />
                            </div>

                            <div className="modal-footer d-flex justify-content-start border-0">
                                <button
                                    type="reset"
                                    className="btn btn-tertiary"
                                    data-bs-dismiss="modal"
                                    ref={close}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-tertiary-full"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button
                ref={viewRef}
                data-bs-toggle="modal"
                data-bs-target="#view"
                hidden
            ></button>
            <div className="modal fade" id="view">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Détails de la demande
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-11 mx-auto">
                                    <div className="d-flex align-items-center">
                                        <h2 className="me-auto">
                                            {viewData.lastname +
                                                " " +
                                                viewData.firstname}
                                        </h2>
                                        <span
                                            className={`px-2 fw-bold ${
                                                viewData.status == 1
                                                    ? "bg-primary-light"
                                                    : "bg-danger text-white"
                                            }`}
                                        >
                                            Demande :{" "}
                                            {viewData.status == 1
                                                ? "Traitée"
                                                : "En attente"}
                                        </span>
                                    </div>
                                    <p>
                                        Email:{" "}
                                        <span className="fw-bold">
                                            {viewData.email}
                                        </span>
                                    </p>
                                    <p>
                                        Téléphone:{" "}
                                        <span className="fw-bold">
                                            {viewData.phone}
                                        </span>
                                    </p>
                                    {
                                        /**
                                         * <p>
                                        Date de la diffusion:{" "}
                                        <span className="fw-bold">
                                            {viewData.startDate}
                                        </span>
                                    </p>
                                         */
                                    }
                                    <p>
                                        Description:{" "}
                                        <span className="fw-bold">
                                            {viewData.description}
                                        </span>
                                    </p>
                                    <div>
                                        <span
                                            className="bg-primary text-white p-1 rounded-1"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                close.current.click();
                                                formikMessage.setFieldValue("receiver",viewData.email)
                                                message.current.click();
                                            }}
                                        >
                                            Repondre par email
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                ref={message}
                type="hidden"
                data-bs-toggle="modal"
                data-bs-target="#message"
            />
            <div className="modal fade" id="message">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Envoi d’un message
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form onSubmit={formikMessage.handleSubmit}>
                            <div className="modal-body">
                                <Input
                                    type={"text"}
                                    name={"subject"}
                                    label={"Sujet"}
                                    placeholder={"Entrez le sujet"}
                                    formik={formikMessage}
                                />

                                <Input
                                    type={"text"}
                                    name={"receiver"}
                                    label={"adresse mail"}
                                    placeholder={
                                        "Entrez l'adresse mail du destinateur"
                                    }
                                    formik={formikMessage}
                                />

                                <Input
                                    type={"file"}
                                    name={"file"}
                                    label={"Piece jointe"}
                                    placeholder={
                                        "Entrez l'adresse mail du destinateur"
                                    }
                                    formik={formikMessage}
                                />

                                <Input
                                    type={"textarea"}
                                    name={"message"}
                                    label={"Message"}
                                    placeholder={"Entrez votre message"}
                                    formik={formikMessage}
                                />
                            </div>

                            <div className="modal-footer d-flex justify-content-start border-0">
                                <button
                                    type="reset"
                                    className="btn btn-tertiary"
                                    data-bs-dismiss="modal"
                                    ref={close}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-tertiary-full"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabAccompagnement;
