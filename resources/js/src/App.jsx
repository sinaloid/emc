import React from "react";
import { appRoute, GetRoute, homeRoute } from "./components/ListRoute";

const App = () => {
    return (
        <>
            <GetRoute list={appRoute} />
            
        </>
    );
};

export default App;
