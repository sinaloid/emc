import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Dash from "./imgs/Dash";
import Logo from "./imgs/Logo";
import Section from "./Section";

const Header = () => {
    const navigate = useNavigate()
    return (
        <Section bg="bg-white">
            <div className="col-12 col-md-11 mx-auto">
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <Logo />
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
                                    <NavLink className="nav-link" to={listLink.index}>
                                        Accueil
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={listLink.referencer}>
                                        Tarifs
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={listLink.media}>
                                        Média
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                <button
                                    className="btn btn-secondary text-uppercase mx-1 mb-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                    >
                                        Se connecter
                                    </button>
                                </li>
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
                                            className="btn btn-tertiary-full"
                                        >
                                            {" "}
                                            <Dash />
                                        </button>
                                        <Link
                                            to={listLink.panier}
                                            type="button"
                                            className="btn btn-tertiary p-0"
                                        >
                                            <span
                                                className="d-block mx-1 text-start"
                                                style={{ lineHeight: "90%" }}
                                            >
                                                <span className="d-block tex-16">
                                                    Panier
                                                </span>{" "}
                                                <span className="d-block text-13 text-primary">
                                                    02 produits
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
