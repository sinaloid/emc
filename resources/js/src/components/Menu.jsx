import { Link, NavLink } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { URL_ } from "../services/request";

const Menu = ({categories,medias,getProduitByMedia}) => {

    
    return (
        <div className="row">
            <div className="col-12 border-bottom pt-5">
                <div className="d-flex justify-content-center">
                    <div className="d-inline-block mx-auto">
                        <Link
                            to={listLink.index}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Derniers produits commandés
                        </Link>
                        {
                            /**
                             * <Link
                            to={listLink.media}
                            className="link text-uppercase fw-bold mx-4"
                        >
                            Média
                        </Link>
                             */
                        }
                        {
                            categories.map((categorie) =>{

                                return <Link
                                to={"/media-categorie/"+categorie.slug}
                                className="link text-uppercase fw-bold mx-4"
                            >
                                {categorie.name}
                            </Link>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="col-12 pt-3">
                <div className="d-flex justify-content-center p-2">
                    <div className="d-flex bg-gray p-2">
                    {
                        medias.map((data, idx) => {

                            return <div className="mx-2" onClick={e => getProduitByMedia(e,data.slug)}>
                                <img width={"64px"} src={data.image ? URL_+""+data.image: ""} alt="" />
                            </div>
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 col-lg-9 mx-auto py-5">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
        </div>
    );
};

export default Menu;
