import { useEffect } from "react";
import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import ProduitCard from "../components/ProduitCard";
import Section from "../components/Section";
import { listLink } from "../utils/listLink";

const Produit = ({ children, title, link }) => {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
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
    return (
        <Section>
            {children}
            <div className="col-12 col-md-10 col-lg-9 mx-auto pb-5">
                <div className="row">
                    <div className="col-md-12 order-2 order-md-1">
                        <h2 className="fw-bold text-40 mb-5">{title}</h2>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {[...Array(9).keys()].map((idx) => {
                                return (
                                    <div className="col" key={idx}>
                                        <ProduitCard
                                            Img={RadioIMG}
                                            title={"Titre"}
                                            link={link}
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
    );
};

export default Produit;
