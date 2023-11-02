import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Search from "../../components/imgs/Search";
import { pagination } from "../../services/function";
import FlechePrec from "../../components/imgs/FlechePrec";
import FlecheSuiv from "../../components/imgs/FlecheSuiv";

const initDevis = {};
const Publicite = ({statusDevis}) => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewData, setViewData] = useState(initDevis);
    const viewRef = useRef();
    const fileModal = useRef();
    const listStatut = ["En attente", "En cours", "Terminer"];
    useEffect(() => {
        get();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#statut",
    };

    const formik = useFormik({
        initialValues: initDevis,
        onSubmit: (values) => {
            values._method = "put";
            console.log(values);
            status(values);
        },
    });

    const get = () => {
        request
            .get(endPoint.publicites)
            .then((res) => {
                let lst = res.data.data
                if(statusDevis){
                    lst = lst.filter((item) => item.status === statusDevis)
                    console.log(lst)
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
            request.post(endPoint.publicites, values),
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
            request.get(endPoint.publicites + "/" + values.slug),
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
            request.post(endPoint.publicites + "/" + values.slug, values),
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
            request.delete(endPoint.publicites + "/" + values.slug),
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

    const status = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.publicites + "/" + values.slug, values),
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

    const download = (e, ref) => {
        e.preventDefault();
        window.open(URL + "pdf/" + ref, "_blank");
    };

    const editData = (data) => {
        console.log(data);
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("description", data.description);
    };

    const formikFile = useFormik({
        initialValues: { files: "" },
        onSubmit: (values) => {
            //values._method = "put";
            console.log(values);
            postFile(values);
        },
    });

    const postFile = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.publicites + "/docs", values),
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
                        <table className="table table-striped">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Nom de la campagne</th>
                                    <th>Type de publicité</th>
                                    <th>publicité</th>
                                    <th>Date de création</th>
                                    <th>État</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((data, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{data.campagne.name}</td>
                                            <td>
                                                {data.media_produit.media.name}
                                            </td>
                                            <td>{data.media_produit.name}</td>

                                            <td>
                                                {new Date(
                                                    data.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td>
                                                {data.status &&
                                                    listStatut[data.status]}
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
                                Détails de la publicité
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
                                            {viewData.media_produit?.name}
                                        </h2>
                                        <span
                                            className={`px-2 fw-bold ${
                                                viewData.status == 2
                                                    ? "bg-primary-light"
                                                    : "bg-danger text-white"
                                            }`}
                                        >
                                            Publicité :{" "}
                                            {viewData.status &&
                                                listStatut[viewData.status]}
                                        </span>
                                    </div>
                                    <p>
                                        Campagne:{" "}
                                        <span className="fw-bold">
                                            {viewData?.campagne?.name}
                                        </span>
                                    </p>
                                    <p>
                                        Type de publicité:{" "}
                                        <span className="fw-bold">
                                            {
                                                viewData?.media_produit?.media
                                                    ?.name
                                            }
                                        </span>
                                    </p>
                                    <p>
                                        Date de création:{" "}
                                        <span className="fw-bold">
                                            {viewData?.created_at &&
                                                new Date(
                                                    viewData?.created_at
                                                ).toLocaleString()}
                                        </span>
                                    </p>
                                    <p className="mb-0 fw-bold">
                                        Dates de diffusion:{" "}
                                    </p>
                                    <div className="ps-3">
                                        {viewData?.media_produit?.periodes?.map(
                                            (item) => {
                                                return (
                                                    <span key={item.slug}>
                                                        Diffusion le :{" "}
                                                        <span
                                                            className="text-primary p-1 rounded-1 me-2"
                                                            target="blank"
                                                        >
                                                            {new Date(
                                                                item.date
                                                            ).toLocaleDateString()}
                                                        </span>{" "}
                                                        <br />
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                    <p className="mb-0 fw-bold">
                                        Fichiers de la publicité:{" "}
                                    </p>
                                    <div className="ps-3">
                                        {viewData?.publicite_docs?.map(
                                            (item) => {
                                                return (
                                                    <span key={item.slug}>
                                                        {new Date(
                                                            item.created_at
                                                        ).toLocaleString()}{" "}
                                                        :{" "}
                                                        <a
                                                            href={
                                                                URL +
                                                                "" +
                                                                item.url
                                                            }
                                                            className="text-primary p-1 rounded-1 me-2"
                                                            target="blank"
                                                        >
                                                            Télécharger le
                                                            fichier
                                                        </a>{" "}
                                                        <br />
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <span
                                            className="bg-primary text-white p-1 rounded-1"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                close.current.click();
                                                formikFile.setFieldValue(
                                                    "slug",
                                                    viewData.slug
                                                );
                                                fileModal.current.click();
                                            }}
                                        >
                                            Ajouter des fichiers pour la
                                            publicité
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="statut">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Statut de la publicité
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
                                        "Sélectionnez le statut de la publicité"
                                    }
                                    formik={formik}
                                    options={[
                                        { slug: 0, name: "En attente" },
                                        { slug: 1, name: "En cours" },
                                        { slug: 2, name: "Terminer" },
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
            <input
                ref={fileModal}
                type="hidden"
                data-bs-toggle="modal"
                data-bs-target="#file"
            />
            <div className="modal fade" id="file">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Fichiers de la publicité
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form onSubmit={formikFile.handleSubmit}>
                            <div className="modal-body">
                                <Input
                                    type={"files"}
                                    name={"files"}
                                    label={"Fichiers"}
                                    placeholder={
                                        "Sélectionnez le statut de la publicité"
                                    }
                                    formik={formikFile}
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
        </>
    );
};

export default Publicite;
