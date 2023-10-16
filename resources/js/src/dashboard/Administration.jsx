import { useContext, useEffect, useState } from "react";
import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";
import ContentHeaderIniline from "./ContentHeaderIniline";
import TabCategorieMedia from "./components/TabCategorieMedia";
import TabCategorieFiltre from "./components/TabCategorieFiltre";
import TabUtilisateur from "./components/TabUtilisateur";
import TabFiltre from "./components/TabFiltre";
import TabMessage from "./components/TabMessage";
import TabAbonnement from "./components/TabAbonnement";
import TabAccompagnement from "./components/TabAccompagnement";
import TabAttestation from "./components/TabAttestation";
import TabCategorieAbonnement from "./components/TabCategorieAbonnement";
import { AppContext } from "../services/context";
import { useNavigate } from "react-router-dom";

const Administration = () => {
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;
    const navigate = useNavigate();
    const [tabView, setTabView] = useState("categorieMedia");
    const [btnName, setBtnName] = useState("")
    const [restForm, setRestForm] = useState(() =>{})
    const stats = [
        {
            title: "Total media",
            img: "bi bi-display",
        },
        {
            title: "Total offre",
            img: "bi bi-tv",
        },
        {
            title: "Total annonceur",
            img: "bi bi-people",
        },
        {
            title: "Total régis publicitaire",
            img: "bi bi-people",
        },
        {
            title: "Total paiément",
            img: "bi bi-people",
        },
        {
            title: "Campagne en cours",
            img: "bi bi-people",
        },
        {
            title: "Demande de devis",
            img: "bi bi-people",
        },
    ];
    const view = [
        "filtre",
        "message",
        "utilisateur",
        "categorieAbonnement",
        "categorieFiltre",
        "categorieMedia",
        "accompagnement",
        "attestation",
        "abonnement",
    ];

    useEffect(() => {
        if(user.status !== "administrateur"){
            navigate("/")
        }
    },[])
    const changeTab = (e, name) => {
        e.preventDefault();
        setTabView(name);
    };
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4">
                {stats.map((data, idx) => {
                    return (
                        <div className="col my-4" key={idx}>
                            <div className="d-flex align-items-center">
                                <div className="text-40 text-primary me-3 ic-img bg-primary-light">
                                    <i className={data.img}></i>
                                </div>
                                <div className="text-center4">
                                    <div className="mb-2">{data.title}</div>
                                    <div className="text-40">100</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="row">
            <ContentHeaderIniline
                    title={"Administration"}
                    addBtn={btnName}
                    tabView={tabView}
                    restForm={restForm}
                />
                <div className="d-flex">
                    <div className="border">
                        <p className="fw-bold text-white text-center p-0 py-1  text-18 bg-primary">
                            Menu
                        </p>
                        <div className="d-flex align-items-start mx-2">
                            <div
                                className="nav flex-column nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-messages-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-messages"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-messages"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[1])}
                                >
                                    Messages
                                </button>
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-utilisateurs-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-utilisateurs"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-utilisateurs"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[2])}
                                >
                                    Utilisateurs
                                </button>
                                {
                                    /**
                                     * <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-demande-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-demande"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-demande"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[3])}
                                >
                                    Catégories Abonnements
                                </button>
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-attestation-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-attestation"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-attestation"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[8])}
                                >
                                    Abonnements
                                </button>
                                     */
                                }
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[4])}
                                >
                                    Catégories Filtres
                                </button>
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-disabled-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-disabled"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-disabled"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[0])}
                                >
                                    Filtres
                                </button>
                                <button
                                    className="nav-link dash-link active text-start"
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected="true"
                                    onClick={(e) => changeTab(e, view[5])}
                                >
                                    Catégories Médias
                                </button>

                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-demande-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-demande"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-demande"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[6])}
                                >
                                    Accompagnement SM
                                </button>
                                <button
                                    className="nav-link dash-link text-start"
                                    id="v-pills-attestation-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-attestation"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-attestation"
                                    aria-selected="false"
                                    onClick={(e) => changeTab(e, view[7])}
                                >
                                    Attestation de service
                                </button>
                                
                                {/**
                                     * <button
                                    className="nav-link dash-link"
                                    id="v-pills-settings-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-settings"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-settings"
                                    aria-selected="false"
                                >
                                    Settings
                                </button>
                                     */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        {tabView === view[0] && <TabFiltre setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[1] && <TabMessage setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[2] && <TabUtilisateur setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[3] && <TabCategorieAbonnement setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[4] && <TabCategorieFiltre setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[5] && <TabCategorieMedia setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[6] && <TabAccompagnement setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[7] && <TabAttestation setRestForm={setRestForm} setBtnName={setBtnName} />}
                        {tabView === view[8] && <TabAbonnement setRestForm={setRestForm} setBtnName={setBtnName} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Administration;
