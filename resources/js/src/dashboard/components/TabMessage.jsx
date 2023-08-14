import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import endPoint from "../../services/endPoint";
import request from "../../services/request";

const initMessage = {
    user: "",
    message: "",
};
const TabMessage = ({ setBtnName = () => {} }) => {
    const close = useRef();
    const viewRef = useRef();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        setBtnName("Envoyer un message");
        get();
    }, []);
    const formik = useFormik({
        initialValues: initMessage,
        onSubmit: (values) => {
            console.log(values);
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

    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Auteur du Message</th>
                            <th>Type de compte</th>
                            <th>Message</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{data.receiver.email}</td>
                                    <td>{data.receiver.status}</td>
                                    <td>{data.subject}</td>
                                    <td className="text-center">
                                        <ActionButton />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
                                    name={"fichier"}
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
        </>
    );
};

export default TabMessage;
