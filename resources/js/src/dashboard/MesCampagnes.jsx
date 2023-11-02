import {useState } from "react";
import Campagne from "./tdb/Campagne";


const initCampagne = {};
const MesCampagnes = () => {
    const menu = [
        "Campagnes en attente",
        "Campagnes en cours",
        "Campagnes en terminer",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes campagnes</h1>
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
            {activeMenu === menu[0] && <Campagne status={"0"} />}
            {activeMenu === menu[1] && <Campagne status={"1"} />}
            {activeMenu === menu[2] && <Campagne status={"2"} />}
        </>
    );
};

export default MesCampagnes;
