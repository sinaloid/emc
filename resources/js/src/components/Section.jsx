import React from "react";


const Section = ({children, bg = "bg-white"}) => {

    return (
        <div className={"row " + bg}>
            {
                children
            }
        </div>
    )
}

export default Section