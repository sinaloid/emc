import { useFormik } from "formik";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import ContentHeader from "./ContentHeader";

const Paiement = () => {

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            values._method = "put";
            console.log(values);
            status(values)
        },
    });

    return (
        <>
            <ContentHeader 
                title={"Mes paiements"} 
                addBtn="Faire un paiement"
            />
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>N* Devis</th>
                                <th>Montant</th>
                                <th>Date</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                [].map((data, idx) => {
                                    return<tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>N-14857965</td>
                                    <td>500.000 FCFA</td>
                                    <td>12/03/2023</td>
                                    <td className="text-center">
                                        <ActionButton />
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
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
                                    label={"statut"}
                                    placeholder={
                                        "Sélectionnez le type de paiement"
                                    }
                                    formik={formik}
                                    options={[
                                        {slug:0,name:"Virement bancaire"},
                                        {slug:1,name:"Paiement par bon de commande"},
                                        {slug:2,name:"Autre"},
                                    ]}
                                />
                                <Input
                                    type={"text"}
                                    name={"devis"}
                                    label={"Réference du devis"}
                                    placeholder={
                                        "Entrez la réference du devis"
                                    }
                                    formik={formik}
                                />
                                <Input
                                    type={"text"}
                                    name={"prix"}
                                    label={"Montant"}
                                    placeholder={
                                        "Entrez le montant"
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
        </>
    );
};

export default Paiement;
