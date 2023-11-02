import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import request from "../../services/request";
import endPoint from "../../services/endPoint";
import { toast } from "react-toastify";
import { GetRoute, mediaRoute } from "../../components/ListRoute";
import { pagination } from "../../services/function";

const initCategorie ={

}
const Medias = ({media}) => {
    
   

    return (
        <>
            <GetRoute list={mediaRoute} />
        </>
    );
};

export default Medias;
