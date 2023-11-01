import { useFormik } from "formik";
import Input from "../../components/Input";
import { useEffect, useRef, useState } from "react";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import { pagination } from "../../services/function";
import Search from "../../components/imgs/Search";
import FlecheSuiv from "../../components/imgs/FlecheSuiv";
import FlechePrec from "../../components/imgs/FlechePrec";

const initCategorie = {};
const Document = () => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewData, setViewData] = useState(initCategorie);
    const viewRef = useRef();

    useEffect(() => {
        get();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#categorieMedia",
    };

    const formik = useFormik({
        initialValues: initCategorie,
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
            .get(endPoint.campagnes + "/docs")
            .then((res) => {
                console.log(res.data)
                const lst = pagination(res.data.data.campagnes, 10);
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
            request.get(endPoint.categorieMedias + "/" + values.slug),
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
        const response = await toast.promise(
            request.delete(endPoint.categorieMedias + "/" + values.slug),
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
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("description", data.description);
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
                                    <th>Libellé</th>
                                    <th>Type</th>
                                    <th>Date d'ajout</th>
                                    <th>Liens</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*datas.campagnes?.map((data, idx) => {
                                return data.publicites.map((pub) => {
                                    return pub.publicite_docs.map((pubDoc) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{pubDoc.name}</td>
                                                <td>Publicité</td>
                                                <td>{pubDoc.created_at && new Date(pubDoc.created_at).toLocaleString()}</td>
                                                <td>
                                                <a href={URL+""+pubDoc.url} className="badge text-bg-success">
                                                            Télécharger
                                                        </a>
                                                </td>
                                                {
                                                    <td className="text-center">
                                                    <ActionButton />
                                                </td> 
                                                }
                                            </tr>
                                        );
                                    })
                                })
                            })*/}
                                {list?.map((data, idx) => {
                                    return data.devis.map((dev) => {
                                        return dev.devis_docs.map((devDoc) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{devDoc.name}</td>
                                                    <td>Devis</td>
                                                    <td>
                                                        {devDoc.created_at &&
                                                            new Date(
                                                                devDoc.created_at
                                                            ).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={
                                                                URL +
                                                                "" +
                                                                devDoc.url
                                                            }
                                                            className="badge text-bg-success"
                                                        >
                                                            Télécharger
                                                        </a>
                                                    </td>
                                                    {/**<td className="text-center">
                                                    <ActionButton />
                                                </td> */}
                                                </tr>
                                            );
                                        });
                                    });
                                })}
                                {/*datas.messages?.map((data, idx) => {
                                    return data.message_docs.map((msg) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{msg.name}</td>
                                                <td>Message</td>
                                                <td>
                                                    {msg.created_at &&
                                                        new Date(
                                                            msg.created_at
                                                        ).toLocaleString()}
                                                </td>
                                                <td>
                                                    <a
                                                        href={
                                                            URL + "" + msg.url
                                                        }
                                                        className="badge text-bg-success"
                                                    >
                                                        Télécharger
                                                    </a>
                                                </td>
                                                {/**<td className="text-center">
                                        <ActionButton />
                                    </td> *}
                                            </tr>
                                        );
                                    });
                                })*/}
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
                    <div className="modal fade" id="categorieMedia">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <h4 className="modal-title text-meduim text-bold">
                                        {formik.values["slug"] !== ""
                                            ? "Modification de la catégorie de média"
                                            : "Ajout d’une catégorie de média"}
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
                                            name={"name"}
                                            label={"Nom"}
                                            placeholder={
                                                "Entrez le nom de la catégorie"
                                            }
                                            formik={formik}
                                        />
                                        <Input
                                            type={"file"}
                                            name={"image"}
                                            label={"Image de la catégorie"}
                                            placeholder={""}
                                            formik={formik}
                                        />
                                        <Input
                                            type={"textarea"}
                                            name={"description"}
                                            label={"Description"}
                                            placeholder={
                                                "Entrez la description de la catégorie"
                                            }
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
                                        Détails de la catégorie
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
                                                        ? URL +
                                                          "" +
                                                          viewData.image
                                                        : ""
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-12 col-md-8">
                                            <h2>{viewData.name}</h2>
                                            <p>{viewData.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Document;
