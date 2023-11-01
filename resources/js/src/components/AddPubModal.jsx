import { useContext, useEffect,useState } from "react";
import { URL } from "../services/request";
import InputField from "./InputField";
import { getCampagne, setCampagne } from "../services/storage";
import { useFormik } from "formik";
import Input from "./Input";
import DateTimeSelect from "./DateTimeSelect";
import { AppContext } from "../services/context";

const initData = {
    startDate: "",
    endDate: "",
    file: "",
};
const AddPuBModal = ({
    data = {},
    update = false,
    callback = () => {},
    idx,
}) => {
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;
    const [dates, setDates] = useState([])
    const [values, setValues] = useState([]);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        console.log(idx);
        if (update) {
            formik.setFieldValue("startDate", data.startDate);
            formik.setFieldValue("endDate", data.endDate);
        }
    }, [idx,refresh]);

    const formik = useFormik({
        initialValues: initData,
        onSubmit: (values) => {
            values.dates = dates
            //console.log(values);
            
            if(update){
                updateValue(values)
            }else{
                ajoutPanier(values);
            }
            setValues([])
            setRefresh(refresh + 1)
        },
    });

    const ajoutPanier = (values) => {
        const oldCampagne = getCampagne();
        console.log({ ...data, ...values });
        const val = [...oldCampagne, { ...data, ...values }]
        setCampagne(val);
        onUserChange({
            ...user,
            panier: val.length
        })
    };

    const updateValue = (values) => {
        const campagnes = getCampagne();
        const tab = campagnes.filter(
            (item) => item.slug !== values.slug && item
        );

        const val = [...tab, values]
        setCampagne(val);

        onUserChange({
            ...user,
            panier: val.length
        })
    };

    return (
        <div id="addModal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title text-white">
                            Pour ajouter ce produit à votre panier, veuillez
                            nous fournir quelques détails
                        </h5>
                        <button
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    width={"100%"}
                                    src={URL + data?.image}
                                    alt=""
                                />
                                <h2 className="text-center">{data?.name}</h2>
                            </div>
                            <div className="col-md-8 border-start">
                                <div className="border-bottom d-inline-block mb-3 text-22">
                                    Description du produit
                                </div>

                                <p>{data.description}</p>
                                <div className="border-bottom d-inline-block mb-3 text-22">
                                    Détails de la campagne
                                </div>
                                <div className="col-md-6 fw-bold">
                                    <span className="fw-bold">
                                        Selectionnez les dates et les heures de
                                        diffusions
                                    </span>
                                    <div className="py-2">
                                        <DateTimeSelect values={values} setValues={setValues} setDates={setDates} />
                                    </div>
                                </div>
                                {/**
                                     * <div className="border-bottom d-inline-block mb-3 text-22">
                                    Fichiers
                                </div>
                                <div className="col-md-6">
                                    <Input
                                        type={"file"}
                                        name={"file"}
                                        label={"Télécharger votre fichier"}
                                        placeholder={""}
                                        formik={formik}
                                    />
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aliquam mattis eleifend
                                    tellus, vel viverra ante tincidunt placerat.
                                    Nulla mi dolor, pellentesque ut massa et,
                                    fermentum hendrerit purus. Suspendisse
                                    lacinia neque vitae metus viverra accumsan.
                                </p>
                                     */}
                                
                                
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addComfirmationModal"
                                        onClick={
                                            update
                                                ? callback()
                                                : formik.handleSubmit
                                        }
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPuBModal;
