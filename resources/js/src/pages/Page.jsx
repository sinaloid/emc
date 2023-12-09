import Hero from "../components/Hero";
import Banier from "../components/Banier";
import FAQ from "../components/FAQ";
import { Link, useNavigate } from "react-router-dom";
import { listLink } from "../utils/listLink";
import { useEffect } from "react";
import LoginModal from "../components/LoginModal";
import AccompagnementModal from "../components/AccompagnementModal";
import Footer from "../components/Footer";
import { BanierContent } from "../components/BanierContent";
import Button from "../components/Button";
import MediaIMG from "../components/imgs/MediaIMG";
import bf1 from "../assets/partenaires/bf1.png";
import le_pays from "../assets/partenaires/le_pays.png";
import minute from "../assets/partenaires/minute.bf.png";
import rtb from "../assets/partenaires/rtb.png";
import savane_fm from "../assets/partenaires/savane_fm.png";
import sidwaya from "../assets/partenaires/sidwaya.png";

const Page = ({ children }) => {
    const navigate = useNavigate();
    const logos = [bf1, le_pays, minute, rtb, savane_fm, sidwaya, bf1];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {children}

            <Banier bg={"bg-gray"}>
                <BanierContent
                    secondTitle={
                        "Ils sont partenaires et vendent leurs supports sur EMC."
                    }
                    content={""}
                ></BanierContent>

                <div className="col-12">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3"
                                key={idx}
                            >
                                <img
                                    key={"logo" + idx}
                                    width={"100px"}
                                    className="rounded-circle"
                                    src={data}
                                />
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={"Vous avez un support à référencer ?"}
                    titleCss={"fw-bold"}
                    content={
                        "Comme de nombreux éditeurs et régies publicitaires, référencez votre média sur EMC et vendez plus facilement."
                    }
                >
                    <Button
                        name={"référencer un média"}
                        classe="btn-secondary text-uppercase "
                        bg={"bg-gray"}
                        callback={() => {
                            navigate(listLink.referencer);
                        }}
                    />
                </BanierContent>
            </Banier>
            <Banier>
                <BanierContent
                    title={
                        "Grandes ou de taille moyenne, elles nous font confiance"
                    }
                    content={
                        "Quel que soit votre objectif marketing, vous trouverez sur EMC le média le plus adapté à vos besoins. Rejoignez-nous et laissez-vous guider par nos experts médias chevronnés."
                    }
                ></BanierContent>
                <div className="col-12">
                    {logos.map((data, idx) => {
                        return (
                            <span
                                className="d-inline-block me-4 mb-3"
                                key={idx}
                            >
                                <img
                                    key={"logo" + idx}
                                    width={"100px"}
                                    className="rounded-circle"
                                    src={data}
                                />
                            </span>
                        );
                    })}
                </div>
                <BanierContent
                    secondTitle={
                        "Souhaitez-vous un accompagnement sur-mesure  ?"
                    }
                    content={
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    }
                >
                    <button
                        className="btn btn-secondary text-uppercase"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(listLink.accompagnement);
                        }}
                    >
                        Je souhaite un accompagnement sur-mesure
                    </button>
                </BanierContent>
            </Banier>
            <Banier bg={"bg-gray1"}>
                <BanierContent
                    title={"EMC, comment ça marche ?"}
                    content={
                        "Grâce à EMC, lancer une campagne publicitaire devient accessible à tous. Nous offrons des espaces uniques à chaque éditeur ou régie publicitaire pour gérer ses supports. Vous souhaitez obtenir un devis, lancer une campagne publicitaire ou encore bénéficier d’un accompagnement sur mesure, vous êtes au bon endroit. EMC, c’est un processus en 3 temps :"
                    }
                ></BanierContent>
                <div className="col-12">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="bg-gray text-center position-relative pt-5 pb-4">
                                <div
                                    className="position-absolute w-100"
                                    style={{ left: "0", top: "-22px" }}
                                >
                                    <div className="mx-auto circle d-flex justify-content-center align-items-center">
                                        1
                                    </div>
                                </div>
                                <FirstStep />
                                <div className="w-100 pt-3 fw-bold px-4">
                                    Demande de devis
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-gray text-center position-relative pt-5 pb-4">
                                <div
                                    className="position-absolute w-100"
                                    style={{ left: "0", top: "-22px" }}
                                >
                                    <div className="mx-auto circle d-flex justify-content-center align-items-center">
                                        2
                                    </div>
                                </div>
                                <SecondStep />
                                <div className="w-100 pt-3 fw-bold px-4">
                                    Réception du devis & Paiement
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-gray text-center position-relative pt-5 pb-4">
                                <div
                                    className="position-absolute w-100"
                                    style={{ left: "0", top: "-22px" }}
                                >
                                    <div className="mx-auto circle d-flex justify-content-center align-items-center">
                                        3
                                    </div>
                                </div>
                                <ThreeStep />
                                <div className="w-100 pt-3 fw-bold px-4">
                                    Diffusion & Envoi des justificatifs de
                                    campagne
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Banier>
            {/**<FAQ /> */}
            <AccompagnementModal />
            <LoginModal />
            <Footer />
        </>
    );
};

