import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";

const SupportPublicitaire = () => {
    return (
        <>
            <ContentHeader
                title={"Mes supports publicitaires "}
                firstBtn="Liste des offres"
                secondBtn="Liste des supports"
                addBtn="Ajouter un support"
            />

            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>Libellé</th>
                                <th>Catégorie</th>
                                <th>Status</th>
                                <th>Tarif</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10).keys()].map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>Paneau publicitaire</td>
                                        <td>Paneau</td>
                                        <td>
                                            {idx % 2 === 0 ? (
                                                <span className="badge text-bg-success">
                                                    En cours d'utilisation
                                                </span>
                                            ) : (
                                                <span className="badge text-bg-info">
                                                    Disponible actuelement
                                                </span>
                                            )}
                                        </td>
                                        <td>15.000 FCFA / Jour</td>
                                        <td className="text-center">
                                            <ActionButton />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SupportPublicitaire;
