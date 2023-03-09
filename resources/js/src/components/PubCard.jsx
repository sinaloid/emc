import Button from "./Button";
import PubCardImg from "./imgs/PubCardImg";

import PubDash from "./imgs/PubDash";

const PubCard = () => {
    return (
        <div className="card p-0 shadow">
            <PubCardImg />
            <div className="text-center py-3">
                <h4>Affichage 2m²</h4>
                <span className="text-primary my-2 d-inline-block">Stade du 4 Août</span> <br />
                <Button classe={"btn-pub"} isModal={true} idModal={"#addModal"}>
                    <PubDash /> Ajouter au panier
                </Button>
            </div>
        </div>
    );
};

export default PubCard;
