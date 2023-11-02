import { useState } from "react";
import Messages from "./tdb/Messages";

const initMessage = {
    user: "",
    message: "",
};
const MesMessages = () => {
    const menu = [
        "Messages",
        "Accompagnement sur mesure",
        "Attestations de services",
    ];
    const [activeMenu, setActiveMenu] = useState(menu[0]);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                <h1 className="h2 me-auto">Mes messages</h1>
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
            {activeMenu === menu[0] && <Messages />}
            {activeMenu === menu[1] && <Messages statusMessage={"accompagnement"} />}
            {activeMenu === menu[2] && <Messages statusMessage={"attestation"} />}
        </>
    );
};

export default MesMessages;
