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
        <form className="card shadow">
            <div className="card-header">
                <div className="d-flex">
                    <div className="me-auto">
                        <Filter /> <span className="fw-bold">Filtres</span>
                    </div>
                    <button type="reset" className="cursor border-0 bg-inherit">Effacer</button>
                </div>
            </div>
            <div className="card-body">
                {datas.map((data, idx) => {
                    return (
                        <FilterCollapse
                            key={"cate"+idx}
                            id={"cate"+idx}
                            name={data.name}
                        >
                            {data.filtres?.map((dataFiltre, idx) => {
                                return (
                                    <InputField
                                        key={"fil"+idx}
                                        type={"checkbox"}
                                        label={dataFiltre.name}
                                    />
                                );
                            })}
                        </FilterCollapse>
                    );
                })}
            </div>
        </form>
    );
};

export default PubFilter;
