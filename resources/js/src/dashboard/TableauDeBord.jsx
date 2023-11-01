import { useEffect, useRef, useState } from "react";
import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";
import { useFormik } from "formik";
import request, { URL } from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Search from "../components/imgs/Search";
import { pagination } from "../services/function";
import FlechePrec from "../components/imgs/FlechePrec";
import FlecheSuiv from "../components/imgs/FlecheSuiv";
import DevisDemande from "./tdb/DevisDemande";
import CampagneEnCour from "./tdb/CampagneEnCour";
import Document from "./tdb/Document";

const initDevis = {};
const TableauDeBord = () => {
    const menu = [
        "Derniers devis demandés",
        "Campagnes en cours",
        "Campagnes en attente de paiement",
        "Derniers documents",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 px-1 px-md-2">
                <h1 className="h2 me-auto">Tableau de bord</h1>
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
            {activeMenu === menu[0] && <DevisDemande />}
            {activeMenu === menu[1] && <CampagneEnCour status={"1"} />}
            {activeMenu === menu[2] && <CampagneEnCour status={"0"} />}
            {activeMenu === menu[3] && <Document />}
        </>
    );
};

export default TableauDeBord;
