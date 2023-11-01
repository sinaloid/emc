import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { useFormik } from "formik";
import ActionButtonUser from "../../components/ActionButtonUser";
import { toast } from "react-toastify";

const initUser = {
    name: "",
    image: "",
    description: "",
    slug: "",
};

const TabUtilisateur = ({ setBtnName = () => {}, setRestForm }) => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initUser);
    const viewRef = useRef();

    const btnEditProps = {
        "data-bs-target": "#categorieMedia",
    };
    useEffect(() => {
        setBtnName("");
        setRestForm(formik);
        get();
    }, []);

    const formik = useFormik({
        initialValues: initUser,
        onSubmit: (values) => {
            console.log(values);
            if (values.slug !== "") {
                values._method = "put";
                update(values);
            } else {
                post(values);
            }
        },
    });

    const get = () => {
        request
            .get(endPoint.users)
            .then((res) => {
                console.log(res.data);
                setDatas(res.data.users);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.categorieMedias, values),
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
    const view = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.users + "/get",{id:values.id}),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data);
                        setViewData(data.data.users);
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

    const update = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.categorieMedias + "/" + values.slug, values),
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

    const disable = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.users + "/disable",{id:viewData.id}),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
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
        setViewData(data)
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("description", data.description);
    };
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Nom prénom</th>
                            <th>Contact</th>
                            <th>Statut</th>
                            <th>Etat du compte</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img
                                            width="30px"
                                            src={URL + "" + data.image}
                                        />
                                    </td>
                                    <td>
                                        {data.lastname + " " + data.firstname}
                                    </td>
                                    <td>
                                        <span>{data.number}</span>
                                    </td>
                                    <td>{data.status}</td>
                                    <td>
                                    <span className={`px-2 fw-bold ${data.isActive == 1 ? "bg-primary-light":"bg-danger text-white"}`}>{data.isActive == 1 ? "actif" : "inactif"}</span>

                                    </td>
                                    <td className="text-center">
                                        <ActionButtonUser
                                            btnEditProps={btnEditProps}
                                            data={data}
                                            editData={editData}
                                            destroy={disable}
                                            view={view}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
                                Détails de l'utilisateur
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <img
                                        width="100%"
                                        src={
                                            viewData.image
                                                ? URL + "" + viewData.image
                                                : ""
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="col-12 col-md-8">
                                    <div className="d-flex align-items-center">
                                        <h2 className="me-auto">
                                            {viewData.lastname +
                                                " " +
                                                viewData.firstname}
                                        </h2>
                                        <span className={`px-2 fw-bold ${viewData.isActive == 1 ? "bg-primary-light":"bg-danger text-white"}`}>Compte : {viewData.isActive == 1 ? "Actif" : "Inactif"}</span>
                                    </div>
                                    <p>
                                        Tel:
                                        <span className="fw-bold">
                                            {" " + viewData.number}
                                        </span>
                                    </p>
                                    <p>
                                        Email:
                                        <span className="fw-bold">
                                            {" " + viewData.email}
                                        </span>
                                    </p>
                                    <p>
                                        Statut:
                                        <span className="fw-bold">
                                            {" " + viewData.status}
                                        </span>
                                    </p>
                                    <p>
                                        Compte créé
                                        <span className="fw-bold">
                                            {" le " +
                                                new Date(
                                                    viewData.created_at
                                                ).toLocaleDateString() +
                                                " à " +
                                                new Date(
                                                    viewData.created_at
                                                ).toLocaleTimeString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabUtilisateur;
