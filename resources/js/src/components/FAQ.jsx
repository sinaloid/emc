import { Link } from "react-router-dom";
import Section from "./Section";

const FAQ = () => {
    return (
        <Section>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <h2 className="fw-bold text-40">
                        Les questions les plus fréquemment posées
                        </h2>
                        <p>
                            <Link to={"#"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ?</Link> <br />
                            <Link to={"#"}>Suspendisse maximus magna in volutpat sagittis. Quisque pulvinar ?</Link> <br />
                            <Link to={"#"}>Vivamus vel augue ipsum. integer porttitor ac lectus a tempor ?</Link> <br />
                            <Link to={"#"}>Souhaitez-vous un accompagnement sur-mesure  ?</Link> <br />
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FAQ;
