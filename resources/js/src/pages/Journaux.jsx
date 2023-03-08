import { GetRoute, journauxRoute} from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";

const Journaux = () => {
    return (
        <>
            <Header />
            <Page>
                <GetRoute list={journauxRoute}/>
            </Page>
        </>
    );
};

export default Journaux;