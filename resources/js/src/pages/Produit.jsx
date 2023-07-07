import { useEffect, useState } from "react";
import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import ProduitCard from "../components/ProduitCard";
import Section from "../components/Section";
import { listLink } from "../utils/listLink";
import ProduitHeader from "../components/ProduitHeader";
import { useParams } from "react-router-dom";
import request from "../services/request";
import endPoint from "../services/endPoint";
import Page from "./Page";
import Header from "../components/Header";

const Produit = ({ children, title, link }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const imgs = [
        {
            img: RadioIMG,
            title: "Radio",
            link: listLink.radio,
        },
        {
            img: TeleIMG,
            title: "Radio",
            link: listLink.tele,
        },
        {
            img: PresseIMG,
            title: "Radio",
            link: listLink.presse,
        },
        {
            img: JournauxIMG,
            title: "Radio",
            link: listLink.journaux,
        },
    ];

    const [media, setMedia] = useState({});
    const { produit } = useParams();

    useEffect(() => {
        get();
    }, []);

    const get = () => {
        request
            .get(endPoint.medias + "/" + produit)
            .then((res) => {
                console.log(res.data.data);
                setMedia(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <Header />
            <Page>
                <Section>
                    <ProduitHeader
                        fitrstTitle={media?.name}
                        firstContent={media?.description}
                        image={media.image}
                    />
                    <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5">
                        <div className="row">
                            <div className="col-md-12 order-2 order-md-1">
                                <h2 className="fw-bold text-40 mb-5 text-lowercase">
                                    {"Liste des produits"}
                                </h2>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                    {media.media_produits?.map((data,idx) => {
                                        return (
                                            <div className="col" key={data.slug}>
                                                <ProduitCard
                                                    data={data}
                                                    classe="text-primary"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </Page>
        </>
    );
};

export default Produit;
