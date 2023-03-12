import ActionButton from "../components/ActionButton";
import ContentHeader from "./ContentHeader";

const Paiement = () => {
    return (
        <>
            <ContentHeader 
                title={"Mes paiements"} 
                addBtn="Faire un paiement"
            />
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>N* Devis</th>
                                <th>Montant</th>
                                <th>Date</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                [...Array(10).keys()].map((data, idx) => {
                                    return<tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>N-14857965</td>
                                    <td>500.000 FCFA</td>
                                    <td>12/03/2023</td>
                                    <td className="text-center">
                                        <ActionButton />
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Paiement;
