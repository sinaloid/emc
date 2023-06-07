import ActionButton from "../../components/ActionButton";

const TabCategorieFiltre = () => {
    return (
        <>
            <div className="table-responsive">
                <table class="table table-sm table-striped">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10).keys()].map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>nom du filter</td>
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

export default TabCategorieFiltre;
