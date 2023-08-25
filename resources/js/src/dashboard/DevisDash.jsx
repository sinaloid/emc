import { useEffect, useRef, useState } from "react";
import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";
import { useFormik } from "formik";
import request, { URL, URL_ } from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const initDevis = {}
const DevisDash = () => {
    const close = useRef();
    const [datas, setDatas] = useState([]);
    const [viewData, setViewData] = useState(initDevis);
    const viewRef = useRef();
    const fileModal = useRef()
    const listStatut = [ "En attente", "Refuser", "Accepter",
    ]
    const navigate = useNavigate()
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
            status(values)
        },
    });

    const get = () => {
        request
            .get(endPoint.devis)
            .then((res) => {
                setDatas(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const post = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.devis, values),
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
            request.get(endPoint.devis + "/" + values.slug),
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
            request.post(endPoint.devis + "/" + values.slug, values),
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

    const status = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.devis + "/" + values.slug,values),
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
        e.preventDefault()
        window.open(URL+"pdf/"+ref, "_blank")
    }

    const editData = (data) => {
        console.log(data);
        formik.setFieldValue("slug", data.slug);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("description", data.description);
    };
    const formikFile = useFormik({
        initialValues: {files:""},
        onSubmit: (values) => {
            //values._method = "put";
            console.log(values);
            postFile(values)
        },
    });

    const postFile = async (values) => {
        const response = await toast.promise(
            request.post(endPoint.devis+"/docs", values),
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

    const paiement = (e,viewData) => {
        e.preventDefault();

        if(false){
            close.current.click();
            formikFile.setFieldValue("slug",viewData.slug)
            fileModal.current.click();
        }else{
            //navigate("/paiement/public/"+viewData.slug)
            window.location.href(URL+"paiement/public/"+viewData.slug)
        }
       
    }
    return (
        <>
            <ContentHeader 
                title={"Mes Devis"} 
                addBtn="Demander un devis"
            />
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>N° Devis</th>
                                <th>Date de la demande</th>
                                <th>Estimation du Coût</th>
                                <th>État du devis</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{data.reference}</td>
                                        <td>{new Date(data.created_at).toLocaleString()}</td>
                                        
                                        <td>
                                        {parseFloat(data.price * 18/100) + parseFloat(data.price)} FCFA
                                        </td>
                                        <td>{data.status && listStatut[data.status]}</td>
                                        <td className="text-center">
                                            <ActionButton 
                                             btnEditProps={btnEditProps}
                                             data={data}
                                             editData={editData}
                                             destroy={destroy}
                                             view={view} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                                Détails du devis
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
                                            {viewData.reference}
                                        </h2>
                                        <span className={`px-2 fw-bold ${viewData.status == 2 ? "bg-primary-light":"bg-danger text-white"}`}>Devis : {viewData.status && listStatut[viewData.status]}</span>
                                    </div>
                                    <p>Prix HT: <span className="fw-bold">{viewData?.price +" FCFA"}</span></p>
                                    <p>TVA 18%: <span className="fw-bold">{viewData?.price * 18/100 +" FCFA"}</span></p>
                                    <p>Prix TTC: <span className="fw-bold">{(parseFloat(viewData?.price * 18/100) + parseFloat(viewData?.price))  +" FCFA"}</span></p>
                                    <p>Date de debut: <span className="fw-bold">{viewData?.startDate}</span></p>
                                    <p>Date de fin: <span className="fw-bold">{viewData?.endDate}</span></p>
                                    <p>Description: <span className="fw-bold">{viewData?.description}</span></p>
                                    <p className="mb-0 fw-bold">Historique des devis: </p>
                                    <div className="ps-3">
                                        {
                                            viewData?.devis_docs?.map((item) =>{
                                                return <span>
                                                {new Date(item.created_at).toLocaleString()} :  <a href={URL+""+item.url} className="text-primary p-1 rounded-1 me-2" target="blank">Télécharger le devis</a> <br />

                                                </span>
                                            })
                                        }
                                    </div>
                                    <div className="d-flex">
                                    
                                    {
                                        viewData.status == 2 && <a href={URL+"paiement/public/"+viewData.slug} className="btn btn-primary me-2">Payer la facture</a>
                                    }
                                    </div>
                                    <div className="mt-3">
                                        <span
                                            className="bg-primary text-white p-1 rounded-1"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                close.current.click();
                                                formikFile.setFieldValue("slug",viewData.slug)
                                                fileModal.current.click();
                                            }}
                                        >
                                            Envoyer un devis
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
                                Statut du devis
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
                                        "Sélectionnez le statut du devis"
                                    }
                                    formik={formik}
                                    options={[
                                        {slug:0,name:"En attente"},
                                        {slug:1,name:"Refuser"},
                                        {slug:2,name:"Accepter"},
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
            <input ref={fileModal} type="hidden" data-bs-toggle="modal" data-bs-target="#file" />
            <div className="modal fade" id="file">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Envoyer un devis
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
                                    type={"text"}
                                    name={"price"}
                                    label={"Montant total"}
                                    placeholder={
                                        "Entrez le montant total du devis"
                                    }
                                    formik={formikFile}
                                />
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

export default DevisDash;
