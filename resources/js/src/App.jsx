import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { appRoute, GetRoute, homeRoute } from "./components/ListRoute";
import Accueil from "./pages/Accueil";

const App = () => {
    return (
        <>
            <GetRoute list={appRoute} />
            
        </>
    );
};

export default App;
