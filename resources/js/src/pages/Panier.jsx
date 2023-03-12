import Header from "../components/Header";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Delete from "../components/imgs/Delete";
import Footer from "../components/Footer";

const Panier = () => {
    return (
        <>
            <Header />
            <Section>
                <div className="col-12 col-md-11 mx-auto my-4 px-4">
                    <div className="col-md-6 bg-gray p-3">
                        {[...Array(4).keys()].map((data, idx) => {
                            return (
                                <div className="d-flex mb-3" key={idx}>
                                    <div className="me-auto">
                                        <h2 className="text-18">
                                            Affichage sur Panneau 4/3 à Tanghin
                                        </h2>
                                        <span>Du 13/06/2021 au 26/06/2021</span><br />
                                        <span className="text-primary">
                                            Modifier
                                        </span>
                                    </div>
                                    <div>
                                        <Delete />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="col-md-12 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary mb-3 me-1"
                        >
                            Demander un devis
                        </button>
                        <Link
                            to={listLink.index}
                            type="button"
                            className="btn btn-secondary mb-3"
                        >
                            Continuer mes achats
                        </Link>
                    </div>
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default Panier;
