import { URL } from "../services/request";
import ProduitIMG from "./imgs/ProduitIMG";
import Section from "./Section";

const ProduitHeader = ({
    fitrstTitle,
    firstContent,
    bg = "",
    image=""
}) => {
    return (
        <Section bg={bg}>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <p>
                            <img width="100px" src={URL+""+ image} alt="" />
                        </p>
                        <h2 className={"fw-bold text-40 "}>{fitrstTitle}</h2>
                        <p>{firstContent}</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProduitHeader;
