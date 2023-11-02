import { useEffect, useRef, useState } from "react";
import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";
import { useFormik } from "formik";
import request, { URL, URL_ } from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Devis from "./tdb/Devis";

const initDevis = {}
const DevisDash = () => {
    
    const listStatut = [ "En attente", "Refuser", "Accepter",
    ]
    const menu = [
        "Devis en attente",
        "Devis en refuser",
        "Devis en accepter",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes Devis</h1>
            </div>
            <div className="d-flex">
                {menu.map((data, idx) => {
                    return (
                        <div
                            key={"menu" + idx}
                            className={`me-4 mb-3 cursor ${
                                activeMenu === data && "text-primary"
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
            {activeMenu === menu[0] && <Devis statusDevis={"0"}  />}
            {activeMenu === menu[1] && <Devis statusDevis={"1"} />}
            {activeMenu === menu[2] && <Devis statusDevis={"2"} />}
        </>
    );
};

export default DevisDash;
