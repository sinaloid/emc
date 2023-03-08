import { GetRoute, radioRoute } from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";

const Radio = () => {
    return (
        <>
            <Header />
            <Page>
                <GetRoute list={radioRoute}/>
            </Page>
        </>
    );
};

export default Radio;