import Hero from "../components/Hero";
import Banier from "../components/Banier";
import FAQ from "../components/FAQ";
import { GetRoute, homeRoute } from "../components/ListRoute";
import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";

const Accueil = () => {
    return (
        <>
            <Hero />
            <div className="row">
                <div className="col-12 border-bottom pt-5">
                    <div className="d-flex justify-content-center">
                        <div className="d-inline-block mx-auto">
                            <Link
                                to={listLink.carte}
                                className="link text-uppercase fw-bold mx-4"
                            >
                                Carte
                            </Link>
                            <Link
                                to={listLink.affichage}
                                className="link text-uppercase fw-bold mx-4"
                            >
                                Affichage
                            </Link>
                            <Link
                                to={listLink.media}
                                className="link text-uppercase fw-bold mx-4"
                            >
                                Média
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </p>
                </div>
            </div>
            <GetRoute list={homeRoute} />
            <Banier
                fitrstTitle={"Déjà plus de 200 Médias référencés sur e.m.c"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={"Vous avez un Media à référencer ?"}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={"référencer un média"}
                bg={"bg-gray"}
            />
            <Banier
                fitrstTitle={"Ils nous font confiance"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={"Souhaitez-vous un accompagnement sur-mesure  ?"}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={"Je souhaite un accompagnement sur-mesure"}
            />
            <Banier
                fitrstTitle={"EMC, comment ça marche?"}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={""}
                secondContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                buttonName={""}
                bg={"bg-gray"}
                hasImgs={false}
            />
            <FAQ />
        </>
    );
};

export default Accueil;
