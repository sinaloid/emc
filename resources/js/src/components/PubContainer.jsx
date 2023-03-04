import { Link } from "react-router-dom";
import PubCard from "./PubCard";
import PubFilter from "./PubFilter";
import Section from "./Section";

const PubContainer = () => {
    return (
        <Section>
            <div className="col-12 border-bottom pt-5">
                <div className="d-flex justify-content-center">
                    <div className="d-inline-block mx-auto">
                        <Link
                            to={"#"}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Carte
                        </Link>
                        <Link
                            to={"#"}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Affichage
                        </Link>
                        <Link
                            to={"#"}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Média
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <div className="row">
                    <div className="col-md-8 order-2 order-md-1 mb-3">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {
                                [...Array(15).keys()].map((data, idx) =>{
                                    return <div className="col">
                                        <PubCard />
                                    </div>
                                })
                            }
                        </div>

                    </div>
                    <div className="col-md-4 order-1 order-md-2 mb-3">
                        <PubFilter />
                    </div>

                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto text-center text-primary">
                <Link to={"#"}>Voir plus</Link>
            </div>
        </Section>
    );
};

export default PubContainer;
