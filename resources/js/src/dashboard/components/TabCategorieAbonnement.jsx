import { useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import Input from "../../components/Input";
import { useFormik } from "formik";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import filter from "../../assets/imgs/filtre.png";

const initCategorie = {
    slug: "",
    name: "",
    description: "",
};
const TabCategorieAbonnement = ({ setBtnName = () => {}, setRestForm }) => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initCategorie);
    const viewRef = useRef();

    useEffect(() => {
        setBtnName("Ajouter une catégorie d'abonnement");
        setRestForm(formik);
        get();
    }, []);
    const btnEditProps = {
        "data-bs-target": "#categorieAbonnement",
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
            .get(endPoint.categorieAbonnements)
            .then((res) => {
                setDatas(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.categorieAbonnements, values),
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
            request.get(endPoint.categorieAbonnements + "/" + values.slug),
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
            request.post(endPoint.categorieAbonnements + "/" + values.slug, values),
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
            request.delete(endPoint.categorieAbonnements + "/" + values.slug),
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
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
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
            <div className="modal fade" id="categorieAbonnement">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                
                                {
                                    formik.values["slug"] !=="" ? "Modification de la catégorie d'abonnement" :"Ajout d’une catégorie d'abonnement"
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
                                    label={"Nom"}
                                    placeholder={
                                        "Entrez le nom de la catégorie"
                                    }
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
                                <div className="col-12 col-md-4 text-40">
                                    <img width="90%" src={filter} alt="" />
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
        </>
    );
};

export default TabCategorieAbonnement;
