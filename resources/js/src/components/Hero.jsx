import { useEffect, useState } from "react";
import Search from "./imgs/Search";
import Section from "./Section";
import { makeSearch } from "../services/function";

const Hero = ({ categories, setList, datas }) => {
    const [search, setSearch] = useState("");
    const [categorie, setCategorie] = useState("");
    const [datasByCategorie, setDataByCategorie] = useState(datas);

    useEffect(() => {
        setDataByCategorie(datas);
    }, [datas]);

    const onSearch = (e) => {
        setSearch(e.target.value);
        makeSearch(e, setList, datasByCategorie, ["name"]);
    };

    const filter = (e) => {
        setCategorie(e.target.value);
        if (e.target.value !== "Tout" && e.target.value !== "") {
            const tab = datas.filter(
                (data) => data.media?.categorie_media?.slug === categorie
            );
            setDataByCategorie(tab);
            setList(tab);
        } else {
            setDataByCategorie(datas);
            setList(datas);
        }
    };
    return (
        <Section bg="bg-primary">
            <div className="col-12 col-md-10 col-lg- mx-auto py-5">
                <h1 className="text-white text-40 text-center fw-bold" style={{fontSize:"56px"}}>
                    Achetez vos espaces publicitaires en un seul endroit !
                </h1>
                <p className="text-white text-22 text-center" style={{fontSize:"28px"}}>
                    EMC est votre compagnon idéal pour l’achat facile, rapide et
                    sécurisé de vos espaces publicitaires <br />(spots et panneaux
                    publicitaires, communiqués, couvertures médiatiques,
                    reportages, etc).
                </p>
                <div className="row mt-5">
                    <div className="col-10 mx-auto">
                        <div className="input-group mb-3">
                            <div class="btn-group bg-gray">
                                <button
                                    class="btn rounded-0 dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="true"
                                    aria-expanded="false"
                                    style={{height:"60px", width:"150px"}}
                                >
                                    Filtrer par
                                </button> 
                                <ul class="dropdown-menu">
                                    <div className="d-flex">
                                        <div>
                                            <li className="border-bottom text-center  mx-2 li-border-bottom" style={{cursor:"pointer"}}>Ville</li>
                                            {["Ouagadougou","Bobo-Dioulasso", "Koudougou","Fada N'Gourma","Dori"].map((data, idx) => {
                                                return (
                                                    <li
                                                        key={data}
                                                        value={data}
                                                    >
                                                        <a
                                                            class="dropdown-item"
                                                            href="#"
                                                        >
                                                            {data}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <li className="border-bottom text-center mx-2 li-border-bottom" style={{cursor:"pointer"}}>Supports</li>
                                            {categories.map((data, idx) => {
                                                return (
                                                    <li
                                                        key={data.slug}
                                                        value={data.slug}
                                                    >
                                                        <a
                                                            class="dropdown-item"
                                                            href="#"
                                                        >
                                                            {data.name}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={onSearch}
                                placeholder="Chercher le produit d’un média ou un espace publicitaire"
                                style={{height:"60px"}}
                            />
                            <div className="pt-3 btn btn-primary-no-hover text-center" style={{height:"60px", width:"100px"}}>
                                <span className="d-inline-block mx-auto pt-1">
                                <Search />
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Section>
    );
};

export default Hero;