const FirstStep = () => {
    return (
        <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M61.7535 13.042C63.7374 13.042 65.2804 13.6927 66.603 15.4279C67.9255 17.1631 68.146 19.3322 67.9255 21.2843L64.6191 43.6253C63.9578 47.9634 60.431 51 56.0224 51H18.9904C14.5818 51 10.8345 47.5296 10.3937 42.9746L7.30766 5.88416L2.2378 5.01655C0.694805 4.79964 -0.18691 3.49823 0.0335189 2.19681C0.253948 0.895388 1.57652 -0.189127 2.89909 0.0277757L11.0549 1.32919C12.1571 1.5461 13.0388 2.41371 13.2592 3.71513L13.9205 11.3067C13.9205 12.3913 14.8022 13.042 15.9044 13.042H61.7535ZM34.6408 24.3209C33.3182 24.3209 32.4365 25.4054 32.4365 26.49C32.4365 27.5745 33.5387 28.659 34.6408 28.659H54.6998C56.0224 28.659 56.9041 27.5745 56.9041 26.49C56.9041 25.4054 55.802 24.3209 54.6998 24.3209H34.6408ZM34.6408 36.4675C33.3182 36.4675 32.4365 37.552 32.4365 38.6365C32.4365 39.721 33.5387 40.8056 34.6408 40.8056H45.4418C46.7644 40.8056 47.6461 39.721 47.6461 38.6365C47.6461 37.552 46.544 36.4675 45.4418 36.4675H34.6408ZM55.5815 32.5632C55.5815 31.2618 56.6837 30.3942 57.7858 30.3942C58.888 30.3942 59.9901 31.4787 59.9901 32.5632C59.9901 33.8647 58.888 34.7323 57.7858 34.7323C56.6837 34.7323 55.5815 33.8647 55.5815 32.5632ZM26.9258 30.3942C25.6032 30.3942 24.7215 31.4787 24.7215 32.5632C24.7215 33.8647 25.8237 34.7323 26.9258 34.7323H51.6138C52.9364 34.7323 53.8181 33.6478 53.8181 32.5632C53.8181 31.2618 52.716 30.3942 51.6138 30.3942H26.9258Z"
                fill="#1F2E54"
            />
            <path
                d="M13 63C13 60.2917 15.2374 58 18.1461 58C21.0548 58 23.2922 60.2917 23.2922 63C23.2922 65.7083 21.0548 68 18.1461 68C15.4612 68 13 65.7083 13 63ZM51.7078 63C51.7078 60.2917 53.9452 58 56.8539 58C59.7626 58 62 60.2917 62 63C62 65.7083 59.7626 68 56.8539 68C53.9452 68 51.7078 65.7083 51.7078 63Z"
                fill="#E5282A"
            />
        </svg>
    );
};

