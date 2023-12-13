import React from "react";

export const BanierContent = ({ title, secondTitle, content, children, titleCss }) => {
    return (
        <>
            <div className="col-12 col-md-10">
                {title && <h2 className={"fw-bold text-40"}>{title}</h2>}
                {secondTitle && (
                    <span className={"text-18 d-inline-block "+titleCss}>
                        {secondTitle}
                    </span>
                )}
                
            </div>
            <div className="col-12 col-md-12 py-20">
                <p className="pt-2 m-0">{content}</p>
            </div>
            <div className="col-12 col-md-8 mt-2">
                {children}
            </div>
        </>
    );
};
