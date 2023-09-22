import { Link, NavLink, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { URL_ } from "../services/request";
import { useEffect, useState } from "react";

const Menu = ({ categories, medias, getProduitByMedia, slug }) => {
    const [item, setItem] = useState({
        selected: false,
        media: "",
        categorie_media_slug: "",
        categorie_media_name: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        categories.map((data) => {
            if (data.slug === slug) {
                setItem({
                    ...item,
                    categorie_media_slug: data.slug,
                    categorie_media_name: data.name,
                });
            }
        });
    }, [slug]);

    const disableItem = (e, name) => {
        e.preventDefault();
        setItem({
            ...item,
            selected: false,
        });
        if (name === "accueil") {
            navigate("/");
        }
    };
    return (
        <div className="row">
            <div className="col-12 border-bottom pt-5">
                <div className="row px-0">
                    <div className="col-12 col-md-10 mx-auto px-0">
                        <div className="d-flex px-0">
                            <div className="d-inline-block pb-0">
                                <Link
                                    to={listLink.index}
                                    className={`link fw-bold mx-4 ${
                                        slug === undefined && "link-border-bottom"
                                    }`}
                                    onClick={(e) => {
                                        setItem({
                                            ...item,
                                            selected: false,
                                        });
                                    }}
                                >
                                    Derniers produits commandés
                                </Link>
                                {/**
                             * <Link
                            to={listLink.media}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Média
                        </Link>
                             */}
                                {categories.map((categorie) => {
                                    return (
                                        <Link
                                            to={
                                                "/media-categorie/" +
                                                categorie.slug
                                            }
                                            className={`link fw-bold mx-4 ${
                                                slug === categorie.slug &&
                                                "link-border-bottom"
                                            }`}
                                            onClick={(e) => {
                                                setItem({
                                                    ...item,
                                                    selected: false,
                                                });
                                            }}
                                        >
                                            {categorie.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {item.selected && (
                <div className="col-12 col-md-10 mx-auto pt-3 px-3 text-primary">
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={(e) => disableItem(e, "accueil")}
                    >
                        Accueil
                    </span>
                    /
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={(e) => disableItem(e, "none")}
                    >
                        {item.categorie_media_name}
                    </span>
                    /{item.media.name}
                </div>
            )}
            <div className="col-12 pt-3">
                <div className="d-flex justify-content-center p-2">
                    {!item.selected ? (
                        <div className="d-flex bg-gray p-2">
                            {medias.map((data, idx) => {
                                return (
                                    <div
                                        className="mx-2"
                                        onClick={(e) => {
                                            getProduitByMedia(e, data.slug);
                                            setItem({
                                                ...item,
                                                selected: true,
                                                media: data,
                                            });
                                        }}
                                    >
                                        <img
                                            width={"64px"}
                                            src={
                                                data.image
                                                    ? URL_ + "" + data.image
                                                    : ""
                                            }
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <div className="d-flex bg-gray1 p-2 py-4">
                                <div className="mx-2" onClick={(e) => {}}>
                                    <img
                                        width={"200px"}
                                        src={
                                            item.media?.image
                                                ? URL_ + "" + item.media?.image
                                                : ""
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-2">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
        </div>
    );
};

export default Menu;
