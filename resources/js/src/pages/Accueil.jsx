import Hero from "../components/Hero";
import Banier from "../components/Banier";
import PubContainer from "../components/PubContainer";
import FAQ from "../components/FAQ";

const Accueil = () => {
    return (
        <>
            <Hero />
            <PubContainer />
            <Banier
                fitrstTitle={"Déjà plus de 200 Médias référencés sur e.m.c"}
                firstContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                secondTitle={"Vous avez un Media à référencer ?"}
                secondContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                buttonName={"référencer un média"}
                bg={"bg-gray"}
            />
            <Banier
                fitrstTitle={"Ils nous font confiance"}
                firstContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                secondTitle={"Souhaitez-vous un accompagnement sur-mesure  ?"}
                secondContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                buttonName={"Je souhaite un accompagnement sur-mesure"}
            />
            <Banier
                fitrstTitle={"EMC, comment ça marche?"}
                firstContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                secondTitle={""}
                secondContent={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."}
                buttonName={""}
                bg={"bg-gray"}
                hasImgs={false}
                
            />
            <FAQ />
        </>
    );
};

export default Accueil;
