import pub_card from "../../assets/imgs/pub_card.png";
import { URL } from "../../services/request";

const PubCardImg = ({image}) => {
    return (
        <span><img className="" width={"100%"} src={image ? URL+""+image: pub_card} alt="" /></span>

    );
};

export default PubCardImg;
