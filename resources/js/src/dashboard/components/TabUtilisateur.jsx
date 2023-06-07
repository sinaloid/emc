import ActionButton from "../../components/ActionButton";

const TabUtilisateur = () => {
    return (
        <>
            <div className="table-responsive">
                <table class="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Nom prénom</th>
                            <th>Contact</th>
                            <th>Statut</th>
                            <th>Etat du compte</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10).keys()].map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>image</td>
                                    <td>nom du filter</td>
                                    <td>+226 xx xx xx xx</td>
                                    <td>annonceur</td>
                                    <td>Actif / Inactif</td>
                                    <td className="text-center">
                                        <ActionButton />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TabUtilisateur;
