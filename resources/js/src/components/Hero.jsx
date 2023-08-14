import { useEffect, useState } from "react";
import Search from "./imgs/Search";
import Section from "./Section";
import { makeSearch } from "../services/function";

const Hero = ({categories, setList, datas}) => {
    const [search,setSearch] = useState("")
    const [categorie, setCategorie] = useState("")
    const [datasByCategorie, setDataByCategorie] = useState(datas)

    useEffect(() =>{
        setDataByCategorie(datas)
    },[datas])

    const onSearch = (e) =>{
        setSearch(e.target.value)
        makeSearch(e,setList,datasByCategorie,[
            "name"
        ])
    }

    const filter = (e) =>{
        setCategorie(e.target.value)
        if(e.target.value !== "Tout" && e.target.value !== ""){
            const tab = datas.filter((data) => data.media?.categorie_media?.slug === categorie)
            setDataByCategorie(tab)
            setList(tab)
        }else{
            setDataByCategorie(datas)
            setList(datas)
        }
    }
    return (
        <Section bg="bg-primary">
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <h1 className="text-white text-40 text-center fw-bold">
                    Tous les services des médias en un seul endroit. 
                </h1>
                <p className="text-white text-22 text-center">
                EMC est votre compagnon idéal pour l’achat facile, rapide et sécurisé des services des médias (spots et panneaux publicitaires, communiqués, couvertures médiatiques, reportages, etc). 
                </p>
                <div className="row mt-5">
                    <div className="col-10 mx-auto1">
                        <div className="input-group mb-3">
                        <select
                                className="input-group-text text-start"
                                value={categorie}
                                onChange={filter}
                                >
                                    <option value={""}>Filtrer par</option>
                                    <option value={""}>Tout</option>
                                    {
                                        categories.map((data, idx) => {
                                            return <option key={data.slug} value={data.slug}>{data.name}</option>
                                        })
                                    }
                                </select>
                            <input
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={onSearch}
                            />
                            <div className="pt-2 btn btn-secondary">
                                <Search />
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mx-auto">
                        <div className="d-flex text-white">
                            <div className="me-auto">
                                <i className="bi bi-check-circle-fill"></i>
                                <span> 0% de commission</span>
                            </div>
                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                <span> 0% de commission</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
