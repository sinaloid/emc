import { GetRoute, presseRoute } from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";

const Presse = () => {
    return (
        <>
            <Header />
            <Page>
                <GetRoute list={presseRoute}/>
            </Page>
        </>
    );
};

export default Presse;