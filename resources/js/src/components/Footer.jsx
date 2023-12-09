import React from "react";
import Section from "./Section";
import Logo from "./imgs/Logo";
import { Link } from "react-router-dom";
import ReseauxSociaux from "./imgs/ReseauxSociaux";
import LogoForFooter from "./imgs/LogoForFooter";
import Fleche from "./imgs/Fleche";

const Footer = () => {
    return (
        <Section bg="bg-primary text-white">
            <div className="col-12 col-md-10 col-lg-9 mx-auto">
                <div className="my-3">
                    <LogoForFooter />
                </div>
                <div className="row pb-3">
                    <div className="col col-md-6 pe-lg-5">
                        <p className="text-justify1">
                            EMC est une plateforme dédiée à l'achat d'espaces
                            publicitaires sur les médias traditionnels et
                            digitaux. De là où vous êtes, communiquez sur les
                            meilleurs médias aux meilleurs tarifs et ce, sans
                            parcourir la moindre distance grâce à notre
                            plateforme.
                        </p>

                        <div>
                            <ReseauxSociaux />
                        </div>
                    </div>

                    <div className="col text-white">
                        <h5 className="text-uppercase text-18 fw-bold">
                            RESSOURCES
                        </h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Fleche />
                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Annonceur / Agences
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />
                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />
                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Nos offres publicitaires
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />
                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Plan du site
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5 className="text-uppercase text-18 fw-bold">
                            élite Media Connect
                        </h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Fleche />

                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    <span className="text-uppercase">à</span>{" "}
                                    propos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />

                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Contactez-nous
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />

                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />

                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    CGU - CGV
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Fleche />

                                <Link
                                    to="#"
                                    className="nav-link p-0 text-white d-inline-block ms-1"
                                >
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-secondary text-center py-2">
            © 2023 Elite Régie SARL. Tous droits réservés.
            </div>
        </Section>
    );
};

export default Footer;
