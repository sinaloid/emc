import { Link, NavLink, useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";
import { dashboardRoute, GetRoute } from "../components/ListRoute";
import Message from "../components/Message";
import Notification from "../components/Notification";
import ProfileOption from "../components/ProfileOption";
import { listLink } from "../utils/listLink";
import { useContext, useEffect } from "react";
import { AppContext, initialUser } from "../services/context";
import request, { URL } from "../services/request";

import { UserIcon } from "../components/icons/UserIcon";
import { CampagneIcon } from "../components/icons/CampagneIcon";
import { DevisIcon } from "../components/icons/DevisIcon";
import { DocIcon } from "../components/icons/DocIcon";
import { PaiementIcon } from "../components/icons/PaiementIcon";
import { ProduitIcon } from "../components/icons/ProduitIcon";
import { MessageIcon } from "../components/icons/MessageIcon";
import { DeconnectionIcon } from "../components/icons/DeconnectionIcon";
import { MenuIcon } from "../components/icons/MenuIcon";
import { DashIcon } from "../components/icons/DashIcon";
import { LogoForFooter } from "../components/imgs/LogoForFooter";
import endPoint from "../services/endPoint";

const Dashboard = () => {
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;
    const navigate = useNavigate();

    useEffect(() => {
        isAuth();
        //getAuthUser();
    },[]);

    const isAuth = () => {
        if (
            user.isAuth === false ||
            user.isAuth === "" ||
            user.isAuth === null
        ) {
            navigate("/");
        }
    };

    const deconnection = (e) => {
        e.preventDefault();
        onUserChange(initialUser);
        isAuth();
    };

    const getAuthUser = () => {
        request
            .get(endPoint.user)
            .then((res) => {
                console.log(res.data);
                onUserChange({
                    ...user,
                    status: res.data.users.status
                })
            })
            .catch((error) => {
                console.log(error);
                onUserChange(initialUser);
                isAuth();
            });
    };

    return (
        <>
            <header
                className="navbar sticky-top bg-dark1 w-100 d-md-none flex-md-nowrap p-0 shadow1"
                data-bs-theme="dark"
                //style=""
            >
                <a
                    className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white1"
                    href="#"
                >
                    EMC
                </a>

                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-black"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <MenuIcon />
                        </button>
                    </li>
                </ul>

                <div id="navbarSearch" className="navbar-search w-100 collapse">
                    <input
                        className="form-control w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </header>

            <div className="container-fluid px-0">
                <div className="row">
                    <div className="sidebar mx-0 border1 border-right col-md-3 col-lg-2 p-0">
                        <div
                            className="offcanvas-md offcanvas-end bg-body-tertiary1 bg-primary h-100"
                            tabindex="-1"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title"
                                    id="sidebarMenuLabel"
                                ></h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto bg-primary1">
                                <div className="d-flex align-items-center px-3 mb-5">
                                    <Link to={"/"} className="me-auto">
                                        <LogoForFooter />
                                    </Link>
                                </div>
                                <ul className="nav flex-column mb-auto rounded-3 pt-2">
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <DashIcon />
                                            Tableau de bord
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_compte}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <UserIcon />
                                            Mon Compte
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_campagne}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <CampagneIcon />
                                            Campagnes
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_devis}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <DevisIcon />
                                            Demandes de devis
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_docs}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <DocIcon />
                                            Documents
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_paiement}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <PaiementIcon />
                                            Mes paiements
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_support}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <ProduitIcon />
                                            Mes produits
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_msgs}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <MessageIcon />
                                            Messages
                                        </NavLink>
                                    </li>
                                </ul>

                                <ul className="nav flex-column mb-auto rounded-3 pt-2">
                                    <li className="nav-item">
                                        <NavLink
                                            to={listLink.dashboard_demande}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link d-flex align-items-center gap-2 active"
                                                    : "nav-link d-flex align-items-center gap-2 text-white"
                                            }
                                        >
                                            <UserIcon />
                                            Mes publicités
                                        </NavLink>
                                    </li>
                                    {user.status === "administrateur" && (
                                        <li className="nav-item">
                                            <NavLink
                                                to={listLink.dashboard_admin}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "nav-link d-flex align-items-center gap-2 active"
                                                        : "nav-link d-flex align-items-center gap-2 text-white"
                                                }
                                            >
                                                <UserIcon />
                                                Administration
                                            </NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item rounded-3">
                                        <span
                                            onClick={deconnection}
                                            className="nav-link d-flex align-items-center gap-2 text-white"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <DeconnectionIcon />
                                            Je me déconnecte
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container-fluid px-4">
                            <GetRoute list={dashboardRoute} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
