import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";

const DevisDash = () => {
    return (
        <>
            <ContentHeader 
                title={"Mes Devis"} 
                addBtn="Demander un devis"
            />
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>N° Devis</th>
                                <th>Date de la demande</th>
                                <th>Durée de la publicité</th>
                                <th>Estimation du Coût</th>
                                <th>État du devis</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10).keys()].map((data, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>ND-41578</td>
                                        <td>12/03/2023</td>
                                        <td>en jours, <br />
                                            semaines <br />
                                            ou mois</td>
                                        <td>
                                            500.000 FCFA
                                        </td>
                                        <td>en attente, <br /> 
                                            en cours, <br />
                                             accepté, <br />
                                             refusé</td>
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

export default DevisDash;
