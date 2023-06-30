import { useEffect, useState } from "react";
import endPoint from "../services/endPoint";
import request from "../services/request";
import FilterCollapse from "./FilterCollapse";
import DownArrow from "./imgs/DownArrow";
import Filter from "./imgs/Filter";
import InputField from "./InputField";

const PubFilter = () => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPoint.categorieFiltres)
            .then((res) => {
                console.log(res.data.data);
                setDatas(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="card shadow">
            <div className="card-header">
                <div className="d-flex">
                    <div className="me-auto">
                        <Filter /> <span className="fw-bold">Filtres</span>
                    </div>
                    <div>Effacer</div>
                </div>
            </div>
            <div className="card-body">
                {datas.map((data, idx) => {
                    return (
                        <FilterCollapse
                            key={idx}
                            id={data.name}
                            name={data.name}
                        >
                            {data.filtres?.map((dataFiltre, idx) => {
                                return (
                                    <InputField
                                        key={idx}
                                        type={"checkbox"}
                                        label={dataFiltre.name}
                                    />
                                );
                            })}
                        </FilterCollapse>
                    );
                })}
            </div>
        </div>
    );
};

export default PubFilter;
