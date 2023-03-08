import React from "react";
import { Route, Routes } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Carte from "../pages/Carte";
import Devis from "../pages/Devis";
import Media from "../pages/Media";
import MediaDetail from "../pages/MediaDetail";
import Produit from "../pages/Produit";
import Radio from "../pages/Radio";
import Tele from "../pages/Tele";
import { listLink } from "../utils/listLink";
import PubContainer from "./PubContainer";

const routes = [
    {
        path: "/",
        role: [],
        element: React.lazy(() => import("../pages/Accueil")),
        children: [
            {
                path: listLink.affichage,
                role: [],
                element: React.lazy(() => import("../components/PubContainer")),
            },
            {
                path: listLink.carte,
                role: [],
                element: React.lazy(() => import("../pages/Carte")),
            },
            {
                path: listLink.media,
                role: [],
                element: React.lazy(() => import("../pages/Media")),
            },
        ],
    },
    {
        path: listLink.radio,
        role: [],
        element: React.lazy(() => import("../pages/Radio")),
    },
    {
        path: listLink.tele,
        role: [],
        element: React.lazy(() => import("../pages/Tele")),
    },
];

const withAuth = (Component) => {
    return (props) => {
      //if (!isAuthenticated()) {
        if (false) {
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    };
  };

const createRoute = ({ element, children, role, ...route }) => {
    const Component = role.length > 0 ? withAuth(element) : element;
    console.log(Component)
    return (
        <Route key={route.path} {...route} element={<Component />}>
            {children && <Routes>{children.map(createRoute)}</Routes>}
        </Route>
    );
};

const GetRoute = () => {

    return <Routes>{routes.map(createRoute)}</Routes>
};

export { GetRoute };
