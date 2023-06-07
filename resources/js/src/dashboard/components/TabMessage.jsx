import ActionButton from "../../components/ActionButton";

const TabMessage = () => {
    return (
        <>
            <div className="table-responsive">
                <table class="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Auteur du Message</th>
                            <th>Type de compte</th>
                            <th>Message</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10).keys()].map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>nom de l'auteur</td>
                                    <td>Annonceur</td>
                                    <td>Lorem ipsum ilaqp</td>
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

export default TabMessage;
