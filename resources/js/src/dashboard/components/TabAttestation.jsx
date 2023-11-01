import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import endPoint from "../../services/endPoint";
import request, { URL } from "../../services/request";
import filter from "../../assets/imgs/filtre.png";
import ActionButtonMessage from "../../components/ActionButtonMessage";

const initMessage = {
    user: "",
    message: "",
};
const TabAttestation = ({ setBtnName = () => {} }) => {
    const close = useRef();
    const viewRef = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initMessage);
    const btnEditProps = {
        "data-bs-target": "#messages",
    };

    useEffect(() => {
        setBtnName("Envoyer une attestation");
        get();
    }, []);
    const formik = useFormik({
        initialValues: initMessage,
        onSubmit: (values) => {
            console.log(values);
            values.type = "attestation"
            post(values);
        },
    });
    const get = () => {
        request
            .get(endPoint.messages)
            .then((res) => {
                console.log(res.data);
                setDatas(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
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

    const view = async (values) => {
        const response = await toast.promise(
            request.get(endPoint.messages + "/" + values.slug),
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

    const destroy = async (values) => {
        const response = await toast.promise(
            request.delete(endPoint.messages + "/" + viewData.slug),
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
                            <th>Nom prénom</th>
                            <th>Email</th>
                            <th>Date d'envoi</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            if(data.type !=="attestation"){
                                return
                            }
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{data.receiver.lastname+" "+data.receiver.firstname}</td>
                                    <td>
                                        <span>{data.receiver.email}</span>
                                    </td>
                                    <td>
                                    {data.created_at && new Date(data.created_at).toLocaleString()}
                                    </td>
                                    <td className="text-center">
                                        <ActionButtonMessage
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
            <div className="modal fade" id="attestation">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Envoi d’une attestation de service
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
                                    type={"text"}
                                    name={"subject"}
                                    label={"Sujet"}
                                    placeholder={"Entrez le sujet"}
                                    formik={formik}
                                />

                                <Input
                                    type={"text"}
                                    name={"receiver"}
                                    label={"adresse mail"}
                                    placeholder={
                                        "Entrez l'adresse mail du destinateur"
                                    }
                                    formik={formik}
                                />

                                <Input
                                    type={"file"}
                                    name={"file"}
                                    label={"Piece jointe"}
                                    placeholder={
                                        "Entrez l'adresse mail du destinateur"
                                    }
                                    formik={formik}
                                />

                                <Input
                                    type={"textarea"}
                                    name={"message"}
                                    label={"Message"}
                                    placeholder={"Entrez votre message"}
                                    formik={formik}
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
                                Détails du message
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
                                    <img width="90%" src={filter} alt="" />
                                </div>
                                <div className="col-12 col-md-8">
                                    <h2>{viewData.subject}</h2>
                                    <p>
                                        <span>
                                            Envoyeur :{" "}
                                            <span className="fw-bold">
                                                {viewData.sender?.email}
                                            </span>
                                        </span>{" "}
                                        <br />
                                        <span>
                                            Receveur :{" "}
                                            <span className="fw-bold">
                                                {viewData.receiver?.email}
                                            </span>
                                        </span>{" "}
                                        <br />
                                        
                                    </p>
                                    <p>{viewData.message}</p>
                                    <p>
                                    {viewData.message_docs?.map(
                                            (item, idx) => {
                                                return (
                                                    <div className="" key={item.slug}>
                                                        <span>
                                                            Piece jointe :{" "}
                                                            <span className="fw-bold">
                                                                <a
                                                                className="text-primary"
                                                                    href={
                                                                        URL +
                                                                        "" +
                                                                        item.url
                                                                    }
                                                                    target="blank"
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            </span>
                                                        </span>{" "}
                                                        <br />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </p>
                                    <p>{viewData.created_at && new Date(viewData.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabAttestation;
