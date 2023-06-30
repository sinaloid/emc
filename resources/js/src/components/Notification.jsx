
const Notification = () => {
    return (
        <div className="dropdown mx-2">
            <div
                type="button"
                className="dropdown-toggle1 d-flex text-14"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
            >
                <i className="bi bi-bell-fill"></i>
            </div>
            <div
                className="dropdown-list dropdown-menu dropdown-menu-end py-0"
            >
                <h6 className="dropdown-header bg-primary text-white">Notifications</h6>
                <a className="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div className="me-3">
                        <div className="icon-circle bg-primary">
                            <i className="bi bi-info-circle-fill"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">Janvier 12, 2023</div>
                        <span className="font-weight-bold">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        </span>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div className="me-3">
                        <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div className="me-3">
                        <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    </div>
                </a>
                <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                >
                    Voir tous les notifications
                </a>
            </div>
        </div>
    );
};

export default Notification;
