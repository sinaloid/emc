import { useState } from "react";
import Publicite from "./tdb/Publicite";

const MesPublicites = () => {
    
    const listStatut = [ "En attente", "Refuser", "Accepter",
    ]
    const menu = [
        "Publicités en attente",
        "Publicités en cours",
        "Publicités en terminer",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes publicités</h1>
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
            {activeMenu === menu[0] && <Publicite statusDevis={"0"} />}
            {activeMenu === menu[1] && <Publicite statusDevis={"1"} />}
            {activeMenu === menu[2] && <Publicite statusDevis={"2"} />}
        </>
    );
};

export default MesPublicites;
