import { useFormik } from "formik";
import ActionButton from "../../components/ActionButton";
import Input from "../../components/Input";
import ContentHeader from "../ContentHeader";
import { useEffect, useRef, useState } from "react";
import request, { URL } from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MultiSelect from "../../components/MultiSelect";

const initOffre = {
    slug: "",
    name: "",
    price: "",
    image: "",
    description: "",
    media: "",
};
const ListeOffres = () => {
    const closeOffre = useRef();
    const filtreModal = useRef();
    const [datas, setDatas] = useState([]);
    const [medias, setMedias] = useState([]);
    const [viewData, setViewData] = useState(initOffre);
    const viewRef = useRef();
    const nav = useNavigate();
    const [filtres, setFiltres] = useState({
        categorieID: "",
        categorieFiltres: [],
        options: [],
        selected: "",
    });
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    useEffect(() => {
        get();
        getCategorie();
        getFiltre();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#offre",
    };

    const formik = useFormik({
        initialValues: initOffre,
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
            .get(endPoint.offres)
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
            .get(endPoint.medias)
            .then((res) => {
                setMedias(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.offres, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        closeOffre.current.click();
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
            request.get(endPoint.offres + "/" + values.slug),
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
            request.post(endPoint.offres + "/" + values.slug, values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        //console.log(data);
                        get();
                        closeOffre.current.click();
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
            request.delete(endPoint.offres + "/" + values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data);
                        closeOffre.current.click();
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

    const getFiltre = () => {
        request
            .get(endPoint.categorieFiltres)
            .then((res) => {
                setFiltres({
                    ...filtres,
                    categorieFiltres: res.data.data,
                });
                //console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const postFiltre = async (e) => {
        e.preventDefault();
        const filtreData = {
            mediaProduit: viewData.slug,
            filtre: filtres.selected,
        };
        const response = await toast.promise(
            request.post(endPoint.mediaProduitOptions, filtreData),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data.data);

                        //viewRef.current.click();
                        closeOffre.current.click();
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

    const deleteFiltre = async (e,slug) => {
        e.preventDefault();
        
        const response = await toast.promise(
            request.delete(endPoint.mediaProduitOptions+"/"+slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data.data);

                        //viewRef.current.click();
                        closeOffre.current.click();
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
        console.log(data);
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("price", data.price);
        formik.setFieldValue("media", data.media?.slug);
        formik.setFieldValue("description", data.description);
    };

    const navigate = (e, name) => {
        e.preventDefault();
        nav("/tableau-de-bord/supports-publicitaires" + name);
    };

    return (
        <>
            <ContentHeader
                title={"Mes offres "}
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
                        data-bs-target="#offre"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.resetForm();
                        }}
                    >
                        Ajouter une offre
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
                                <th>Média</th>
                                <th>Tarif</th>
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
                                        <td>{data.media?.name}</td>
                                        <td>{data.price + " FCFA"}</td>
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
                <div className="modal fade" id="offre">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h4 className="modal-title text-meduim text-bold">
                                    {formik.values["slug"] !== ""
                                        ? "Modification de l'offre"
                                        : "Ajout d’une offre"}
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
                                        label={"Libellé"}
                                        placeholder={
                                            "Entrez le libellé de l'offre"
                                        }
                                        formik={formik}
                                    />
                                    <Input
                                        type={"text"}
                                        name={"price"}
                                        label={"Prix de l'offre"}
                                        placeholder={
                                            "Entrez le prix de l'offre"
                                        }
                                        formik={formik}
                                    />
                                    <Input
                                        type={"select"}
                                        name={"media"}
                                        placeholder={"Sélectionnez un média"}
                                        label={"Média li l'offre"}
                                        formik={formik}
                                        options={medias}
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
                                        type="reset"
                                        className="btn btn-tertiary"
                                        data-bs-dismiss="modal"
                                        ref={closeOffre}
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
                                    Détails de l'offre
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
                                                {viewData.name}
                                            </h2>
                                            <span className="px-2 fw-bold bg-danger text-white">
                                                Prix :{" "}
                                                {viewData.price + " FCFA"}
                                            </span>
                                        </div>
                                        <p>
                                            Média:{" "}
                                            <span className="fw-bold">
                                                {viewData.media?.name}
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
                                        <p className="mb-0 fw-bold">
                                            Filtres du produit:{" "}
                                        </p>
                                        <div className="ps-3 w-70">
                                            {viewData?.media_produit_options?.map(
                                                (item) => {
                                                    if(item.is_deleted){
                                                        return
                                                    }
                                                    return (
                                                        <div
                                                            className="d-flex"
                                                            key={item.slug}
                                                        >
                                                            <div>
                                                                <span>
                                                                    {item.filtre
                                                                        ?.categorie_filtre
                                                                        ?.name +
                                                                        " : "}
                                                                </span>
                                                                <span className="text-primary">
                                                                    {
                                                                        item
                                                                            .filtre
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="ms-auto text-primary cursor" onClick={e => deleteFiltre(e, item.slug)}>
                                                                supprimer
                                                            </div>
                                                        </div>
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
                                                    closeOffre.current.click();
                                                    //formikFile.setFieldValue("slug",viewData.slug)
                                                    filtreModal.current.click();
                                                }}
                                            >
                                                Ajouter un filtre
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    ref={filtreModal}
                    type="hidden"
                    data-bs-toggle="modal"
                    data-bs-target="#filtre"
                />
                <div className="modal fade" id="filtre">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h4 className="modal-title text-meduim text-bold">
                                    Ajouter un filtre
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            id={"categorieFiltre"}
                                            onChange={(e) => {
                                                const tab =
                                                    filtres.categorieFiltres[
                                                        e.target.value
                                                    ].filtres.map((data) => {
                                                        return {
                                                            value: data.slug,
                                                            label: data.name,
                                                        };
                                                    });
                                                setFiltres({
                                                    ...filtres,
                                                    categorieID: e.target.value,
                                                    options: tab,
                                                });
                                                console.log(tab);
                                            }}
                                            value={filtres.categorieID}
                                        >
                                            <option value={""}>
                                                {
                                                    "Sélectionnez une catégorie filtre"
                                                }
                                            </option>
                                            {filtres.categorieFiltres.map(
                                                (data, idx) => {
                                                    return (
                                                        <option
                                                            value={idx}
                                                            key={data + idx}
                                                        >
                                                            {data.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            onChange={(e) => {
                                                setFiltres({
                                                    ...filtres,
                                                    selected: e.target.value,
                                                });
                                                // console.log(tab);
                                            }}
                                            value={filtres.selected}
                                        >
                                            <option value={""}>
                                                {"Sélectionnez un filtre"}
                                            </option>
                                            {filtres.options.map(
                                                (data, idx) => {
                                                    return (
                                                        <option
                                                            value={data.value}
                                                            key={
                                                                data.value + idx
                                                            }
                                                        >
                                                            {data.label}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-footer d-flex justify-content-start border-0">
                                    <button
                                        type="reset"
                                        className="btn btn-tertiary"
                                        data-bs-dismiss="modal"
                                        ref={closeOffre}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-tertiary-full"
                                        onClick={(e) => postFiltre(e)}
                                    >
                                        Ajouter
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

export default ListeOffres;
