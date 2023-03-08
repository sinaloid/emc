import { Link } from "react-router-dom";

const MediaCardDetail = ({ Img, buttonName, link }) => {
    return (
        <div className="card py-4 shadow">
            <div className="d-flex justify-content-center">
                <Img />
            </div>
            <div className="text-center py-3">
                <span className="my-2 d-inline-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam mattis eleifend tellus, vel viverra ante tincidunt
                    placerat. Nulla mi dolor, pellentesque ut massa.
                </span>{" "}
                <br />
                <span className="my-2 d-inline-block">
                    <ul>
                        {[...Array(4).keys()].map((idx) => {
                            return <li key={idx}>100 000 Auditeurs /jour</li>;
                        })}
                    </ul>
                </span>{" "}
                <br />
                <Link to={link} className={"btn btn-secondary text-uppercase"}>
                    {buttonName}
                </Link>
            </div>
        </div>
    );
};

export default MediaCardDetail;
