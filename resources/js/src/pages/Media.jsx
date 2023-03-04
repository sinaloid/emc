import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import Map from "../components/Map";
import MediaCard from "../components/MediaCard";
import Section from "../components/Section";

const Media = () => {
    const imgs = [
        {
            img:RadioIMG,
            title:"Radios"
        },
        {
            img:TeleIMG,
            title:"Télévisions"
        },
        {
            img:PresseIMG,
            title:"Presse écrite"
        },
        {
            img:JournauxIMG,
            title:"Journaux en ligne"
        }, 
    ]
    return (
        <Section>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-md-12 order-2 order-md-1 mb-3">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
                            {imgs.map(({img, title}, idx) => {
                                return (
                                    <div className="col">
                                        <MediaCard  Img={img} title={title}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Media;
