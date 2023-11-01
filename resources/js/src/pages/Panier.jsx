import Header from "../components/Header";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";
import Delete from "../components/imgs/Delete";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { useContext, useEffect, useState } from "react";
import { getCampagne, setCampagne } from "../services/storage";
import { formatDate } from "../services/function";
import AddPuBModal from "../components/addPubModal";
import AddPubComfirmationModal from "../components/AddPubComfirmationModal";
import CampagneModal from "../components/CampagneModal";
import { AppContext } from "../services/context";

const Panier = () => {
    const [list, setList] = useState([]);
    const [selectedData, setSelectedData] = useState({});
    const [id, setId] = useState();
    const appCtx = useContext(AppContext);
    const { user, onUserChange } = appCtx;

    useEffect(() => {
        getCampagneList();
    }, []);

    const getCampagneList = () => {
        const campagnes = getCampagne();
        setList(campagnes);
        campagnes.length !== 0 && setSelectedData(campagnes[0]);
    };

    const deleteProduit = (id) => {
        console.log(id);
        const tab = list.filter((data, idx) => idx !== id && data);
        setList(tab);
        setCampagne(tab);
        onUserChange({
            ...user,
            panier: tab.length
        })
    };
    return (
        <>
            <Header />
            <Section>
                <div className="col-12 h-20">
                    <div className="row">
                        <div className="col-12 col-md-11 mx-auto my-4 px-4">
                            <div className="col-md-6 bg-gray p-3">
                                {list.map((data, idx) => {
                                    return (
                                        <div className="d-flex mb-3" key={idx}>
                                            <div className="me-auto">
                                                <h2 className="text-18 fw-bold">
                                                    {data.name}
                                                </h2>
                                                <span>Dates de diffusions</span>
                                                <br />
                                                {data.dates.map((date, idx) => {
                                                    return (
                                                        <span className="d-block ps-5">
                                                            {"Le " + date.date}
                                                        </span>
                                                    );
                                                })}
                                                <span
                                                    className="text-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#addModal"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setId(idx);
                                                        setSelectedData(data);
                                                    }}
                                                >
                                                    Modifier
                                                </span>
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteProduit(idx);
                                                }}
                                            >
                                                <Delete />
                                            </div>
                                        </div>
                                    );
                                })}
                                {list.length === 0 ? (
                                    <p className="text-center fw-bold">
                                        Panier vide !
                                    </p>
                                ) : (
                                    <div className="col-md-12 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-primary mb-3 me-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#campagne"
                                        >
                                            Demander un devis
                                        </button>
                                        <Link
                                            to={listLink.index}
                                            className="text-decoration-none text-primary"
                                        >
                                            <button type="button"
                                        className="btn btn-secondary mb-3">
                                            Continuer mes achats
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <LoginModal />
                        <CampagneModal refresh={getCampagneList} />
                        <AddPuBModal
                            data={selectedData}
                            idx={id}
                            update={true}
                            callBack={deleteProduit}
                            setList={setList}
                        />
                        <AddPubComfirmationModal data={selectedData} />
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default Panier;
