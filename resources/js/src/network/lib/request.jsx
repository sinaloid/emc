import endPoint from "../../utils/endpoint"
import apiClient from "../apiClient"

const ENDPOINT = endPoint.pub

const getRequest = (header, id = null) => {
    const endp = (slug != null && slug != undefined) ? `${URL}/${slug}` :URL
    return  apiClient.get(endp,header).then((res) => res)
} 

const postRequest = (data, header) => {
    return  request.post(ENDPOINT, data, header).then((res) => res)
} 

const putRequest = (id, data, header) => {
    return  request.put(`${ENDPOINT}/${slug}`, data, header).then((res) => res)
} 

const deleteRequest = (header) => {
    return  request.delete(`${ENDPOINT}/${slug}`,header).then((res) => res)
}