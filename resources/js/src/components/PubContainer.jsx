import { Link, NavLink } from "react-router-dom";
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

const PubContainer = () => {
    const [datas, setDatas] = useState([])

    useEffect(() =>{
        get()
    },[])

    const get = () =>{
        request.get(endPoint.offres).then((res) =>{
            //console.log(res.data)
            setDatas(res.data.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
    return (
        <Section>
            <Menu />
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
            <div className="col-12 col-md-10 col-lg-9 mx-auto pt-5 pb-3">
                <div className="row">
                    <div className="col-md-9 order-2 order-md-1 mb-3">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {
                                datas.map((data, idx) =>{
                                    return <div className="col">
                                        <PubCard data={data} key={idx}/>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                    <div className="col-md-3 order-1 order-md-2 mb-3">
                        <PubFilter />
                    </div>

                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto text-center text-primary mb-3 pb-3">
                <Link className="text-primary" to={"#"}>Voir plus</Link>
            </div>
            <AddPuBModal />
            <AddPubComfirmationModal />
        </Section>
    );
};

export default PubContainer;
