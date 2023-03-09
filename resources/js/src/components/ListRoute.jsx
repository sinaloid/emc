import { Route, Routes } from "react-router-dom";
import Accompagnement from "../pages/Accompagnement";
import Accueil from "../pages/Accueil";
import Carte from "../pages/Carte";
import Devis from "../pages/Devis";
import Journaux from "../pages/Journaux";
import Media from "../pages/Media";
import MediaDetail from "../pages/MediaDetail";
import Panier from "../pages/Panier";
import Presse from "../pages/Presse";
import Produit from "../pages/Produit";
import Radio from "../pages/Radio";
import Tele from "../pages/Tele";
import { listLink } from "../utils/listLink";
import Banier from "./Banier";
import FormDevis from "./FormDevis";
import ProduitHeader from "./ProduitHeader";
import PubContainer from "./PubContainer";
import TelechargerDevis from "./TelechargerDevis";

const appRoute = [
    {
        path: listLink.index,
        Element: <Accueil />,
    },
    {
        path: listLink.home,
        Element: <Accueil />,
    },
    {
        path: listLink.radio_,
        Element: <Radio />,
    },
    {
        path: listLink.tele_,
        Element: <Tele />,
    },
    {
        path: listLink.presse_,
        Element: <Presse />,
    },
    {
        path: listLink.journaux_,
        Element: <Journaux />,
    },
    {
        path: listLink.panier,
        Element: <Panier />,
    },
    {
        path: listLink.accompagnement,
        Element: <Accompagnement />,
    },
];

const homeRoute = [
    {
        path: listLink.index,
        Element: <PubContainer />,
    },
    {
        path: listLink.affichage,
        Element: <PubContainer />,
    },
    {
        path: listLink.carte,
        Element: <Carte />,
    },
    {
        path: listLink.media,
        Element: <Media />,
    },
];

const radioRoute = [
    {
        path: listLink.index,
        Element: <MediaDetail title={"Radios"} buttonName={"choisir cette radio"}/>,
    },
    {
        path: listLink.produit,
        Element: (
            <Produit title={"Radios"}
            link={"/radios/devis"}
            >
                <ProduitHeader
                    fitrstTitle={"Radios"}
                    firstContent={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                />
            </Produit>
        ),
    },
    {
        path: listLink.devis,
        Element: (
            <Devis title={"Kiff Radio FM"}>
                <FormDevis />
            </Devis>
        ),
    },
    {
        path: listLink.telecharger_devis,
        Element: (
            <Devis title={"Kiff Radio FM"}>
                <TelechargerDevis />
            </Devis>
        ),
    },
];

const teleRoute = [
    {
        path: listLink.index,
        Element: <MediaDetail title={"Télévision"} buttonName={"choisir cette télévision"}/>,
    },
    {
        path: listLink.produit,
        Element: (
            <Produit 
                title={"Les produits de la télévision BF1"}
                link={"/televisions/devis"}
                >
                <ProduitHeader
                    fitrstTitle={"BF1 TV"}
                    firstContent={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                />
            </Produit>
        ),
    },
    {
        path: listLink.devis,
        Element: (
            <Devis title={"BF1 TV"}>
                <FormDevis />
            </Devis>
        ),
    },
    {
        path: listLink.telecharger_devis,
        Element: (
            <Devis title={"BF1 TV"}>
                <TelechargerDevis />
            </Devis>
        ),
    },
];

const presseRoute = [
    {
        path: listLink.index,
        Element: <MediaDetail title={"Presse écrite"} buttonName={"choisir cette presse écrite"}/>,
    },
    {
        path: listLink.produit,
        Element: (
            <Produit 
                title={"Les produits de la presse écrite"}
                link={"/presse-ecrite/devis"}
                >
                <ProduitHeader
                    fitrstTitle={"Presse écrite"}
                    firstContent={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                />
            </Produit>
        ),
    },
    {
        path: listLink.devis,
        Element: (
            <Devis title={"Presse écrite"}>
                <FormDevis />
            </Devis>
        ),
    },
    {
        path: listLink.telecharger_devis,
        Element: (
            <Devis title={"Presse écrite"}>
                <TelechargerDevis />
            </Devis>
        ),
    },
];

const journauxRoute = [
    {
        path: listLink.index,
        Element: <MediaDetail title={"Journaux en ligne"} buttonName={"choisir ce journal en ligne"} />,
    },
    {
        path: listLink.produit,
        Element: (
            <Produit 
                title={"Les produits du journal en ligne"}
                link={"/journaux-en-ligne/devis"}
                >
                <ProduitHeader
                    fitrstTitle={"Journal en ligne"}
                    firstContent={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                />
            </Produit>
        ),
    },
    {
        path: listLink.devis,
        Element: (
            <Devis title={"Journal en ligne"}>
                <FormDevis />
            </Devis>
        ),
    },
    {
        path: listLink.telecharger_devis,
        Element: (
            <Devis title={"Journal en ligne"}>
                <TelechargerDevis />
            </Devis>
        ),
    },
];

const GetRoute = ({ list }) => {
    return (
        <Routes>
            {list.map(({ path, Element }, idx) => {
                return <Route path={path} element={Element} key={idx} />;
            })}
        </Routes>
    );
};

export { GetRoute, appRoute, homeRoute, radioRoute, teleRoute, presseRoute, journauxRoute};
