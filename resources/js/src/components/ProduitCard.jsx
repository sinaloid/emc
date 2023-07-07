import { Link } from "react-router-dom";
import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";

const ProduitCard = ({ data, classe }) => {
    return (
        <div className="card py-4 shadow">
            <div className="text-center py-3">
                <h4 className={"text-18 fw-bold " + classe}>{data.name}</h4>
                <span className="my-2 d-inline-block">
                   {data.description}
                </span>{" "}
                <br />
                <Link to={"/devis/"+data.slug} className={"btn btn-tertiary text-uppercase"}>
                    Demander un devis {data.name}
                </Link>
            </div>
        </div>
    );
};

export default ProduitCard;
