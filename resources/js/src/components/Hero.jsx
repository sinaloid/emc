import Search from "./imgs/Search";
import Section from "./Section";

const Hero = () => {
    return (
        <Section bg="bg-primary">
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <h1 className="text-white text-40 text-center fw-bold">
                    E.M.C est une plateforme de vente des services des média.
                </h1>
                <p className="text-white text-22 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                </p>
                <div className="row mt-5">
                    <div className="col-10 mx-auto">
                        <div class="input-group mb-3">
                        <select
                                className="input-group-text"
                                >
                                    <option>Filtrer par catégorie</option>
                                    {
                                        [...Array(11).keys()].map((data, idx) => {
                                            return <option key={idx} value={data}>catégorie {data}</option>
                                        })
                                    }
                                </select>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Amount (to the nearest dollar)"
                            />
                            <span class="input-group-text btn-primary">
                                <Search />
                            </span>
                        </div>
                    </div>
                    <div className="col-8 mx-auto">
                        <div className="d-flex text-white">
                            <div className="me-auto">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>0% de commission</span>
                            </div>
                            <div>
                                <i class="bi bi-check-circle-fill"></i>
                                <span>0% de commission</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
