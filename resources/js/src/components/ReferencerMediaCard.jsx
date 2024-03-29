import { Link } from "react-router-dom";
import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";

const ReferencerMediaCard = ({ description, avantage, title = "", prix, link, linkText, btn }) => {
    return (
        <div className="card shadow">
            <div className="card-header bg-primary">
                <h2 className="text-white text-18 text-center">{title}</h2>
            </div>
            <div className="py-3 mx-auto px-2">
                <span className="my-2 d-inline-block">
                    {
                        description
                    }
                </span>{" "}
                <p className="text-40 fw-bold text-center py-2">
                    {prix} <sup>CFA</sup>
                </p>
                <p>
                    {
                        avantage
                    }
                </p>
                <div className="d-flex justify-content-center">
                    <Link
                        to={link}
                        className={"btn text-uppercase " + btn}
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReferencerMediaCard;
