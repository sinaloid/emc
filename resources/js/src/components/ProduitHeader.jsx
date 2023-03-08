import ProduitIMG from "./imgs/ProduitIMG";
import Section from "./Section";

const ProduitHeader = ({
    fitrstTitle,
    firstContent,
    bg = "",
}) => {
    return (
        <Section bg={bg}>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <p>
                            <ProduitIMG />
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
