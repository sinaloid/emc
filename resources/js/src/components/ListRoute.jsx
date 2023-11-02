import { Route, Routes } from "react-router-dom";
import Accompagnement from "../pages/ReferencerMedia";
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
import FormDevis from "./FormDevis";
import ProduitHeader from "./ProduitHeader";
import PubContainer from "./PubContainer";
import TelechargerDevis from "./TelechargerDevis";
import Dashboard from "../pages/Dashboard";
import Compte from "../pages/Compte";
import Paiement from "../dashboard/Paiement";
import DevisDash from "../dashboard/DevisDash";
import Administration from "../dashboard/Administration";
import MesMedias from "../dashboard/MesMedias";
import MesDocuments from "../dashboard/MesDocuments";
import ListeOffres from "../dashboard/medias/ListeOffres";
import ListeMedia from "../dashboard/medias/ListeMedia";
import DetailMedia from "../pages/MediaCategorieDetail";
import MesMessages from "../dashboard/MesMessages";
import TableauDeBord from "../dashboard/TableauDeBord";
import MesCampagnes from "../dashboard/MesCampagnes";
import MesPublicites from "../dashboard/MesPublicites";

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
        path: listLink.mediaByCategorie,
        Element: <Accueil />,
    },
    {
        path: listLink.detail_media,
        Element: <DetailMedia />,
    },
    {
        path: listLink.detail_media_produit,
        Element: (
            <Produit />
        ),
    },
    {
        path: listLink.devis,
        Element: (
            <Devis />
        ),
    },
    {
        path: listLink.telecharger_devis,
        Element: (
            <Devis />
        ),
    },
    //delete
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
        path: listLink.dashboard_,
        Element: <Dashboard />,
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
    {
        path: listLink.referencer,
        Element: <Accompagnement />,
    },
];

const radioRoute = [
    {
        path: listLink.index,
        Element: (
            <MediaDetail title={"Radios"} buttonName={"choisir cette radio"} />
        ),
    },
    {
        path: listLink.produit,
        Element: (
            <Produit title={"Radios"} link={"/radios/devis"}>
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

const mediaDetailRoute = [
    {
        path: listLink.index,
        Element: (
            <MediaDetail title={"Radios"} buttonName={"choisir cette radio"} />
        ),
    },
    {
        path: listLink.detail_media_produit,
        Element: (
            <Produit title={"Radios"} link={"/radios/devis"}>
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
        Element: (
            <MediaDetail
                title={"Télévision"}
                buttonName={"choisir cette télévision"}
            />
        ),
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
        Element: (
            <MediaDetail
                title={"Presse écrite"}
                buttonName={"choisir cette presse écrite"}
            />
        ),
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
        Element: (
            <MediaDetail
                title={"Journaux en ligne"}
                buttonName={"choisir ce journal en ligne"}
            />
        ),
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

const dashboardRoute = [
    {
        path: listLink.dashboard_tdb,
        Element: <TableauDeBord />,
    },
    {
        path: listLink.dashboard_demande,
        Element: <MesPublicites />,
    },
    {
        path: listLink.dashboard_campagne,
        Element: <MesCampagnes />,
    },
    {
        path: listLink.dashboard_devis,
        Element: <DevisDash />,
    },
    {
        path: listLink.dashboard_paiement,
        Element: <Paiement />,
    },
    {
        path: listLink.dashboard_support_,
        Element: <MesMedias />,
    },
    {
        path: listLink.dashboard_docs,
        Element: <MesDocuments />,
    },
    {
        path: listLink.dashboard_msgs,
        Element: <MesMessages />,
    },
    {
        path: listLink.dashboard_compte,
        Element: (
            <>
                <Compte />
            </>
        ),
    },
    {
        path: listLink.dashboard_admin,
        Element: <Administration />,
    },
    
];

const mediaRoute = [
    {
        path: listLink.index,
        Element: <ListeOffres />,
    },
    {
        path: listLink.dashboard_liste_media,
        Element: <ListeMedia />,
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

export {
    GetRoute,
    appRoute,
    homeRoute,
    radioRoute,
    teleRoute,
    presseRoute,
    journauxRoute,
    dashboardRoute,
    mediaRoute,
    mediaDetailRoute
};
