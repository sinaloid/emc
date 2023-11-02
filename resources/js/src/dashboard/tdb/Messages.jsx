import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import filter from "../../assets/imgs/filtre.png";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import Input from "../../components/Input";
import ActionButtonMessage from "../../components/ActionButtonMessage";
import Search from "../../components/imgs/Search";
import { pagination } from "../../services/function";
import FlecheSuiv from "../../components/imgs/FlecheSuiv";
import FlechePrec from "../../components/imgs/FlechePrec";

const initMessage = {
    user: "",
    message: "",
};
const Messages = ({statusMessage}) => {
    const close = useRef();
    const viewRef = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initMessage);
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const btnEditProps = {
        "data-bs-target": "#messages",
    };

    useEffect(() => {
        //setBtnName("Envoyer un message");
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
                let lst = res.data.data;
                console.log(lst)
                if (statusMessage) {
                    if(statusMessage === "attestation"){
                        lst = lst.filter((item) => item.accompagnement_id === null && item.type !== null);
                        console.log(lst)

                    }else{
                        /**Message accompagnement */
                        lst = lst.filter((item) => item.accompagnement_id !== null && item.type !== null);
                    }
                    
                }else {
                    lst = lst.filter((item) => item.type !== "attestation");
                    console.log(lst);
                }
                lst = pagination(lst, 10);
                setPages(lst);
                if (lst.list.length !== 0) {
                    setDatas(lst.list[0]);
                    setList(lst.list[0]);
                } else {
                    setDatas([]);
                    setList([]);
                }
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

    const destroy = async (values) => {
        console.log(values);

        const response = await toast.promise(
            request.delete(endPoint.messages + "k/" + values.slug),
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
    const changePages = (e, idx) => {
        e.preventDefault();
        console.log(idx);
        if (idx >= 0 && idx <= pages.counter - 1) {
            setDatas(pages.list[idx]);
            setList(pages.list[idx]);
            setCurrentIndex(idx);
        }
    };
    const changePagesByIndex = (e, idx) => {
        e.preventDefault();
        setCurrentIndex(idx);
        setDatas(pages.list[idx]);
        setList(pages.list[idx]);
    };

    return (
        <>
            <div className="card p-2 mt-3">
                <div className="row my-3">
                    <div className="d-flex">
                        <div className="me-auto">
                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text h-60"
                                    id="basic-addon1"
                                >
                                    <Search />
                                </span>
                                <input
                                    type="text"
                                    className="form-control h-60"
                                    placeholder="Rechercher un devis"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-tertiary h-60 me-2">
                                <i className="bi bi-plus-circle-fill"></i>{" "}
                                Ajouter un filtre
                            </button>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#formModal"
                                className="btn h-60"
                            >
                                <i class="bi bi-x-lg"></i> {"Tout supprimer"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
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
                                    {list.map((data, idx) => {
                                        
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    {data.receiver?.email
                                                        ? data.receiver?.email
                                                        : data.accompagnement
                                                              ?.email}
                                                </td>
                                                <td>
                                                    {data.receiver?.status
                                                        ? data.receiver?.status
                                                        : "visiteur"}
                                                </td>
                                                <td>{data.subject}</td>
                                                <td className="text-center">
                                                    <ActionButtonMessage
                                                        btnEditProps={
                                                            btnEditProps
                                                        }
                                                        data={data}
                                                        //editData={editData}
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
                    {list.length !== 0 && (
                        <div className="col-12 col-md-10 col-lg-9 mx-auto text-center text-primary mb-3 pb-3">
                            <button
                                className="btn btn-pub mx-2"
                                onClick={(e) =>
                                    changePages(e, currentIndex - 1)
                                }
                            >
                                <span>
                                    <FlechePrec />
                                </span>
                                <span className="ms-1">Page précédente</span>
                            </button>
                            {pages?.list?.map((data, idx) => {
                                return (
                                    <button
                                        className={`btn ${
                                            currentIndex === idx
                                                ? "btn-pub-primary"
                                                : "btn-pub"
                                        }  mx-2 px-3`}
                                        key={"btn" + idx}
                                        onClick={(e) =>
                                            changePagesByIndex(e, idx)
                                        }
                                    >
                                        <span>{idx + 1}</span>
                                    </button>
                                );
                            })}
                            <button
                                className="btn btn-pub mx-2"
                                onClick={(e) =>
                                    changePages(e, currentIndex + 1)
                                }
                            >
                                <span className=" me-1">Page suivante</span>
                                <span>
                                    <FlecheSuiv />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
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
                                                {viewData.receiver?.email
                                                    ? viewData.receiver?.email
                                                    : viewData.accompagnement
                                                          ?.email}
                                            </span>
                                        </span>{" "}
                                        <br />
                                    </p>
                                    <p>{viewData.message}</p>
                                    <p>
                                        {viewData.message_docs?.map(
                                            (item, idx) => {
                                                return (
                                                    <div
                                                        className=""
                                                        key={item.slug}
                                                    >
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
                                    <p>
                                        {viewData.created_at &&
                                            new Date(
                                                viewData.created_at
                                            ).toLocaleString()}
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

export default Messages;
