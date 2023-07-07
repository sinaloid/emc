import { Link } from "react-router-dom";
import { URL } from "../services/request";

const MediaCardDetail = ({ data, Img, buttonName, link }) => {
    return (
        <div className="card py-4 shadow">
            <div className="d-flex justify-content-center">
                <img width="100px" src={URL+""+data.image} alt="" />
            </div>
            <div className="text-center py-3">
                <h2>{data.name}</h2>
                <span className="my-2 d-inline-block">
                    {data.description}
                </span>{" "}
                <br />
                <span className="my-2 d-inline-block">
                    <ul>
                        {data.media_tarifs?.map((tarif) => {
                            return <li key={tarif.slug}>{tarif.price + " FCFA"} / {tarif.period}</li>;
                        })}
                    </ul>
                </span>{" "}
                <br />
                <Link to={link} className={"btn btn-secondary text-uppercase"}>
                    {buttonName}
                </Link>
            </div>
        </div>
    );
};

export default MediaCardDetail;
