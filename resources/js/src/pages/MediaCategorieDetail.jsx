import { GetRoute, mediaDetailRoute } from "../components/ListRoute";
import Page from "./Page";
import Header from "../components/Header";

const MediaCategorieDetail = () => {
    return (
        <>
            <Header />
            <Page>
                <GetRoute list={mediaDetailRoute}/>
            </Page>
        </>
    );
};

export default MediaCategorieDetail;