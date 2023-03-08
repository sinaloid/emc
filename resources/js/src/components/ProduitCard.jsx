import { Link } from "react-router-dom";
import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";

const ProduitCard = ({ Img, title, link, classe }) => {
    return (
        <div className="card py-4 shadow">
            <div className="text-center py-3">
                <h4 className={"text-18 fw-bold " + classe}>{title}</h4>
                <span className="my-2 d-inline-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam mattis eleifend tellus, vel viverra ante tincidunt
                    placerat.
                </span>{" "}
                <br />
                <Link to={link} className={"btn btn-tertiary text-uppercase"}>
                    Demander un devis {title}
                </Link>
            </div>
        </div>
    );
};

export default ProduitCard;
