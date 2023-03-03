import React from "react";
import Section from "./Section";
import Logo from "./imgs/Logo";
import { Link } from "react-router-dom";
import ReseauxSociaux from "./imgs/ReseauxSociaux";
import LogoForFooter from "./imgs/LogoForFooter";

const Footer = () => {
    return (
        <Section bg="bg-primary text-white">
            <div className="col-12 col-md-10 col-lg-9 mx-auto">
                <div className="my-3">
                    <LogoForFooter />
                </div>
                <div className="row row-cols-1 row-cols-md-4">
                    <div className="col">
                        <p className="text-justify1">
                            Elite Media Connect (EMC) est une plateforme
                            digitale de vente de services des medias. Elle a
                            pour ambition de limiter les deplacements des
                            clients des medias pour l’achat des espaces
                            publicitaires et autres commandes.{" "}
                        </p>
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <h5 className="text-uppercase text-18 fw-bold">
                            Nos Service
                        </h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                Annonceur / Agences
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                    Déposer un brief
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                    Editeurs/Régies publicitaires
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                    FAQs
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                    Demande de démo
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                    Nos offres publicitaires
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
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
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                à propos
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                Contactez-nous
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                Blog
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                CGU - CGV
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="#" className="nav-link p-0 text-white">
                                Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <ReseauxSociaux />
                </div>
            </div>
        </Section>
    );
};

export default Footer;