const SecondStep = () => {
    return (
        <svg
            width="68"
            height="75"
            viewBox="0 0 68 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.0484 59.4194C12.0484 58.9304 12.0484 58.5525 12.0484 58.1523C12.0484 44.2589 12.0484 30.3655 12.0262 16.4721C12.0262 15.5384 12.2929 14.8493 12.9376 14.1602C17.1389 9.71429 21.3181 5.24616 25.475 0.778032C25.9863 0.222295 26.542 0 27.2978 0C40.1909 0.0222295 53.084 0 65.9771 0C67.4443 0 68 0.555737 68 2.00065C68 22.6518 68 43.2808 68 63.932C68 69.8673 63.2207 74.6466 57.2854 74.6466C41.747 74.6689 26.2308 74.6689 10.6924 74.6466C4.75711 74.6466 0.0222295 69.8451 0 63.9098C0 63.154 0 62.4204 0 61.6646C0 59.8418 0.466819 59.375 2.24518 59.375C5.15724 59.375 8.0693 59.375 11.0036 59.375C11.3148 59.4194 11.6038 59.4194 12.0484 59.4194ZM15.3161 17.4057C15.3161 31.477 15.3161 45.3926 15.3161 59.4194C15.694 59.4194 16.0275 59.4194 16.3387 59.4194C21.985 59.4194 27.609 59.4194 33.2553 59.4194C38.0347 59.4194 42.814 59.4194 47.5933 59.4194C49.2161 59.4194 49.7051 59.9085 49.7051 61.5757C49.7051 62.3759 49.6829 63.1984 49.7051 63.9987C49.8385 68.7558 53.951 72.1569 58.5969 71.3789C62.1981 70.7787 64.799 67.5554 64.799 63.6875C64.799 43.8588 64.799 24.0078 64.799 4.17914C64.799 3.89016 64.799 3.60118 64.799 3.28996C52.6394 3.28996 40.591 3.28996 28.476 3.28996C28.476 3.64564 28.476 3.95685 28.476 4.24583C28.476 7.95816 28.476 11.6927 28.476 15.405C28.476 16.8277 27.9425 17.3835 26.5198 17.3835C23.4743 17.3835 20.4067 17.3835 17.3612 17.3835C16.7166 17.4057 16.0497 17.4057 15.3161 17.4057ZM3.28996 62.6872C2.4897 67.3554 6.15757 71.5123 11.0925 71.5123C23.6522 71.5123 36.2118 71.5123 48.7715 71.5123C48.9938 71.5123 49.2383 71.49 49.6162 71.4456C47.2377 68.9114 46.3707 65.9327 46.5485 62.6649C32.0327 62.6872 17.6502 62.6872 3.28996 62.6872ZM25.2749 5.73521C22.5852 8.60281 20.051 11.337 17.4057 14.138C20.1399 14.138 22.6963 14.138 25.2749 14.138C25.2749 11.3593 25.2749 8.64727 25.2749 5.73521Z"
                fill="#E5282A"
            />
            <path
                d="M40.0795 48.4158C44.6588 48.4158 49.238 48.4158 53.8173 48.4158C54.1285 48.4158 54.4397 48.3936 54.7287 48.4602C55.5067 48.5936 56.018 49.1938 56.0403 49.9496C56.0625 50.7277 55.5957 51.3501 54.8399 51.5279C54.5509 51.5946 54.2397 51.6168 53.9285 51.6168C44.6588 51.6168 35.3891 51.6168 26.0971 51.6168C25.7637 51.6168 25.4302 51.5946 25.119 51.5057C24.3855 51.3056 23.8964 50.6387 23.9631 49.8829C24.0298 49.1049 24.4744 48.6159 25.2524 48.4602C25.5414 48.3936 25.8526 48.4158 26.1638 48.4158C30.8098 48.4158 35.4557 48.4158 40.0795 48.4158Z"
                fill="#E5282A"
            />
            <path
                d="M39.9903 28.6538C44.6363 28.6538 49.26 28.6538 53.906 28.6538C54.1728 28.6538 54.4617 28.6315 54.7285 28.676C55.5288 28.7871 56.0623 29.454 56.04 30.2543C56.04 31.0545 55.4621 31.6992 54.684 31.8103C54.4617 31.8326 54.2395 31.8326 54.0172 31.8326C44.6808 31.8326 35.3444 31.8326 26.0302 31.8326C25.8302 31.8326 25.6301 31.8326 25.4523 31.8326C24.5853 31.7659 23.9629 31.0768 23.9629 30.232C23.9629 29.4096 24.5631 28.7649 25.4078 28.676C25.6746 28.6537 25.9635 28.6538 26.2303 28.6538C30.8318 28.6538 35.4111 28.6538 39.9903 28.6538Z"
                fill="#E5282A"
            />
            <path
                d="M40.0799 41.7248C35.4784 41.7248 30.8547 41.7248 26.2532 41.7248C25.942 41.7248 25.6308 41.7248 25.3418 41.6803C24.5415 41.5692 23.9858 40.9245 23.9636 40.1465C23.9413 39.3685 24.4748 38.7016 25.2751 38.5682C25.4974 38.5237 25.7197 38.546 25.942 38.546C35.3228 38.546 44.7259 38.546 54.1067 38.546C55.2404 38.546 55.8851 39.0128 56.0407 39.8575C56.1963 40.8578 55.5072 41.7026 54.418 41.7248C53.062 41.7692 51.706 41.747 50.3277 41.747C46.9266 41.7248 43.5033 41.7248 40.0799 41.7248Z"
                fill="#E5282A"
            />
            <path
                d="M39.9252 21.9628C37.2577 21.9628 34.5901 21.9628 31.9226 21.9628C30.8778 21.9628 30.2554 21.496 30.0998 20.629C29.9219 19.7176 30.5666 18.8062 31.5669 18.784C37.191 18.7395 42.8373 18.7617 48.4613 18.784C49.3505 18.784 49.9729 19.5398 49.9507 20.3845C49.9285 21.2737 49.2394 21.9628 48.2613 21.9628C45.4826 21.9628 42.7039 21.9628 39.9252 21.9628Z"
                fill="#E5282A"
            />
        </svg>
    );
};

