import Button from "./Button";
import PubCardImg from "./imgs/PubCardImg";

import PubDash from "./imgs/PubDash";

const PubCard = ({data, setSelectedData}) => {

    const setModalData = (e) => {
        e.preventDefault()
        setSelectedData(data)
        console.log(data)
    }
    return (
        <div className="card p-0 shadow">
            <PubCardImg image={data.image}/>
            <div className="text-center py-3">
                <h4>{data.name}</h4>
                <span className="text-primary my-2 d-inline-block">Stade du 4 Août</span> <br />
                <Button classe={"btn-pub"} isModal={true} idModal={"#addModal"} callback={setModalData}>
                    <PubDash /> Ajouter au panier 
                </Button>
            </div>  
        </div>
    );
};

export default PubCard;
