import Page from "./Page";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import AccompagnementCard from "../components/ReferencerMediaCard";
import ReferencerMediaCard from "../components/ReferencerMediaCard";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import request from "../services/request";
import endPointPublic from "../services/endPointPublic";

const ReferenceMedia = () => {
    const [datas, setDatas] = useState([]);
    const [categorie, setCategorie] = useState("");

    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPointPublic.categorieAbonnements)
            .then((res) => {
                console.log(res.data.data);
                setDatas(res.data.data);
                setCategorie(res.data.data[0].slug);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Section>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1 className="fw-bold text-40">
                            Pourquoi référencer ses offres publicitaires sur EMC
                            ?
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam mattis eleifend tellus, vel viverra
                            ante tincidunt placerat. Nulla mi dolor,
                            pellentesque ut massa et, fermentum hendrerit purus.
                            Suspendisse lacinia neque vitae metus viverra
                            accumsan. Duis suscipit porta erat at tempus. Aenean
                            ut accumsan mi. Ut tempus odio ac gravida posuere.
                            Sed dapibus cursus mi, vel accumsan metus mollis
                            non. Phasellus congue non turpis sit amet rhoncus.
                            Integer eu neque porta, porta lacus vitae, porttitor
                            arcu. Suspendisse in libero nulla. In pellentesque
                            varius dictum.
                        </p>
                    </div>
                    <div className="col-md-12 mb-3">
                        <h2 className="fw-bold text-26">
                            Les bénéfices de notre solution pour votre régie
                            publicitaire :
                        </h2>
                        <ul>
                            <li>Diversifiez votre portefeuille annonceurs</li>
                            <li>
                                Alimentez vos équipes commerciales avec des
                                leads annonceurs qualifiés
                            </li>
                            <li>Développez votre chiffre d'affaires</li>
                        </ul>
                    </div>

                    <div className="col-md-10 mx-auto">
                        <div className="text-center fw-bold text-18">
                            Choisissez la formule qui vous convient le mieux
                        </div>
                        <div className="d-flex justify-content-center my-5">
                            <div className="btn-group border rounded-5 p-1">
                                {datas.map((data, idx) => {
                                    return (
                                        <span
                                            className={`btn px-2 ${
                                                categorie === data.slug &&
                                                " btn-tertiary-full text-white rounded-5 px-5"
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCategorie(data.slug);
                                            }}
                                        >
                                            {data.name}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row justify-content-center1">
                            {datas.map((data, idx) => {
                                if (data.slug !== categorie) {
                                    return;
                                }

                                return (
                                    <>
                                        {data.abonnements?.map((abonn, idx) => {
                                            return (
                                                <div
                                                    className="col-md-5 mb-3"
                                                    key={data.slug}
                                                >
                                                    {" "}
                                                    <ReferencerMediaCard
                                                        key={abonn.slug}
                                                        title={abonn.name}
                                                        prix={abonn.price}
                                                        avantage={
                                                            abonn.avantage
                                                        }
                                                        description={
                                                            abonn.description
                                                        }
                                                        linkText={"Lancez-vous"}
                                                        btn={"btn-tertiary"}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ReferenceMedia;
