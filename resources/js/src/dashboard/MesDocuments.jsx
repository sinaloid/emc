import { useFormik } from "formik";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import ContentHeader from "./ContentHeader";
import { useEffect, useRef, useState } from "react";
import request, { URL } from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import Document from "./tdb/Document";

const initCategorie ={

}
const MesDocuments = () => {
    const menu = [
        "Campagnes",
        "Devis",
        "Publicités",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes documents</h1>
            </div>
            <div className="d-flex">
                {menu.map((data, idx) => {
                    return (
                        <div
                            key={"menu" + idx}
                            className={`me-4 mb-3 cursor ${
                                activeMenu === data &&
                                "text-primary"
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveMenu(data);
                            }}
                        >
                            {data}
                        </div>
                    );
                })}
            </div>
            {activeMenu === menu[0] && <Document type={"campagnes"} />}
            {activeMenu === menu[1] && <Document type={"devis"} />}
            {activeMenu === menu[2] && <Document type={"publicites"} />}
        </>
    );
};

export default MesDocuments;
