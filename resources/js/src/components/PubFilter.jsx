import FilterCollapse from "./FilterCollapse";
import DownArrow from "./imgs/DownArrow";
import Filter from "./imgs/Filter";
import InputField from "./InputField";

const PubFilter = () => {
    return (
        <div className="card shadow">
            <div className="card-header">
                <div className="d-flex">
                    <div className="me-auto">
                        <Filter /> <span className="fw-bold">Filtres</span>
                    </div>
                    <div>Effacer</div>
                </div>
            </div>
            <div className="card-body">
                <FilterCollapse id={"Cible"} name={"Cible"}>
                    <InputField type={"checkbox"} label={"Cible 1"} />
                    <InputField type={"checkbox"} label={"Cible 2"} />
                    <InputField type={"checkbox"} label={"Cible 3"} />
                </FilterCollapse>
                <FilterCollapse id={"Budget"} name={"Budget"}>
                    <InputField
                        type={"checkbox"}
                        label={"De 0 à 500 000 F CFA"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 500 000 F CFA à 1 million"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 1 million à 2 millions"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 1 million à 2 millions"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 1 million à 2 millions"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 1 million à 2 millions"}
                    />
                    <InputField
                        type={"checkbox"}
                        label={"De 1 million à 2 millions"}
                    />
                </FilterCollapse>
                <FilterCollapse id={"Categorie"} name={"Categorie"}>
                    <InputField type={"checkbox"} label={"Populaire"} />
                    <InputField type={"checkbox"} label={"Récent"} />
                </FilterCollapse>
                <FilterCollapse id={"Periodicite"} name={"Périodicité"}>
                    <InputField type={"checkbox"} label={"Mensuel"} />
                    <InputField type={"checkbox"} label={"Hebdomaire"} />
                    <InputField type={"checkbox"} label={"Trimestriel"} />
                    <InputField type={"checkbox"} label={"Semestriel"} />
                    <InputField
                        type={"checkbox"}
                        label={"Periodicité personnalisée"}
                    />
                </FilterCollapse>
                <FilterCollapse id={"Public"} name={"Public"}>
                    <InputField type={"checkbox"} label={"Hommes"} />
                    <InputField type={"checkbox"} label={"Femmes"} />
                    <InputField type={"checkbox"} label={"Enfants"} />
                </FilterCollapse>
                <FilterCollapse id={"Age"} name={"âge"}>
                    <InputField type={"checkbox"} label={"6 à 12 ans"} />
                    <InputField type={"checkbox"} label={"12 à 18 ans"} />
                    <InputField type={"checkbox"} label={"18 à 24 ans"} />
                </FilterCollapse>
                <FilterCollapse id={"Interet"} name={"Centre d'intérêts"}>
                    <InputField type={"checkbox"} label={"Centre 1"} />
                    <InputField type={"checkbox"} label={"Centre 1"} />
                    <InputField type={"checkbox"} label={"Centre 2"} />
                </FilterCollapse>
                <FilterCollapse id={"Regie"} name={"Régie publicitaire"}>
                    <InputField type={"checkbox"} label={"élite Régie"} />
                    <InputField type={"checkbox"} label={"Baobab"} />
                    <InputField type={"checkbox"} label={"Cauris"} />
                </FilterCollapse>
                <FilterCollapse id={"Emplacement"} name={"Emplacement"}>
                    <InputField
                        type={"select"}
                        label={"élite régie"}
                        options={["Tanghin", "Cissin", "Gougin"]}
                    />
                </FilterCollapse>
            </div>
        </div>
    );
};

export default PubFilter;
