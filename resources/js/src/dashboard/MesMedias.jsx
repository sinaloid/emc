import { useFormik } from "formik";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import ContentHeader from "./ContentHeader";
import { useEffect, useRef, useState } from "react";
import request from "../services/request";
import endPoint from "../services/endPoint";
import { toast } from "react-toastify";
import { GetRoute, mediaRoute } from "../components/ListRoute";

const initCategorie ={

}
const MesMedias = () => {
    const close = useRef()
    const [datas,setDatas] = useState([])
    const [viewData,setViewData] = useState(initCategorie)
    const viewRef = useRef()

    useEffect(() =>{
        get()
    },[])
    const btnEditProps = {
        "data-bs-target":"#categorieMedia",
    };
   
    const formik = useFormik({
        initialValues: initCategorie,
        onSubmit: (values) => {
            console.log(values);
            if(values.slug !== ""){
                values._method = "put"
                update(values)
            }else{
                post(values)
            }
        },
    });

    const get = () => {
        request.get(endPoint.categorieMedias).then((res) =>{
            setDatas(res.data.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
    const post = async (values) =>{
        const response = await toast.promise(
            request.post(endPoint.categorieMedias,values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data)
                        close.current.click()
                        get()
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)
                        return data.response.data.errors;
                    },
                },
            }
        )
    }
    const view = async (values) =>{
        const response = await toast.promise(
            request.get(endPoint.categorieMedias+"/"+values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data.data.data)
                        setViewData(data.data.data)
                        viewRef.current.click()
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)
                        return data.response.data.message;
                    },
                },
            }
        )
    }

    const update = async (values) =>{
        const response = await toast.promise(
            request.post(endPoint.categorieMedias+"/"+values.slug,values),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data)
                        close.current.click()
                        get()
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)
                        return data.response.data.errors;
                    },
                },
            }
        )
    }

    const destroy = async (values) =>{
        const response = await toast.promise(
            request.delete(endPoint.categorieMedias+"/"+values.slug),
            {
                pending: "Veuillez patienté...",
                success: {
                    render({ data }) {
                        console.log(data)
                        close.current.click()
                        get()
                        return data.data.message;
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data)
                        return data.response.data.errors;
                    },
                },
            }
        )
    }
    
    const editData = (data) =>{
        console.log(data)
        formik.setFieldValue('slug',data.slug)
        formik.setFieldValue('name',data.name)
        formik.setFieldValue('description',data.description)
    }

    return (
        <>
            <GetRoute list={mediaRoute} />
        </>
    );
};

export default MesMedias;
