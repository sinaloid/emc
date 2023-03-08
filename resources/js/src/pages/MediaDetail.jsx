import Banier from "../components/Banier";
import Button from "../components/Button";
import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import MediaCard from "../components/MediaCard";
import MediaCardDetail from "../components/MediaCardDetail";
import Menu from "../components/Menu";
import Section from "../components/Section";
import { listLink } from "../utils/listLink";

const MediaDetail = ({ title, buttonName }) => {
    const imgs = [
        {
            img: RadioIMG,
            title: "Radio",
            link: listLink.radio,
        },
        {
            img: TeleIMG,
            title: "Radio",
            link: listLink.tele,
        },
        {
            img: PresseIMG,
            title: "Radio",
            link: listLink.presse,
        },
        {
            img: JournauxIMG,
            title: "Radio",
            link: listLink.journaux,
        },
    ];
    return (
        <Section>
            <Banier
                fitrstTitle={title}
                firstContent={
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                }
                secondTitle={""}
                secondContent={""}
                buttonName={""}
                bg={"bg-gray"}
                hasImgs={false}
            />
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-md-12 order-2 order-md-1 mb-3">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {[...Array(9).keys()].map((idx) => {
                                return (
                                    <div className="col" key={idx}>
                                        <MediaCardDetail
                                            Img={RadioIMG}
                                            //title={title}
                                            link={listLink.produit}
                                            buttonName={buttonName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-12 py-2">
                        <span className="fw-bold text-40">
                            Vous n'avez pas trouvé la radio que vous cherchez ?
                        </span>
                        <p className="py-3">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem.
                        </p>
                        <Button
                            name={"CONTACTEZ-NOUS"}
                            classe="btn-secondary text-uppercase"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default MediaDetail;
