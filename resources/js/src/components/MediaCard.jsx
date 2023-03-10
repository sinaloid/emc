import { Link } from "react-router-dom";
import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";

const MediaCard = ({Img, title, link, linkText}) => {
    
    return (
        <div className="card py-4 shadow">
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
                <Link to={link} className={"btn btn-secondary text-uppercase"}>
                    {linkText}
                </Link>
            </div>
        </div>
    );
};

export default MediaCard;
