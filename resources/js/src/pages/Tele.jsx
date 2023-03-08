import { GetRoute, teleRoute } from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";

const Tele = () => {
    return (
        <>
            <Header />
            <Page>
                <GetRoute list={teleRoute}/>
            </Page>
        </>
    );
};

export default Tele;