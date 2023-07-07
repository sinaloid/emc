import DownArrow from "./imgs/DownArrow";

const FilterCollapse = ({children, id, name}) => {
    return (
        <div id={"accordion"+id}>
            <div className="row border-bottom">
                <div className="col-12">
                    <span
                        className="btn d-flex px-0"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + id}
                    >
                        <span className="fw-bold me-auto text-capitalize">{name}</span>
                        <span>
                            <DownArrow />
                        </span>
                    </span>
                </div>
                <div
                    id={"collapse" + id}
                    className="collapse show col-12"
                    data-bs-parent={"#accordion"+id}
                >
                   {
                    children
                   }
                </div>
            </div>
        </div>
    );
};

export default FilterCollapse;