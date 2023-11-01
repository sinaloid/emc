import Button from "./Button";
import MediaIMG from "./imgs/MediaIMG";
import Section from "./Section";

const Banier = ({
    fitrstTitle,
    firstContent,
    secondTitle,
    secondContent,
    fitstButtonName = "",
    buttonName = "",
    bg = "",
    hasImgs = true,
    callback = () =>{},
    btnProps,
    children
}) => {
    return (
        <Section bg={bg}>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    {children}
                </div>
            </div>
        </Section>
    );
};

export default Banier;
