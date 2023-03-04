import { Route, Routes } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Carte from "../pages/Carte";
import Media from "../pages/Media";
import { listLink } from "../utils/listLink";
import PubContainer from "./PubContainer";

const appRoute = [
    {
        path: listLink.index,
        Element: Accueil,
    },
    {
        path: listLink.home,
        Element: Accueil,
    }
]

const homeRoute = [
    {
        path: listLink.index,
        Element: PubContainer,
    },
    {
        path: listLink.affichage,
        Element: PubContainer,
    },
    {
        path: listLink.carte,
        Element: Carte,
    },
    {
        path: listLink.media,
        Element: Media,
    }
]



const GetRoute = ({list}) => {
    return (
        <Routes>
            {
                list.map(({path, Element}, idx) =>{

                    return <Route path={path} element={<Element />} key={idx}/>
                })
            }
        </Routes>
    )
}

export {
    GetRoute,
    appRoute,
    homeRoute
};