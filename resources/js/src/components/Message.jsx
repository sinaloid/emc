import { Link } from "react-router-dom";
import { listLink } from "../utils/listLink";

const Message = () => {
    return (
        <div className="dropdown mx-2">
            <div
                type="button"
                className="dropdown-toggle1 d-flex text-14"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
            >
                <i class="bi bi-chat-dots-fill"></i>
            </div>
            <div class="dropdown-list dropdown-menu dropdown-menu-end shadow py-0"
                aria-labelledby="messagesDropdown">
                <h6 class="dropdown-header bg-primary text-white">
                    Messages
                </h6>
                {
                    [...Array(4).keys()].map((data, idx) =>{
                        return<Link key={"msg"+idx} className="dropdown-item d-flex align-items-center border-bottom" to="#">
                        <div class="dropdown-list-image me-3">
                            <img class="rounded-circle" 
                            width="32px"
                            src="https://source.unsplash.com/random/600x600/?person=1"
                                alt="..." />
                            <div class="status-indicator bg-success"></div>
                        </div>
                        <div class="font-weight-bold">
                            <div class="d-inline-block text-truncate" style={{maxWidth:"300px"}}>Bonjour à tous! Je me demande si vous pouvez m'aider avec le problème que j'ai eu.</div>
                            <div class="small text-gray-500"> Admin Sara · 58m</div>
                        </div>
                    </Link>
                    })
                }
                
                <a class="dropdown-item text-center small text-gray-500" href="#">Lire plus de messages</a>
            </div>
        </div>
    );
};

export default Message;
