
import { GetRoute, homeRoute } from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Accueil = () => {
    return (
        <>
            <Header />
            <Page>
                <Hero />
                <GetRoute list={homeRoute} />
            </Page>
        </>
    );
};

export default Accueil;
