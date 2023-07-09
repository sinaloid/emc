import Header from "../components/Header";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Delete from "../components/imgs/Delete";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useEffect, useState } from "react";
import { getCampagne } from "../services/storage";
import { formatDate } from "../services/function";

const Panier = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getCampagneList();
    }, []);

    const getCampagneList = () => {
        const campagnes = getCampagne();
        setList(campagnes);
    };

    
    return (
        <>
            <Header />
            <Section>
                <div className="col-12 col-md-11 mx-auto my-4 px-4">
                    <div className="col-md-6 bg-gray p-3">
                        {list.map((data, idx) => {
                            return (
                                <div className="d-flex mb-3" key={idx}>
                                    <div className="me-auto">
                                        <h2 className="text-18">{data.name}</h2>
                                        <span>
                                            Du {formatDate(data.startDate)} au{" "}
                                            {formatDate(data.endDate)}
                                        </span>
                                        <br />
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
                        {list.length === 0 ? (
                            <p className="text-center fw-bold">Panier vide !</p>
                        ) : (
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
                        )}
                    </div>
                </div>
                <LoginModal />
            </Section>
            <Footer />
        </>
    );
};

export default Panier;
