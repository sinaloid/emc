import axios from 'axios';

export const URL = "https://emc.edic-municipalities.com/"
//export const URL = "http://127.0.0.1:8000/api/"

const request = axios.create({
    baseURL: URL+"api/",
    headers: {
        'Accept':'application/json',
    },
});



export default request