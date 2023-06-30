import { useEffect } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";

const initAttestation = {
    user:"",
    description:""
}

const TabAttestation = ({setBtnName = () => {}}) => {
    const btnViewProps = {
        text: 'Cliquez-moi',
        onClick: () => {
          // Logique de gestion du clic du bouton
          alert("ok")
        },
        //disabled: true // Exemple d'une propriété disabled
      };
    
    useEffect(() => {
        setBtnName("Envoyer une attestation");
    }, []);
    const formik = useFormik({
        initialValues: initAttestation,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Nom prénom</th>
                            <th>Contact</th>
                            <th>Date d'envoi</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10).keys()].map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>image</td>
                                    <td>nom du filter</td>
                                    <td>+226 xx xx xx xx</td>
                                    <td>12/01/2023</td>
                                    <td className="text-center">
                                        <ActionButton btnViewProps={btnViewProps} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="attestation">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Envoi d’une attestation
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
                                    name={"user"}
                                    label={"adresse mail"}
                                    placeholder={
                                        "Entrez l'adresse mail du destinateur"
                                    }
                                    formik={formik}
                                />
                                
                                <Input
                                    type={"textarea"}
                                    name={"description"}
                                    label={"Description"}
                                    placeholder={
                                        "Entrez la description"
                                    }
                                    formik={formik}
                                />
                            </div>

                            <div className="modal-footer d-flex justify-content-start border-0">
                                <button
                                    type="reset"
                                    className="btn btn-tertiary"
                                    data-bs-dismiss="modal"
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

export default TabAttestation;
