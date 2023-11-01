import React from "react";

export const BanierContent = ({ title, secondTitle, content, children }) => {
    return (
        <>
            <div className="col-12 col-md-10">
                {title && <h2 className={"fw-bold text-40"}>{title}</h2>}
                {secondTitle && (
                    <span className="text-18 d-inline-block">
                        {secondTitle}
                    </span>
                )}
            </div>
            <div className="col-12 col-md-12 py-2">
                <p className="pt-2">{content}</p>
            </div>
            <div className="col-12 col-md-8">
                {children}
            </div>
        </>
    );
};
