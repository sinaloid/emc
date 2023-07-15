import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";
import endPoint from "../../services/endPoint";
import request from "../../services/request";
import { toast } from "react-toastify";
import filter from "../../assets/imgs/filtre.png";


const initFiltre = {
    slug: "",
    name: "",
    price: "",
    avantage: "",
    description: "",
    categorie: "",
};

const TabAbonnement = ({ setBtnName = () => {}, setRestForm }) => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [viewData, setViewData] = useState(initFiltre);
    const viewRef = useRef();
    const btnEditProps = {
        "data-bs-target": "#abonnement",
    };
    useEffect(() => {
        setBtnName("Ajouter un abonnement");
        setRestForm(formik);
        get();
        getCategorieAbonnements();
    }, []);

    const formik = useFormik({
        initialValues: initFiltre,
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
            .get(endPoint.abonnements)
            .then((res) => {
                console.log(res.data);
                setDatas(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCategorieAbonnements = () => {
        request
            .get(endPoint.categorieAbonnements)
            .then((res) => {
                console.log(categories);
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.abonnements, values),
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
            request.get(endPoint.abonnements + "/" + values.slug),
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
            request.post(endPoint.abonnements + "/" + values.slug, values),
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
            request.delete(endPoint.abonnements + "/" + values.slug),
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
        formik.setFieldValue("price", data.price);
        formik.setFieldValue("avantage", data.avantage);
        formik.setFieldValue("description", data.description);
        formik.setFieldValue("categorie", data.categorie_abonnement?.slug);
    };
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Libélle</th>
                            <th>prix</th>
                            <th>Categorie de l'abonnement</th>
                            <th>Avantage</th>
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
                                    <td>{data.price+" FCFA"}</td>
                                    <td>{data.categorie_abonnement?.name}</td>
                                    <td>
                                    <p className="text-container">
                                            {data.avantage}
                                        </p>
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
            <div className="modal fade" id="abonnement">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                {
                                    formik.values["slug"] !=="" ? "Modification de l'abonnement" :"Ajout d’un abonnement"
                                }
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
                                    label={"Libélle"}
                                    placeholder={"Entrez le libélle de l'abonnement"}
                                    formik={formik}
                                />
                                <Input
                                    type={"text"}
                                    name={"price"}
                                    label={"Prix"}
                                    placeholder={"Entrez le prix de l'abonnement"}
                                    formik={formik}
                                />
                                <Input
                                    type={"textarea"}
                                    name={"avantage"}
                                    label={"Avantages de l'abonnement"}
                                    placeholder={"Entrez les avantages de l'abonnement"}
                                    formik={formik}
                                />
                                <Input
                                    type={"textarea"}
                                    name={"description"}
                                    label={"Description de l'abonnement"}
                                    placeholder={"Entrez la description de l'abonnement"}
                                    formik={formik}
                                />
                                <Input
                                    type={"select"}
                                    name={"categorie"}
                                    label={"Categorie de l'abonnement"}
                                    placeholder={
                                        "Sélectionnez une catégorie d'abonnement"
                                    }
                                    formik={formik}
                                    options={categories}
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
                                Détails de l'abonnement
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
                                    <img width="90%" src={filter} alt="" />
                                </div>
                                <div className="col-12 col-md-8">
                                    <h2>{viewData.categorie_abonnement?.name+": "+ viewData.name}</h2>
                                    <p>Prix: <span className="fw-bold">{viewData?.price +" FCFA"}</span></p>
                                    <p>Avantages: <span className="fw-bold">{viewData?.avantage}</span></p>
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

export default TabAbonnement;
