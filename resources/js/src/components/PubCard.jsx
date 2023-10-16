import Button from "./Button";
import PubCardImg from "./imgs/PubCardImg";

import PubDash from "./imgs/PubDash";
import tv from "../assets/svg/tv.svg";

const PubCard = ({ data, setSelectedData }) => {
    const setModalData = (e) => {
        e.preventDefault();
        setSelectedData(data);
        console.log(data);
    };

    console.log(data)
    return (
        <div className="card p-0 shadow position-relative">
            <div className="px-2 mt-2 d-flex align-items-center bg-secondary position-absolute" style={{height:"20px"}}>
                <span className="text-white text-12 text-uppercase"> {data.media?.categorie_media?.name}</span>
            </div>
            <PubCardImg image={data.image} />
            <div className="text-center py-3">
                <h4 className="text-26" style={{padding:"0 30px"}}>{data.name}</h4>
                <span className="text-primary my-2 d-inline-block">
                    {data.price + " FCFA"}
                </span>{" "}
                <br />
                <Button
                    classe={"btn-pub"}
                    isModal={true}
                    idModal={"#addModal"}
                    callback={setModalData}
                >
                    <PubDash /> Ajouter au panier
                </Button>
            </div>
        </div>
    );
};

export default PubCard;
