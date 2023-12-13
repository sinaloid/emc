import { useFormik } from "formik";
import ActionButton from "../../components/ActionButton";
import Input from "../../components/Input";
import ContentHeader from "../ContentHeader";
import { useEffect, useRef, useState } from "react";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";
import { pagination } from "../../services/function";
import Search from "../../components/imgs/Search";
import FlecheSuiv from "../../components/imgs/FlecheSuiv";
import FlechePrec from "../../components/imgs/FlechePrec";

const initMedia = {
    slug: "",
    name: "",
    image: "",
    description: "",
    categorie: "",
};

const initTarif = {
    slug: "",
    price: "",
    period: "",
};
const ListeMedia = () => {
    const close = useRef();
    const closeMediaModal = useRef();
    const [datas, setDatas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [viewData, setViewData] = useState(initMedia);
    const [villes, setVilles] = useState([]);
    const [listVille, setListVille] = useState([]);
    const viewRef = useRef();
    const tarifRef = useRef();
    const nav = useNavigate();
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const periods = [
        { slug: "Jour", name: "Jour" },
        { slug: "Semaine", name: "Semaine" },
        { slug: "Mois", name: "Mois" },
        { slug: "Année", name: "Année" },
    ];

    useEffect(() => {
        get();
        getCategorie();
        getVilles();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#media",
    };

    const formik = useFormik({
        initialValues: initMedia,
        onSubmit: (values) => {
            values.villes = villes;
            console.log(values);
            if (values.slug !== "") {
                values._method = "put";
                update(values);
            } else {
                post(values);
            }
        },
    });

    const formikTarif = useFormik({
        initialValues: initTarif,
        onSubmit: (values) => {
            console.log(values);
            values.media = viewData.slug;
            if (values.slug !== "") {
                values._method = "put";
                updateTarif(values);
            } else {
                postTarif(values);
            }
        },
    });

    const get = () => {
        request
            .get(endPoint.medias)
            .then((res) => {
                let lst = res.data.data;
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

    const getCategorie = () => {
        request
            .get(endPoint.categorieMedias)
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.medias, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log("okok");
                        closeMediaModal.current.click();
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
            request.get(endPoint.medias + "/" + values.slug),
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
            request.post(endPoint.medias + "/" + values.slug, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        closeMediaModal.current.click();
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
            request.delete(endPoint.medias + "/" + viewData.slug),
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

    const getVilles = () => {
        request
            .get(endPoint.villes)
            .then((res) => {
                const tab = res.data.data.map((data) => {
                    return {
                        value: data.slug,
                        label: data.name,
                    };
                });
                setListVille(tab);

                //console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteMediaVille = async (e, slug) => {
        e.preventDefault();

        const response = await toast.promise(
            request.delete(endPoint.mediaVilles + "/" + slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data.data);

                        //viewRef.current.click();
                        close.current.click();
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
    const editData = (data) => {
        setViewData(data);
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("categorie", data.categorie_media?.slug);
        formik.setFieldValue("description", data.description);
    };

    const navigate = (e, name) => {
        e.preventDefault();
        nav("/tableau-de-bord/supports-publicitaires" + name);
    };

    const modalTarif = (e) => {
        e.preventDefault();
        close.current.click();
        tarifRef.current.click();
        formikTarif.resetForm();
    };

    const postTarif = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.mediaTarifs, values),
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
    const updateTarif = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.mediaTarifs + "/" + values.slug, values),
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

    const editTarif = (e, data) => {
        e.preventDefault();
        formikTarif.setFieldValue("slug", data.slug);
        formikTarif.setFieldValue("price", data.price);
        formikTarif.setFieldValue("period", data.period);
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
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#media"
                                className="btn btn-tertiary-full h-60"
                                onClick={(e) => {
                                    e.preventDefault();
                                    formik.resetForm();
                                }}
                            >
                                Ajouter un media
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
                                    <th>Image</th>
                                    <th>Libellé</th>
                                    <th>Catégorie</th>
                                    <th>Tarif</th>
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
                                                    src={
                                                        data.image
                                                            ? URL +
                                                              "" +
                                                              data.image
                                                            : ""
                                                    }
                                                    alt=""
                                                />
                                            </td>
                                            <td>{data.name}</td>
                                            <td>
                                                {data.categorie_media?.name}
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
            <div className="row">
                <div className="modal fade" id="media">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h4 className="modal-title text-meduim text-bold">
                                    {formik.values["slug"] !== ""
                                        ? "Modification du média"
                                        : "Ajout d’un média"}
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
                                        label={"Nom du média"}
                                        placeholder={"Entrez le nom du média"}
                                        formik={formik}
                                    />
                                    <Input
                                        type={"select"}
                                        name={"categorie"}
                                        placeholder={
                                            "Sélectionnez une catégorie"
                                        }
                                        label={"Catégorie du média"}
                                        formik={formik}
                                        options={categories}
                                    />
                                    <MultiSelect
                                        options={listVille}
                                        setData={setVilles}
                                    />
                                    <Input
                                        type={"file"}
                                        name={"image"}
                                        label={"Image du média"}
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
                                        type="button"
                                        className="btn btn-tertiary"
                                        data-bs-dismiss="modal"
                                        ref={closeMediaModal}
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
                                    Détails du média
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
                                        <h2>{viewData.name}</h2>
                                        <p>
                                            Catégorie:{" "}
                                            <span className="fw-bold">
                                                {viewData.categorie_media?.name}
                                            </span>{" "}
                                        </p>
                                        <p>{viewData.description}</p>
                                        <p>
                                            Média ajouté
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
                                        <p className="m-0">
                                            Liste des villes du média
                                        </p>
                                        <div className="ps-3 w-70">
                                            {viewData?.media_villes?.map(
                                                (item) => {
                                                    if (item.is_deleted) {
                                                        return;
                                                    }
                                                    return (
                                                        <div
                                                            className="d-flex"
                                                            key={item.slug}
                                                        >
                                                            <div>
                                                                <span className="text-primary">
                                                                    {
                                                                        item
                                                                            .ville
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="ms-auto text-primary cursor"
                                                                onClick={(e) =>
                                                                    deleteMediaVille(
                                                                        e,
                                                                        item.slug
                                                                    )
                                                                }
                                                            >
                                                                supprimer
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {/**<div className="d-flex mb-3">
                                            <span className="me-auto">
                                                Tarifs du média
                                            </span>
                                            <span
                                                className="bg-primary text-white px-2 rounded-2"
                                                onClick={modalTarif}
                                            >
                                                Ajouter un tarif
                                            </span>
                                        </div> 
                                            viewData.media_tarifs?.map((data,idx) =>{
                                                return <div className="d-flex text-14 mb-2" key={idx}>
                                                    <div className="me-auto text-danger fw-bold">{data.price +" FCFA"} / {data.period}</div>
                                                    <div>
                                                        <span className="me-2" data-bs-toggle="modal" data-bs-target="#tarif" onClick={e =>editTarif(e,data)}>Editer</span>
                                                        <span className="me-2 text-danger">supprimer</span>
                                                    </div>
                                                </div>
                                            })*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    ref={tarifRef}
                    data-bs-toggle="modal"
                    data-bs-target="#tarif"
                    hidden
                ></button>
                <div className="modal fade" id="tarif">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h4 className="modal-title text-meduim text-bold">
                                    {formik.values["slug"] !== ""
                                        ? "Modification du tarif"
                                        : "Ajout d’un tarif"}
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>
                            <div>
                                <p className="text-center">
                                    <img
                                        width="100px"
                                        src={
                                            viewData.image
                                                ? URL + "" + viewData.image
                                                : ""
                                        }
                                        alt=""
                                    />
                                </p>
                                <h5 className="text-center">{viewData.name}</h5>
                            </div>
                            <form onSubmit={formikTarif.handleSubmit}>
                                <div className="modal-body">
                                    <Input
                                        type={"text"}
                                        name={"price"}
                                        label={"Prix"}
                                        placeholder={"Entrez le prix"}
                                        formik={formikTarif}
                                    />

                                    <Input
                                        type={"select"}
                                        name={"period"}
                                        label={"Periode"}
                                        placeholder={"Sélectionnez la periode"}
                                        formik={formikTarif}
                                        options={periods}
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
            </div>
        </>
    );
};

export default ListeMedia;
