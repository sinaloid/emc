import React from "react";
import { NavLink } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Button from "./Button";
import Dash from "./imgs/Dash";
import Logo from "./imgs/Logo";
import Section from "./Section";

const Header = () => {
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
                                    <NavLink className="nav-link" to={"#"}>
                                        Tarifs
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={listLink.media}>
                                        Média
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <Button
                                        name={"Se connecter"}
                                        classe={
                                            "btn-secondary text-uppercase mx-1 mb-3"
                                        }
                                        callback={() => {}}
                                    />
                                </li>
                                <li className="nav-item">
                                    <Button
                                        name={"accompagnement sur-mesure"}
                                        classe={
                                            "btn-primary text-uppercase mx-1 mb-3"
                                        }
                                        callback={() => {}}
                                    />
                                </li>
                                <li className="nav-item">
                                    <div
                                        class="btn-group mb-3"
                                        role="group"
                                        aria-label="Basic example"
                                    >
                                        <button
                                            type="button"
                                            class="btn btn-tertiary-full"
                                        >
                                            {" "}
                                            <Dash />
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-tertiary p-0"
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
                                        </button>
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
