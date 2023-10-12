import { useFormik } from "formik";
import ActionButton from "../../components/ActionButton";
import Input from "../../components/Input";
import ContentHeader from "../ContentHeader";
import { useEffect, useRef, useState } from "react";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    const viewRef = useRef();
    const tarifRef = useRef();
    const nav = useNavigate();
    const periods = [
        { slug: "Jour", name: "Jour" },
        { slug: "Semaine", name: "Semaine" },
        { slug: "Mois", name: "Mois" },
        { slug: "Année", name: "Année" },
    ];

    useEffect(() => {
        get();
        getCategorie();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#media",
    };

    const formik = useFormik({
        initialValues: initMedia,
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
                setDatas(res.data.data);
                console.log(res.data.data);
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
            request.delete(endPoint.medias + "/" + values.slug),
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
        formikTarif.resetForm()
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

    const editTarif = (e,data) => {
        e.preventDefault()
        formikTarif.setFieldValue("slug", data.slug);
        formikTarif.setFieldValue("price", data.price);
        formikTarif.setFieldValue("period", data.period);
    };

    return (
        <>
            <ContentHeader
                title={"Mes médias "}
                firstBtn={
                    <span onClick={(e) => navigate(e, "")}>
                        Liste des offres
                    </span>
                }
                secondBtn={
                    <span onClick={(e) => navigate(e, "/liste-medias")}>
                        Liste des medias
                    </span>
                }
                addBtn={
                    <span
                        data-bs-toggle="modal"
                        data-bs-target="#media"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.resetForm();
                        }}
                    >
                        Ajouter un media
                    </span>
                }
            />

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
                                                        ? URL + "" + data.image
                                                        : ""
                                                }
                                                alt=""
                                            />
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.categorie_media?.name}</td>
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
                                        </p>
                                        <div className="d-flex mb-3">
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
                                        {
                                            viewData.media_tarifs?.map((data,idx) =>{
                                                return <div className="d-flex text-14 mb-2" key={idx}>
                                                    <div className="me-auto text-danger fw-bold">{data.price +" FCFA"} / {data.period}</div>
                                                    <div>
                                                        <span className="me-2" data-bs-toggle="modal" data-bs-target="#tarif" onClick={e =>editTarif(e,data)}>Editer</span>
                                                        <span className="me-2 text-danger">supprimer</span>
                                                    </div>
                                                </div>
                                            })
                                        }
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
