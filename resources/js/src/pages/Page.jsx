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

const Page = ({ children }) => {
    const navigate = useNavigate();
    const logos = [bf1, le_pays, minute, rtb, savane_fm, sidwaya,bf1, le_pays];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {children}

            <Banier bg={"bg-gray"}>
                <BanierContent
                    title={"Déjà plus de 200 Médias référencés sur E.M.C"}
                    content={""}
                ></BanierContent>
                <div className="col-12">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3"
                                key={idx}
                            >
                                <img key={"logo"+idx} width={"100px"} className="rounded-circle" src={data} /> 
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={"Vous avez un Media à référencer ?"}
                    content={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                >
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
                        "Grandes ou de taille moyenne, elles nous font confiance"
                    }
                    content={
                        "Quel que soit votre objectif marketing, vous trouverez sur EMC le média le plus adapté à vos besoins. Rejoignez-nous et laissez-vous guider par nos experts médias chevronnés."
                    }
                ></BanierContent>
                <div className="col-12">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3"
                                key={idx}
                            >
                                <img key={"logo"+idx} width={"100px"} className="rounded-circle" src={data} /> 
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={
                        "Souhaitez-vous un accompagnement sur-mesure  ?"
                    }
                    content={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                >
                    <button
                        className="btn btn-secondary text-uppercase"
                        data-bs-toggle="modal"
                        data-bs-target="#accompagnement"
                    >
                        Je souhaite un accompagnement sur-mesure
                    </button>
                </BanierContent>
            </Banier>
            <Banier bg={"bg-gray"}>
                <BanierContent
                    title={"EMC, comment ça marche ?"}
                    content={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                ></BanierContent>

                <BanierContent
                    content={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                >
                    <button
                        className="btn btn-secondary text-uppercase"
                        onClick={(e) => navigate(listLink.referencer)}
                    >
                        comment ça marche ?
                    </button>
                </BanierContent>
            </Banier>
            {/**<FAQ /> */}
            <AccompagnementModal />
            <LoginModal />
            <Footer />
        </>
    );
};

export default Page;
