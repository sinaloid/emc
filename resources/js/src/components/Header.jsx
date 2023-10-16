import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Dash from "./imgs/Dash";
import Logo from "./imgs/Logo";
import Section from "./Section";
import { AppContext } from "../services/context";
import { getCampagne } from "../services/storage";
import request, { URL_ } from "../services/request";
import endPointPublic from "../services/endPointPublic";
import Fr from "./imgs/Fr";

const Header = () => {
    const appCtx = useContext(AppContext);
    const { user } = appCtx;
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategorie();
    }, []);
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

    const getCategorie = () => {
        request
            .get(endPointPublic.categorieMedias)
            .then((res) => {
                console.log(res.data);
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const goToDashboard = (e) => {
        e.preventDefault();
        navigate(listLink.dashboard+"tdb");
    };
    return (
        <Section bg="bg-white">
            <div className="col-12 col-md-11 mx-auto">
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <span>
                                <Logo />
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
                            className="collapse navbar-collapse bg-dark1 mt-31"
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
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                    >
                                        Espaces publicitaires
                                    </a>
                                    <ul className="dropdown-menu">
                                        {categories.map((data) => {
                                            return (
                                                <li key={"link"+data.slug}>
                                                    <NavLink
                                                        className="dropdown-item nav-link"
                                                        to={
                                                            "/media-categorie/" +
                                                            data.slug
                                                        }
                                                    >
                                                        {data.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.referencer}
                                    >
                                        Comment ça marche
                                    </NavLink>
                                </li>

                                {/**
                                     * <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.referencer}
                                    >
                                        Tarifs
                                    </NavLink>
                                </li>
                                     *<li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={listLink.media}
                                    >
                                        Média
                                    </NavLink>
                                </li>
                                     */}
                                {user.isAuth ? (
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-secondary-border mx-1"
                                            //to={listLink.dashboard}
                                            onClick={goToDashboard}
                                        >
                                            Mon compte
                                        </button>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-secondary-border mx-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#loginModal"
                                        >
                                            Se connecter
                                        </button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary-no-hover mx-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#accompagnement"
                                    >
                                        Accompagnement sur-mesure
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic example"
                                    >
                                        <button
                                            type="button"
                                            className="btn bg-primary1 btn-tertiary-full1"
                                            onClick={e =>{
                                                e.preventDefault()
                                                navigate(listLink.panier)
                                            }}
                                        >
                                            {" "}
                                            <Dash produit={getCampagne().length} />
                                        </button>
                                        {/**
                                             * <Link
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
                                             */}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="text-18 ms-2">
                                        <Fr />
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-primary1 dropdown-toggle border-0 px-0 px-2"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                data-bs-auto-close="true"
                                                aria-expanded="false"
                                            >
                                                <span className="d-inline-block px-1">FR</span>
                                            </button>
                                            {
                                                /**
                                                 * <ul className="dropdown-menu">
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        FR 
                                                    </a>
                                                </li>
                                            </ul>
                                                 */
                                            }
                                        </div>
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
