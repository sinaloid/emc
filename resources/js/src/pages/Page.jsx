import Hero from "../components/Hero";
import Banier from "../components/Banier";
import FAQ from "../components/FAQ";
import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { useEffect } from "react";
import AccompagnementCard from "../components/AccompagnementCard";
import LoginModal from "../components/LoginModal";

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
                fitrstTitle={"Déjà plus de 200 Médias référencés sur e.m.c"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
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
                fitrstTitle={"Ils nous font confiance"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
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
            <AccompagnementCard />
            <LoginModal />
        </>
    );
};

export default Page;
