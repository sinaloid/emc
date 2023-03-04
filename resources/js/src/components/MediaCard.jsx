import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";

const MediaCard = ({Img, title}) => {
    
    return (
        <div className="card py-4">
            <div className="d-flex justify-content-center"><Img /></div>
            <div className="text-center py-3">
                <h4 className="text-40 fw-bold">{title}</h4>
                <span className="my-2 d-inline-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam mattis eleifend tellus, vel viverra ante tincidunt
                    placerat. Nulla mi dolor, massa pellentesque ut massa et,
                    fermentum hendrerit purus. Suspendisse lacinia neque vitae
                    metus viverra accumsan.
                </span>{" "}
                <br />
                <Button classe={"btn btn-secondary text-uppercase"}>
                    J'AI BESOIN DES SERVICES D'UNE {title}
                </Button>
            </div>
        </div>
    );
};

export default MediaCard;
