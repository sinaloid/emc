import { useFormik } from "formik";
import ActionButton from "../../components/ActionButton";
import Input from "../../components/Input";
import ContentHeader from "../ContentHeader";
import Search from "../../components/imgs/Search";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import { useEffect, useRef, useState } from "react";
import { pagination } from "../../services/function";
import FlechePrec from "../../components/imgs/FlechePrec";
import FlecheSuiv from "../../components/imgs/FlecheSuiv";
import { toast } from "react-toastify";

const Paiement = () => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState({});
    const viewRef = useRef();
    const fileModal = useRef();
    const listStatut = ["En attente", "Refuser", "Accepter"];
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        get();
    }, []);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            values._method = "put";
            console.log(values);
            status(values);
        },
    });

    const get = () => {
        request
            .get(endPoint.paiements)
            .then((res) => {
                let lst = res.data.data;
                /*if (statusDevis) {
                    lst = lst.filter((item) => item.status === statusDevis);
                    console.log(lst);
                }*/
                lst = pagination(lst, 10);
                setPages(lst);
                if (lst.list.length !== 0) {
                    setDatas(lst.list[0]);
                    setList(lst.list[0]);
                } else {
                    setDatas([]);
                    setList([]);
                }

                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const view = async (values) => {
        const response = await toast.promise(
            request.get(endPoint.paiements + "/" + values.slug),
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
            request.delete(endPoint.devis + "/" + values.slug),
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
                                data-bs-target="#formModal"
                                className="btn btn-tertiary-full h-60"
                                onClick={(e) => {
                                    e.preventDefault();
                                    formik.resetForm();
                                }}
                            >
                                Faire un paiement
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table class="table table-striped">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>#</th>
                                    <th>N* Devis</th>
                                    <th>campagne</th>
                                    <th>Transaction ID</th>
                                    <th>Type</th>
                                    <th>Montant</th>
                                    <th>Date</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((data, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{data.devis.reference}</td>
                                            <td>{data.devis.campagne.name}</td>
                                            <td>{data.transaction_id}</td>
                                            <td>
                                                <span>
                                                    {data.operator_name}
                                                </span>
                                            </td>
                                            <td>{data.montant} FCFA</td>
                                            <td>{data.date}</td>
                                            <td className="text-center">
                                                <ActionButton
                                                    //btnEditProps={btnEditProps}
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
                                Détails du paiement
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-41 text-40">
                                    <img width="90%" src={"filter"} alt="" />
                                </div>
                                <div className="col-12 col-md-10 mx-auto">
                                    <div className="d-flex align-items-center">
                                        <h2 className="me-auto">
                                            {"Campagne : " +
                                                viewData.devis?.campagne?.name}
                                        </h2>
                                        <span
                                            className={`px-2 fw-bold ${
                                                viewData.status == 2
                                                    ? "bg-primary-light"
                                                    : "bg-danger text-white"
                                            }`}
                                        >
                                            Montant :{" "}
                                            {viewData.montant + " FCFA"}
                                        </span>
                                    </div>
                                    <p>
                                        Reference du devis :{" "}
                                        <span className="fw-bold">
                                            {viewData.devis?.reference}
                                        </span>
                                    </p>
                                    <p>
                                        Transaction ID :{" "}
                                        <span className="fw-bold">
                                            {viewData.transaction_id}
                                        </span>
                                    </p>
                                    <p>
                                        Date:{" "}
                                        <span className="fw-bold">
                                            {viewData.date}
                                        </span>
                                    </p>
                                    <p>
                                    Operateur ID :{" "}
                                        <span className="fw-bold">
                                            {viewData?.operator_id}
                                        </span>
                                    </p>
                                    <p>
                                    Operateur Nom :{" "}
                                        <span className="fw-bold">
                                            {viewData?.operator_name}
                                        </span>
                                    </p>
                                    <p>
                                    Type de paiement :{" "}
                                        <span className="fw-bold">
                                            {viewData?.operator_name}
                                        </span>
                                    </p>
                                    <p>
                                    Numéro de paiement :{" "}
                                        <span className="fw-bold">
                                            {viewData?.numero_paiement}
                                        </span>
                                    </p>
                                    <p>
                                    Client :{" "}
                                        <span className="fw-bold">
                                            {viewData?.nom +" " +viewData?.prenom} ({viewData?.email}) <br />
                                        </span>
                                    </p>
                                    <p>
                                    etat:{" "}
                                        <span className="fw-bold">
                                            {viewData?.etat}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="formModal">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Enregistrer un paiement
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
                                    label={"Type de paiement"}
                                    placeholder={
                                        "Sélectionnez le type de paiement"
                                    }
                                    formik={formik}
                                    options={[
                                        { slug: 0, name: "Virement bancaire" },
                                        {
                                            slug: 1,
                                            name: "Paiement par bon de commande",
                                        },
                                        { slug: 2, name: "Autre" },
                                    ]}
                                />
                                <Input
                                    type={"text"}
                                    name={"devis"}
                                    label={"Réference du devis"}
                                    placeholder={"Entrez la réference du devis"}
                                    formik={formik}
                                />
                                <Input
                                    type={"text"}
                                    name={"prix"}
                                    label={"Montant"}
                                    placeholder={"Entrez le montant"}
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
        </>
    );
};

export default Paiement;
