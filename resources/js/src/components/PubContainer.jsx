import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { listLink } from "../utils/listLink";
import AddPubComfirmationModal from "./AddPubComfirmationModal";
import AddPuBModal from "./addPubModal";
import Menu from "./Menu";
import PubCard from "./PubCard";
import PubFilter from "./PubFilter";
import Section from "./Section";
import { useEffect, useState } from "react";
import request from "../services/request";
import endPoint from "../services/endPoint";
import Hero from "./Hero";
import endPointPublic from "../services/endPointPublic";
import Map from "./Map";
import FlechePrec from "./imgs/FlechePrec";
import FlecheSuiv from "./imgs/FlecheSuiv";
import { pagination } from "../services/function";

const PubContainer = () => {
    const [datas, setDatas] = useState([]);
    const [list, setList] = useState([]);
    const [pages, setPages] = useState({
        list: [],
        counter: 0,
    });
    const [categories, setCategories] = useState([]);
    const [villes, setVilles] = useState([]);
    const [medias, setMedias] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [view, setView] = useState(false);
    const [affichageSlug, setAffichageSlug] = useState("nean");
    const [currentIndex, setCurrentIndex] = useState(0)
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        get();
        getCategorie();
        getVille()
        //console.log(slug);
    }, [slug]);

    const get = () => {
        const url = slug ? slug : "";
        request
            .get(endPointPublic.offres + "/" + url)
            .then((res) => {
                console.log(res.data.data);
                const lst = slug
                    ? pagination(res.data.data, 6)
                    : pagination(res.data.data, 8);
                setPages(lst);
                if (lst.list.length !== 0) {
                    setDatas(lst.list[0]);
                    setList(lst.list[0]);
                }else{
                    setDatas([]);
                    setList([]);
                }
                getCategorieMedia();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCategorie = () => {
        request
            .get(endPointPublic.categorieMedias)
            .then((res) => {
                console.log(res.data);
                setCategories(res.data.data);
                res.data.data.map((data) => {
                    if (
                        data.name === "Affichage" ||
                        data.name === "affichage"
                    ) {
                        setAffichageSlug(data.slug);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCategorieMedia = () => {
        const url = slug ? "/"+ slug : "";
        request
            .get(endPointPublic.mediaByCategorie + url)
            .then((res) => {
                console.log(res.data);
                setMedias(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getProduitByMedia = (e, mediaSlug) => {
        e.preventDefault();
        console.log(mediaSlug);
        request
            .get(endPointPublic.offresByMedia + "/" + mediaSlug)
            .then((res) => {
                const lst = slug
                    ? pagination(res.data.data, 6)
                    : pagination(res.data.data, 8);
                setPages(lst);
                if (lst.list.length !== 0) {
                    setDatas(lst.list[0]);
                    setList(lst.list[0]);
                }else{
                    setDatas([]);
                    setList([]);
                }
                getCategorieMedia();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getVille = () => {
        request
            .get(endPointPublic.villes)
            .then((res) => {
                console.log(res.data);
                //setMedias(res.data.data);
                setVilles(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const recherche = (value) => {
        console.log(value)
        request
            .post(endPointPublic.recherche, value)
            .then((res) => {
                console.log(res.data.data);

                const tab = res.data.data.filter((data) => !data.is_deleted && data)
                const lst = slug
                    ? pagination(tab, 6)
                    : pagination(tab, 8);
                setPages(lst);
                if (lst.list.length !== 0) {
                    setDatas(lst.list[0]);
                    setList(lst.list[0]);
                }else{
                    setDatas([]);
                    setList([]);
                }
                getCategorieMedia();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeView = (e) => {
        // e.preventDefault();
        setView(!view);
    };
    const changePages = (e,idx) => {
        e.preventDefault();
        console.log(idx)
        if(idx >= 0 && idx <= pages.counter - 1){
            setDatas(pages.list[idx]);
            setList(pages.list[idx]);
            setCurrentIndex(idx)
        }
    };
    const changePagesByIndex = (e,idx) => {
        e.preventDefault();
        setCurrentIndex(idx)
        setDatas(pages.list[idx]);
        setList(pages.list[idx]);
    };
    return (
        <>
            <Hero
                categories={categories}
                villes={villes}
                recherche={recherche}
                list={list}
                setList={setList}
                datas={datas}
            />
            <Section>
                <Menu
                    slug={slug}
                    categories={categories}
                    medias={medias}
                    getProduitByMedia={getProduitByMedia}
                />

                <div className="col-12 col-md-10 mx-auto pb-3">
                    <div className="row">
                        {slug ? (
                            <>
                                <div className="col-md-9 order-2 order-md-1 mb-3">
                                    {!view && (
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                            {list.map((data) => {
                                                if(data.is_deleted){
                                                    return
                                                }
                                                return (
                                                    <div
                                                        className="col"
                                                        key={data.slug}
                                                    >
                                                        <PubCard
                                                            data={data}
                                                            setSelectedData={
                                                                setSelectedData
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {view && <Map />}
                                </div>
                                <div className="col-md-3 order-1 order-md-2 mb-3">
                                    {affichageSlug === slug && (
                                        <div className="d-flex border bg-gray py-2 justify-content-center mb-3 w-100">
                                            <span className="me-2">
                                                Vue grille
                                            </span>
                                            <div class="form-check form-switch">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="flexSwitchCheckChecked"
                                                    onChange={changeView}
                                                    //checked={view}
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="flexSwitchCheckChecked"
                                                >
                                                    Vue carte
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <PubFilter />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-md-12 order-2 order-md-1 mb-3">
                                    {!view && (
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                                            {list.map((data, idx) => {
                                                if (idx >= 8) {
                                                    return;
                                                }
                                                return (
                                                    <div
                                                        className="col"
                                                        key={data.slug}
                                                    >
                                                        <PubCard
                                                            data={data}
                                                            setSelectedData={
                                                                setSelectedData
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {view && <Map />}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {(slug && list.length !== 0) && (
                    <div className="col-12 col-md-10 col-lg-9 mx-auto text-center text-primary mb-3 pb-3">
                        <button className="btn mb-3 btn-pub mx-2" onClick={e => changePages(e, currentIndex - 1)}>
                            <span>
                                <FlechePrec />
                            </span>
                            <span className="ms-1">Page précédente</span>
                        </button>
                        {
                            pages.list.map((data,idx) => {
                                return <button
                                className={`btn mb-3 ${currentIndex === idx ? "btn-pub-primary" : "btn-pub"}  mx-2 px-3`}
                                key={"btn" + idx}
                                onClick={e =>changePagesByIndex(e,idx)}
                            >
                                <span>{idx + 1}</span>
                            </button>
                            })
                        }
                        <button className="btn mb-3 btn-pub mx-2" onClick={e => changePages(e, currentIndex + 1)}>
                            <span className=" me-1">Page suivante</span>
                            <span>
                                <FlecheSuiv />
                            </span>
                        </button>
                    </div>
                )}
                <AddPuBModal data={selectedData} />
                <AddPubComfirmationModal data={selectedData} />
            </Section>
        </>
    );
};

export default PubContainer;
