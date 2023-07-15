import { useEffect, useRef, useState } from "react";
import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";
import { useFormik } from "formik";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import { formatDate } from "../services/function";

const initCampagne = {};
const Campagne = () => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initCampagne);
    const viewRef = useRef();

    useEffect(() => {
        get();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#categorieMedia",
    };

    const formik = useFormik({
        initialValues: initCampagne,
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
            .get(endPoint.campagnes)
            .then((res) => {
                setDatas(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.campagnes, values),
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
            request.get(endPoint.campagnes + "/" + values.slug),
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

    const update = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.campagnes + "/" + values.slug, values),
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
            request.delete(endPoint.campagnes + "/" + values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        //close.current.click();
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
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("description", data.description);
    };

    return (
        <>
            <ContentHeader title={"Mes campagnes"} />

            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>Nom de la campagne</th>
                                <th>Date de début - Date de fin</th>
                                <th>Statut</th>
                                <th>Coût total</th>
                                <th>Description</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{data.name}</td>
                                        <td>
                                            {formatDate(data.startDate)} -{" "}
                                            {formatDate(data.endDate)}
                                        </td>
                                        <td>
                                            {idx % 2 === 0 ? (
                                                <span className="badge text-bg-success">
                                                    Terminer
                                                </span>
                                            ) : (
                                                <span className="badge text-bg-info">
                                                    En cours
                                                </span>
                                            )}
                                        </td>
                                        <td>{data.budget + " FCFA"}</td>
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
                                Détails de la campagne
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-4 text-40">
                                    <img width="90%" src={"filter"} alt="" />
                                </div>
                                <div className="col-12 col-md-8">
                                <div className="d-flex align-items-center">
                                        <h2 className="me-auto">
                                            {viewData.name}
                                        </h2>
                                        <span className={`px-2 fw-bold ${viewData.status == 1 ? "bg-primary-light":"bg-danger text-white"}`}>Campagne : {viewData.isActive == 1 ? "Terminer" : "En cours"}</span>
                                    </div>
                                    <p>Budget: <span className="fw-bold">{viewData?.budget +" FCFA"}</span></p>
                                    <p>Date de debut: <span className="fw-bold">{viewData?.startDate}</span></p>
                                    <p>Date de fin: <span className="fw-bold">{viewData?.endDate}</span></p>
                                    <p>Description: <span className="fw-bold">{viewData?.description}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Campagne;
