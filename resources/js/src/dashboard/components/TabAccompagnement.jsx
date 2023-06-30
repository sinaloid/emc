import ActionButton from "../../components/ActionButton";

const TabAccompagnement = ({setBtnName = () => {}}) => {

    setBtnName("")
    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Nom prénom</th>
                            <th>Contact</th>
                            <th>Demande</th>
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
                                    <td>Traitée / en attente</td>
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

export default TabAccompagnement;
