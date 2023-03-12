import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";

const Campagne = () => {
    return (
        <>
            <ContentHeader
                title={"Mes campagnes"}
                
            />

            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>Nom de la campagne</th>
                                <th>Type de publicité</th>
                                <th>Date de début - Date de fin</th>
                                <th>Durée</th>
                                <th>Status</th>
                                <th>coût total</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10).keys()].map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>Lorem ipsum ilaqp</td>
                                        <td>Paneau</td>
                                        <td>02/05/2023 - 06/05/2023</td>
                                        <td>04 jours</td>
                                        <td>
                                            {idx % 2 === 0 ? (
                                                <span className="badge text-bg-success">
                                                    Terminer
                                                </span>
                                            ) : (
                                                <span className="badge text-bg-info">
                                                    En cours
                                                </span>
                                            )}
                                        </td>
                                        <td>250.000 FCFA</td>
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

export default Campagne;
