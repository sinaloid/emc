import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./pages/Accueil";


const App = () => {

    return(
        <>
        <Header />
        <Accueil />
        <div className=" row" style={{height:"90vh", width:"100%"}}>

        </div>
        <Footer />
        </>
    )
}

export default App;