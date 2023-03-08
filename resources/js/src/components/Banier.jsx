import Button from "./Button";
import MediaIMG from "./imgs/MediaIMG";
import Section from "./Section";

const Banier = ({
    fitrstTitle,
    firstContent,
    secondTitle,
    secondContent,
    buttonName,
    bg = "",
    hasImgs = true,
}) => {
    return (
        <Section bg={bg}>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    {fitrstTitle != "" && (
                        <div className="col-12 col-md-10">
                            <h2 className={"fw-bold text-40 "}>{fitrstTitle}</h2>
                            <p>{firstContent}</p>
                        </div>
                    )}
                    {hasImgs && (
                        <div className="col-12">
                            {[...Array(10).keys()].map((data, idx) => {
                                return (
                                    <span
                                        className="d-inline-block me-4 mb-3"
                                        key={idx}
                                    >
                                        <MediaIMG />
                                    </span>
                                );
                            })}
                        </div>
                    )}
                    {secondTitle != "" && (
                        <div className="col-12 col-md-8 py-2">
                            <span className="text-18">{secondTitle}</span>
                            <p className="py-3">{secondContent}</p>
                            {buttonName !== "" && (
                                <Button
                                    name={buttonName}
                                    classe="btn-secondary text-uppercase"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Banier;
