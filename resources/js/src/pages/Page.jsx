import Hero from "../components/Hero";
import Banier from "../components/Banier";
import FAQ from "../components/FAQ";
import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { useEffect } from "react";
import LoginModal from "../components/LoginModal";
import AccompagnementModal from "../components/AccompagnementModal";
import Footer from "../components/Footer";
import { BanierContent } from "../components/BanierContent";
import Button from "../components/Button";
import MediaIMG from "../components/imgs/MediaIMG";
import bf1 from "../assets/partenaires/bf1.png";
import le_pays from "../assets/partenaires/le_pays.png";
import minute from "../assets/partenaires/minute.bf.png";
import rtb from "../assets/partenaires/rtb.png";
import savane_fm from "../assets/partenaires/savane_fm.png";
import sidwaya from "../assets/partenaires/sidwaya.png";
import { StepContainer } from "../components/StepContainer";
import { StepOne } from "../components/imgs/StepOne";
import { StepTwo } from "../components/imgs/StepTwo";
import { StepThree } from "../components/imgs/StepThree";

const Page = ({ children }) => {
    const navigate = useNavigate();
    const logos = [bf1, le_pays, minute, rtb, savane_fm, sidwaya, bf1];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {children}

            <Banier bg={"bg-gray"}>
                <BanierContent
                    title={
                        "Ils sont partenaires et vendent leurs supports sur EMC."
                    }
                    content={""}
                ></BanierContent>

                <div className="col-12 my-3">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3 shadow bg-white"
                                key={idx}
                            >
                                <img
                                    key={"logo" + idx}
                                    width={"100px"}
                                    className="rounded-circle"
                                    src={data}
                                />
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={
                        "Vous avez un espace publicitaire à référencer ?"
                    }
                    titleCss={"fw-bold"}
                    content={
                        "Comme de nombreux éditeurs et régies publicitaires, référencez votre support sur EMC et :"
                    }
                >
                    <>
                        <ol>
                            <li>Gérer facilement vos espaces publicitaires</li>
                            <li>Diversifiez votre portefeuille annonceur</li>
                            <li>Développer votre chiffre d’affaires</li>
                        </ol>
                    </>
                    <Button
                        name={"référencer un média"}
                        classe="btn-secondary text-uppercase "
                        bg={"bg-gray"}
                        callback={() => {
                            navigate(listLink.referencer);
                        }}
                    />
                </BanierContent>
            </Banier>
            <Banier>
                <BanierContent
                    title={
                        "Grandes ou de taille moyenne, elles nous communiquent déjà sur EMC"
                    }
                    content={
                        "Quel que soit votre objectif marketing, vous trouverez sur EMC le média le plus adapté à vos besoins. Rejoignez-nous et laissez-vous guider par nos experts médias chevronnés."
                    }
                ></BanierContent>
                <div className="col-12 my-3">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3 shadow bg-white"
                                key={idx}
                            >
                                <img
                                    key={"logo" + idx}
                                    width={"100px"}
                                    className="rounded-circle"
                                    src={data}
                                />
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={
                        "Souhaitez-vous un accompagnement sur-mesure ?"
                    }
                    content={
                        "Sur EMC, nous répondons à toutes vos préoccupations liées à l’achat média. Pour cela, nous vous donnons la possibilité de faire une demande sur mesure. Un expert média vous contactera sous 24h et se chargera de vous accompagner sur tout le processus, de A à Z."
                    }
                >
                    <button
                        className="btn btn-secondary text-uppercase mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(listLink.accompagnement);
                        }}
                    >
                        Je souhaite un accompagnement sur-mesure
                    </button>
                </BanierContent>
            </Banier>
            <Banier bg={"bg-gray1"}>
                <BanierContent
                    title={"EMC, comment ça marche ?"}
                    content={
                        "Grâce à EMC, lancer une campagne publicitaire devient accessible à tous. Nous offrons des espaces uniques à chaque éditeur ou régie publicitaire pour gérer ses supports. Vous souhaitez obtenir un devis, lancer une campagne publicitaire ou encore bénéficier d’un accompagnement sur mesure, vous êtes au bon endroit. EMC, c’est un processus en 3 temps :"
                    }
                ></BanierContent>
                <div className="col-12 pt-4">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <StepContainer step={"1"} text={"Demande de devis"}>
                                <StepOne />
                            </StepContainer>
                        </div>
                        <div className="col">
                            <StepContainer
                                step={"2"}
                                text={"Réception du devis & Paiement"}
                            >
                                <StepTwo />
                            </StepContainer>
                        </div>
                        <div className="col">
                            <StepContainer
                                step={"3"}
                                text={
                                    "Diffusion & Envoi des justificatifs de campagne"
                                }
                            >
                                <StepThree />
                            </StepContainer>
                        </div>
                    </div>
                </div>
            </Banier>
            {/**<FAQ /> */}
            <AccompagnementModal />
            <LoginModal />
            <Footer />
        </>
    );
};

export default Page;
