import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Dash from "./imgs/Dash";
import Logo from "./imgs/Logo";
import Section from "./Section";
import { AppContext } from "../services/context";
import { getCampagne } from "../services/storage";
import { URL_ } from "../services/request";

const Header = () => {
    const appCtx = useContext(AppContext);
    const { user } = appCtx;
    const navigate = useNavigate();
    const isAuth = () => {
        alert(user.isAuth);
        if (
            user.isAuth === false ||
            user.isAuth === "" ||
            user.isAuth === null
        ) {
            return true;
        }
        return false;
    };
    return (
        <Section bg="bg-white">
            <div className="col-12 col-md-11 mx-auto">
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <span>
                                <img
                                    className="img"
                                    width="81px"
                                    src={URL_ + "images/logo.png"}
                                    alt=""
                                />
                            </span>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavbar"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="collapsibleNavbar"
                        >
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.index}
                                    >
                                        Accueil
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.referencer}
                                    >
                                        Tarifs
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.media}
                                    >
                                        Média
                                    </NavLink>
                                </li>
                                {user.isAuth ? (
                                    <li className="nav-item">
                                        <NavLink
                                            className="btn btn-secondary text-uppercase mx-1 mb-3"
                                            to={listLink.dashboard}
                                        >
                                            Mon compte
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-secondary text-uppercase mx-1 mb-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#loginModal"
                                        >
                                            Se connecter
                                        </button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary text-uppercase mx-1 mb-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#accompagnement"
                                    >
                                        accompagnement sur-mesure
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className="btn-group mb-3"
                                        role="group"
                                        aria-label="Basic example"
                                    >
                                        <button
                                            type="button"
                                            className="btn bg-primary btn-tertiary-full1"
                                        >
                                            {" "}
                                            <Dash />
                                        </button>
                                        <Link
                                            to={listLink.panier}
                                            type="button"
                                            className="btn btn-tertiary p-0 pt-1"
                                        >
                                            <span
                                                className="d-block mx-1 text-start"
                                                style={{ lineHeight: "90%" }}
                                            >
                                                <span className="d-block tex-16">
                                                    Panier
                                                </span>{" "}
                                                <span className="d-block text-13 text-primary">
                                                    {getCampagne().length +
                                                        " produits"}
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </Section>
    );
};

export default Header;
