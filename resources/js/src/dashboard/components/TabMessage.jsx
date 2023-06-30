import { useEffect } from "react";
import ActionButton from "../../components/ActionButton";
import { useFormik } from "formik";
import Input from "../../components/Input";

const initMessage = {
    user:"",
    message:""
}
const TabMessage = ({ setBtnName = () => {} }) => {
    useEffect(() => {
        setBtnName("Envoyer un message");
    }, []);
    const formik = useFormik({
        initialValues: initMessage,
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
                            <th>Auteur du Message</th>
                            <th>Type de compte</th>
                            <th>Message</th>
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
            <div className="modal fade" id="message">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title text-meduim text-bold">
                                Envoi d’un message
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
                                    name={"message"}
                                    label={"Message"}
                                    placeholder={
                                        "Entrez votre message"
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

export default TabMessage;
