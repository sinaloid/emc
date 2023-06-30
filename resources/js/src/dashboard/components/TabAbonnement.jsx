import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { useEffect } from "react";

const initAbonnement = {
    name: "",
    prix: "",
    type: "",
    description: "",
};
const TabAbonnement = ({ setBtnName = () => {} }) => {
    useEffect(() => {
        setBtnName("Ajouter un abonnement");
    }, []);
    const formik = useFormik({
        initialValues: initAbonnement,
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
                            <th>Nom de l'abonnement</th>
                            <th>Type d'abonnement</th>
                            <th>prix</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10).keys()].map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>nom de l'auteur</td>
                                    <td>Annonceur</td>
                                    <td>Lorem ipsum ilaqp</td>
                                    <td className="text-center">
                                        <ActionButton />
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
                                Ajout d’un abonnement
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
                                    label={"Nom de l'abonnement"}
                                    placeholder={
                                        "Entrez le nom de l'abonnement"
                                    }
                                    formik={formik}
                                />

                                <Input
                                    type={"text"}
                                    name={"prix"}
                                    label={"Prix de l'abonnement"}
                                    placeholder={
                                        "Entrez le prix de l'abonnement"
                                    }
                                    formik={formik}
                                />

                                <Input
                                    type={"select"}
                                    name={"type"}
                                    label={"Type d'abonnement"}
                                    placeholder={
                                        "Sélectionnez un type d'abonnement"
                                    }
                                    formik={formik}
                                />
                                <Input
                                    type={"textarea"}
                                    name={"description"}
                                    label={"Description de l'abonnement"}
                                    placeholder={
                                        "Entrez la description de l'abonnement"
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

export default TabAbonnement;
