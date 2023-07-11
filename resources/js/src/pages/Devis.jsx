import { useEffect, useState } from "react";
import Banier from "../components/Banier";
import Button from "../components/Button";
import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import InputField from "../components/InputField";
import ProduitCard from "../components/ProduitCard";
import ProduitHeader from "../components/ProduitHeader";
import Section from "../components/Section";
import endPoint from "../services/endPoint";
import request from "../services/request";
import { listLink } from "../utils/listLink";
import Produit from "./Produit";
import { useParams } from "react-router-dom";
import Page from "./Page";
import Header from "../components/Header";
import TelechargerDevis from "../components/TelechargerDevis";
import FormDevis from "../components/FormDevis";
import endPointPublic from "../services/endPointPublic";

const Devis = ({ children, title }) => {
    const [produit, setProduit] = useState();
    const { slug } = useParams();
    const location = window.location.href
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

    useEffect(() => {
        console.log(location.includes("telecharger-le-devis"))
        get();
    }, [slug]);

    const get = () => {
        request
            .get(endPointPublic.offres + "/" + slug)
            .then((res) => {
                console.log(res.data);
                setProduit(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const top = (e) =>{
        e.preventDefault()
        window.scrollTo(0, 0)
    }
    return (
        <>
            <Header />
            <Page>
                <Section bg="bg-white">
                    <ProduitHeader
                        fitrstTitle={produit?.media?.name}
                        firstContent={produit?.media?.description}
                        image={produit?.media?.image}
                    />
                    {location.includes("telecharger-le-devis") ? <TelechargerDevis produit={produit} /> : <FormDevis produit={produit} link={"/telecharger-le-devis/"+slug} />}
                    <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5">
                        <div className="row">
                            <div className="col-md-12 order-2 order-md-1">
                                <h2 className="fw-bold text-40 mb-5 text-lowercase">
                                    {""}
                                </h2>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                    {produit?.media?.media_produits?.map(
                                        (data, idx) => {
                                            return (
                                                <div
                                                    className="col"
                                                    key={data.slug}
                                                    onClick={top}
                                                >
                                                    <ProduitCard
                                                        data={data}
                                                        Img={data.image}
                                                        title={data.name}
                                                        link={"/telecharger-le-devis/"+slug}
                                                        classe="text-primary"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </Page>
        </>
    );
};

export default Devis;
