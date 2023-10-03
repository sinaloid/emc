import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";
import { dashboardRoute, GetRoute } from "../components/ListRoute";
import Message from "../components/Message";
import Notification from "../components/Notification";
import ProfileOption from "../components/ProfileOption";
import { listLink } from "../utils/listLink";
import { useContext, useEffect } from "react";
import { AppContext, initialUser } from "../services/context";
import { URL } from "../services/request";

const Dashboard = () => {
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;
    const navigate = useNavigate();

    useEffect(() => {
        isAuth();
    });

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

    return (
        <div className="container-fluid px-0">
            <div className="row">
                <nav
                    id="sidebarMenu"
                    className="pt-2 col-md-3 col-lg-2 d-md-block sidebar collapse"
                >
                    <div className="position-sticky pt-1 sidebar-sticky h-100 overflow-auto">
                        <div className="d-flex pb-2 px-2 align-items-center ">
                            <div className="me-2 mt-2">
                                <img
                                    className="rounded-circle"
                                    width="64px"
                                    src={URL + "" + user.profile}
                                    alt=""
                                />
                            </div>
                            <div className="">
                                <span className="fw-bold text-18">
                                    {user.name}
                                </span>
                                <br />
                                <span className="">{user.status}</span>
                            </div>
                        </div>
                        <ul className="nav flex-column px-2 mt-3">
                            <li className="nav-item mb-2">
                                <NavLink
                                    to={listLink.dashboard}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                >
                                    <span className="mt-1 d-block">
                                        Tableau de bord
                                    </span>
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_demande}
                                >
                                    Mes publicités
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_campagne}
                                >
                                    Mes campagnes
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_devis}
                                >
                                    Mes devis
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_paiement}
                                >
                                    Mes paiements
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_support}
                                >
                                    Mes médias{" "}
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_docs}
                                >
                                    Mes documents{" "}
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                    to={listLink.dashboard_msgs}
                                >
                                    Mes Messages{" "}
                                </NavLink>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                            <NavLink
                                className="text-primary text-muted text-decoration-none"
                                to={listLink.index}
                            >
                                Retour{" "}
                            </NavLink>
                            <NavLink
                                className="link-secondary text-primary"
                                to={listLink.index}
                                
                            >
                                <i className="bi bi-arrow-left-circle-fill"></i>
                            </NavLink>
                        </h6>
                        <ul className="nav flex-column w-100 position-absolute1 bottom-0 mb-2 px-2 mt-5">
                            <li className="nav-item my-1">
                                <NavLink
                                    to={listLink.dashboard_admin}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                >
                                    Administration
                                </NavLink>
                            </li>
                            <li className="nav-item my-1">
                                <NavLink
                                    to={listLink.dashboard_compte}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active btn btn-dash border rounded-2 mx-auto py-0 text-start pt-1"
                                            : "btn nav-link border py-0 btn-dash text-start pt-1"
                                    }
                                >
                                    Mon compte
                                </NavLink>
                            </li>
                            <li className="nav-item my-1">
                                <span
                                    className="btn nav-link border-0 py-0 btn-warning text-start pt-1"
                                    onClick={deconnection}
                                >
                                    Me déconnecter
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-0">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom px-1 px-md-2 shadow">
                        <div className="ms-auto d-flex">
                            <div className="d-flex align-items-center me-2">
                                <Message />
                                <Notification />
                            </div>
                            <div className="d-flex px-2 align-items-center border-start">
                                <ProfileOption />
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid px-4">
                        <GetRoute list={dashboardRoute} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