const ThreeStep = () => {
    return (
        <svg
            width="73"
            height="73"
            viewBox="0 0 73 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.5243 57.6787C11.9076 59.446 9.11444 60.3152 5.9685 59.3012C3.8222 58.6058 2.17572 57.302 1.05847 55.3608C-0.940823 51.942 -0.499803 45.8577 5.82149 42.9315C5.58628 41.0772 5.70388 40.9034 7.37976 39.9473C10.5551 38.1509 13.7599 36.3546 16.9058 34.5004C17.3762 34.2396 17.7878 33.834 18.0819 33.3994C24.903 24.0122 31.7241 14.625 38.5746 5.26672C39.0156 4.65829 39.0744 4.19472 38.604 3.64424C38.3982 3.38348 38.2512 3.09375 38.1042 2.80402C37.5456 1.761 37.722 0.775919 38.6334 0.254407C39.5154 -0.267105 40.5151 0.0226239 41.1619 1.03667C41.75 1.96381 42.2792 2.89094 42.8378 3.84705C51.0114 17.812 59.2144 31.7769 67.3879 45.7418C67.9466 46.669 68.4758 47.6251 69.005 48.5812C69.5636 49.6242 69.3284 50.6383 68.3876 51.1018C67.5055 51.5654 66.3883 51.3336 65.9767 50.2906C65.3004 48.5812 64.1244 48.5812 62.5661 48.755C55.451 49.5083 48.3065 50.1457 41.1913 50.8411C37.2515 51.2177 33.3118 51.5944 29.3426 51.971C29.1368 52 28.931 52.0579 28.4899 52.1449C29.9306 54.2309 31.2831 56.23 32.7237 58.2002C33.7528 59.6199 34.87 60.9526 36.0167 62.2854C38.457 65.1826 38.1042 69.065 35.1346 71.4408C32.1651 73.8166 28.2547 73.4689 25.9614 70.4557C23.1095 66.7182 20.4046 62.8938 17.6702 59.0983C17.3468 58.6348 17.1116 58.4899 16.4648 58.5479C15.8474 58.6058 15.2005 58.1712 14.5831 57.9684C14.5537 57.8815 14.5243 57.7946 14.5243 57.6787ZM41.0737 7.90325C40.8973 8.10606 40.7503 8.22195 40.6621 8.33784C34.1938 17.2035 27.7549 26.0982 21.316 34.9929C21.1102 35.2826 21.1102 35.8911 21.2866 36.2098C23.5211 40.1211 25.8144 43.9745 28.0783 47.8858C28.4017 48.4363 28.7251 48.6102 29.372 48.5522C33.2824 48.1176 37.1927 47.7699 41.1031 47.3933C48.13 46.7269 55.1276 46.0605 62.1545 45.3652C62.3897 45.3362 62.5955 45.2203 62.9189 45.1334C55.598 32.6751 48.3653 20.3326 41.0737 7.90325ZM9.90828 42.5259C12.2604 46.5241 14.5831 50.4934 16.9352 54.4917C19.7871 52.8692 22.4627 51.3336 25.1382 49.798C22.7567 45.7129 20.4634 41.8305 18.1407 37.8612C15.3475 39.4258 12.672 40.9323 9.90828 42.5259ZM25.1382 53.7963C23.5799 54.6945 21.904 55.6506 20.1988 56.6067C20.6398 57.302 20.9338 57.8525 21.316 58.345C23.8445 61.7638 26.3436 65.1826 28.9604 68.5435C29.96 69.8183 31.5183 69.8183 32.8707 68.7753C34.2232 67.7033 34.5172 66.1967 33.5764 64.9509C30.8126 61.2713 28.0195 57.6207 25.1382 53.7963ZM7.82078 45.9157C5.35107 46.9587 3.52818 48.4363 3.52818 51.2177C3.52818 53.3327 4.55723 54.8973 6.49772 55.7665C8.87923 56.8385 10.8785 55.9693 12.8778 54.5206C11.1725 51.6523 9.52606 48.813 7.82078 45.9157Z"
                fill="#E5282A"
            />
            <path
                d="M72.9996 26.096C72.6498 27.9733 72.3293 29.8507 71.8921 31.728C71.6007 32.9512 70.6681 33.4916 69.648 33.1787C68.628 32.8658 68.1617 31.984 68.5406 30.7894C71.4549 21.6586 65.4222 11.8167 56.067 9.85399C54.9012 9.59799 54.3183 8.74464 54.5806 7.74908C54.8429 6.75351 55.7172 6.29839 56.883 6.52595C64.8393 8.06197 71.6881 15.4576 72.5916 23.4222C72.679 24.3039 72.7664 25.1857 72.8538 26.0675C72.883 26.0675 72.9413 26.096 72.9996 26.096Z"
                fill="#E5282A"
            />
            <path
                d="M64.6833 25.4955C64.5023 26.6397 64.3472 27.8124 64.0886 28.9566C63.83 30.1008 63.0283 30.6728 62.1749 30.444C61.2698 30.1866 60.8043 29.2712 61.1146 28.0699C61.8904 24.8948 61.3474 22.063 59.5113 19.5173C58.4511 18.0299 57.0546 17.0288 55.3737 16.4853C54.9082 16.3423 54.4169 16.1706 54.0807 15.8274C53.5376 15.3125 53.4601 14.5688 53.7962 13.8823C54.1583 13.11 54.8048 12.7954 55.5806 12.9956C60.0285 14.2542 62.8731 17.372 64.1661 22.2061C64.3472 22.864 64.3989 23.5218 64.5023 24.2083C64.554 24.6374 64.554 25.0665 64.5799 25.4955C64.6316 25.4955 64.6575 25.4955 64.6833 25.4955Z"
                fill="#E5282A"
            />
        </svg>
    );
};

export default Page;
