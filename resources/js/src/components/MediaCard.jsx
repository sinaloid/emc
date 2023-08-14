import { Link } from "react-router-dom";
import Button from "./Button";
import RadioIMG from "./imgs/RadioIMG";
import { URL } from "../services/request";

const MediaCard = ({data, Img, title, link, linkText}) => {
    
    return (
        <div className="card py-4 shadow">
            <div className="d-flex justify-content-center">
                <img src={URL+""+data.image} alt="" />
            </div>
            <div className=" p-3">
                <h4 className="text-40 fw-bold text-center">{data.name}</h4>
                <span className="my-2 d-inline-block">
                    {data.description}
                </span>{" "}
                <br />
                <div className="d-flex justify-content-center">
                <Link to={link} className={"btn btn-secondary text-uppercase"}>
                    {linkText}
                </Link>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;
