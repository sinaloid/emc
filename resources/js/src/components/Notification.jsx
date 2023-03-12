
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
                <i class="bi bi-bell-fill"></i>
            </div>
            <div
                class="dropdown-list dropdown-menu dropdown-menu-end py-0"
            >
                <h6 class="dropdown-header bg-primary text-white">Notifications</h6>
                <a class="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div class="me-3">
                        <div class="icon-circle bg-primary">
                            <i class="bi bi-info-circle-fill"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">Janvier 12, 2023</div>
                        <span class="font-weight-bold">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        </span>
                    </div>
                </a>
                <a class="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div class="me-3">
                        <div class="icon-circle bg-success">
                            <i class="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">December 7, 2019</div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    </div>
                </a>
                <a class="dropdown-item d-flex align-items-center border-bottom" href="#">
                    <div class="me-3">
                        <div class="icon-circle bg-warning">
                            <i class="fas fa-exclamation-triangle text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">December 2, 2019</div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    </div>
                </a>
                <a
                    class="dropdown-item text-center small text-gray-500"
                    href="#"
                >
                    Voir tous les notifications
                </a>
            </div>
        </div>
    );
};

export default Notification;
