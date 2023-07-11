import { useEffect, useState } from "react";
import JournauxIMG from "../components/imgs/JournauxIMG";
import PresseIMG from "../components/imgs/PresseIMG";
import RadioIMG from "../components/imgs/RadioIMG";
import TeleIMG from "../components/imgs/TeleIMG";
import Map from "../components/Map";
import MediaCard from "../components/MediaCard";
import Menu from "../components/Menu";
import Section from "../components/Section";
import endPoint from "../services/endPoint";
import request from "../services/request";
import { listLink } from "../utils/listLink";
import endPointPublic from "../services/endPointPublic";

const Media = () => {
    const imgs = [
        {
            img:RadioIMG,
            title:"Radios",
            link:listLink.radio,
            linkText:"J'AI BESOIN DES SERVICES D'UNE RADIO"
        },
        {
            img:TeleIMG,
            title:"Télévisions",
            link:listLink.tele,
            linkText:"J'ai besoin dES SERVICES D'UNE Télé"
        },
        {
            img:PresseIMG,
            title:"Presse écrite",
            link:listLink.presse,
            linkText:"j'ai besoin dES SERVICES D'UNE presse écrite"
        },
        {
            img:JournauxIMG,
            title:"Journaux en ligne",
            link:listLink.journaux,
            linkText:"J'AI BESOIN DES SERVICES D'UN JOURNAL EN LIGNE"
        }, 
    ]
    const [datas,setDatas] = useState([])

    useEffect(() =>{
        get()
    },[])

    const get = () => {
        request.get(endPointPublic.categorieMedias).then((res) =>{
            console.log(res.data.data)
            setDatas(res.data.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
    return (
        <Section>
            <Menu />
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <div className="row">
                    <div className="col-md-12 order-2 order-md-1 mb-3">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
                            {datas.map((data, idx) => {
                                return (
                                    <div className="col" key={data.slug}>
                                        <MediaCard data={data}  Img={data.image} link={"/media-detail/"+data.slug} linkText={"J'AI BESOIN DES SERVICES"}/>
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
