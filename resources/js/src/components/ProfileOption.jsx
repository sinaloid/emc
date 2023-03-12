import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";

const ProfileOption = () => {

    const navigate = useNavigate()
    return (
        <div className="dropdown">
            <div
                type="button"
                className="d-flex text-14"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
            >
                <div className="d-none d-md-block" style={{ lineHeight: "100%" }}>
                    <span className="fw-bold text-14 d-block m-0 p-0">
                        Traore Ali
                    </span>
                    <span className="text-14">Type de compte</span>
                </div>
                <div className="ms-2">
                    <img
                        className="rounded-circle"
                        width="32px"
                        src="https://source.unsplash.com/random/600x600/?person=1"
                        alt=""
                    />
                </div>
            </div>
            <ul className="dropdown-menu dropdown-menu-start text-14">
                <li>
                    <Link
                        to={listLink.dashboard_compte}
                        className="dropdown-item"
                        type="button"
                    >
                        <i class="bi bi-person-fill"></i> Profile
                    </Link>
                </li>
                <li>
                    <button
                        className="dropdown-item text-danger"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                    >
                        <i class="bi bi-x-circle-fill"></i> Me déconnecter
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ProfileOption;
