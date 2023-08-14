import Hero from "../components/Hero";
import Banier from "../components/Banier";
import FAQ from "../components/FAQ";
import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { useEffect } from "react";
import LoginModal from "../components/LoginModal";
import AccompagnementModal from "../components/AccompagnementModal";
import Footer from "../components/Footer";

const Page = ({children}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    return (
        <>
            
            {
                children
            }
            <Banier
                fitrstTitle={"Déjà plus de 200 Médias référencés sur E.M.C"}
                firstContent={
                    "Vous avez un média à référencer ?"
                }
                secondTitle={"Vous avez un Media à référencer ?"}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={"référencer un média"}
                bg={"bg-gray"}
                callback={() => {
                    navigate(listLink.referencer)
                }}
            />
            <Banier
                fitrstTitle={"Grandes ou de taille moyenne, elles nous font confiance"}
                firstContent={
                    "Quel que soit votre objectif marketing, vous trouverez sur EMC le média le plus adapté à vos besoins. Rejoignez-nous et laissez-vous guider par nos experts médias chevronnés."
                }
                secondTitle={"Souhaitez-vous un accompagnement sur-mesure  ?"}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={"Je souhaite un accompagnement sur-mesure"}
            />
            <Banier
                fitrstTitle={"EMC, comment ça marche?"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={""}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={""}
                bg={"bg-gray"}
                hasImgs={false}
            />
            <FAQ />
            <AccompagnementModal />
            <LoginModal />
            <Footer />
        </>
    );
};

export default Page;
