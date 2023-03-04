import { Route, Routes } from "react-router-dom";
import Accueil from "../pages/Accueil";
import { ListLink } from "../utils/listLink";


const ListRoute = () => {

    const routeTab = [
        {
            path: ListLink.home,
            Element: Accueil,
        }
    ]

    return (
        <Routes>
            {
                routeTab.map(({path, Element}, idx) =>{

                    return <Route path={path} element={<Element />} key={idx}/>
                })
            }
        </Routes>
    )
}

export default ListRoute;