import { NavLink } from "react-router-dom";
import Map from "../components/Map";
import Menu from "../components/Menu";
import Section from "../components/Section"
import { listLink } from "../utils/listLink";
import request from "../services/request";
import endPointPublic from "../services/endPointPublic";
import { useEffect, useState } from "react";


const Carte = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //get();
        getCategorie();
    }, []);

    
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
    
    const getProduitByMedia = (e, mediaSlug) => {
        e.preventDefault();
        console.log(mediaSlug);
        request
            .get(endPointPublic.offresByMedia + "/" + mediaSlug)
            .then((res) => {
                console.log(res.data);
                setDatas(res.data.data);
                setList(res.data.data);
                getCategorieMedia();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Section>
            <Menu categories={categories}
                    medias={[]}
                    getProduitByMedia={getProduitByMedia}/>
            <div className="d-flex justify-content-center">
                <div className="btn-group border rounded-5 p-1">
                    <NavLink
                        to={listLink.carte}
                        className={({ isActive }) =>
                            isActive
                                ? "text-uppercase fw-bold btn btn-tertiary-full text-white rounded-5 px-5"
                                : " text-uppercase fw-bold btn px-2"
                        }
                    >
                        Carte
                    </NavLink>
                    <NavLink
                        to={listLink.index}
                        className={({ isActive }) =>
                        isActive
                            ? "text-uppercase fw-bold btn btn-tertiary-full text-white rounded-5 px-5"
                            : " text-uppercase fw-bold btn px-2"
                    }
                    >
                        Grid
                    </NavLink>
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <Map />
            </div>
        </Section>
    )
}

export default Carte;