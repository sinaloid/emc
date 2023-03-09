import Map from "../components/Map";
import Menu from "../components/Menu";
import Section from "../components/Section"


const Carte = () => {

    return (
        <Section>
            <Menu />
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <Map />
            </div>
        </Section>
    )
}

export default Carte;