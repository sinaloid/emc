import { useFormik } from "formik";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import ContentHeader from "./ContentHeader";
import Paiement from "./tdb/Paiement";

const MesPaiement = () => {

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
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes paiements</h1>
            </div>
            <Paiement />
        </>
    );
};

export default MesPaiement;
