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
import { listLink } from "../utils/listLink";
import Produit from "./Produit";

const Devis = ({ children, title }) => {
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
        <Section bg="bg-white">
            <ProduitHeader
                fitrstTitle={title}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
            />
            {children}
            <Produit></Produit>
        </Section>
    );
};

export default Devis;
