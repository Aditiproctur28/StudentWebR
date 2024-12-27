import axios from 'axios'
import config from '../config'
import URL from './url'

import { rootstore } from "../redux/store";
let state = rootstore.getState();

const api = {
    get: (url) => axios.get(URL[config.env].PROCTUR_API_URL + url),
    getAuth: (request) => axios.get(
        URL[config.env].PROCTUR_API_URL + request.url,
        {
            headers: { "Authorization": request.token, "Content-Type": "application/json" , "Source": "WEB"}
        }
    ),
    getCustomAuth: (request) => axios.get(
        URL[config.env].CUSTOM_PRODUCT_URL + request.url,
        {
            headers: { ...request.headers}
        }
    ),
    getAuthExamW: (request) => axios.get(
        URL[config.env].EXAMDESK_API_URL_2 + request.url,
        {
            headers: { "Authorization": request.token, "Content-Type": "application/json", "Source": "WEB" }
        }
    ),
    getOther: (request) => axios.get(
        URL[config.env].PROCTUR_API_URL + request.url,
        {
            headers: { ...request.headers, "Content-Type": "application/json" , "Source": "WEB"}
        }
    ),
    getAuthVideo: (request) => axios.get(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.headers
    ),
    post: (request) => axios.post(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data
    ),
    postAuth: (request) => axios.post(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data,
        {
            headers: { Authorization: request.token , "Source": "WEB"}
        }
    ),
   

    postAuthExamW: (request) => axios.post(
        URL[config.env].EXAMDESK_API_URL_2 + request.url,
        request.data,
        {
            headers: { Authorization: request.token, "Source": "WEB" }
        }
    ),
    postOther: (request) => axios.post(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data,
        {
            headers: { ...request.headers, }
        }
    ),
    put: (request) => axios.put(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data
    ),
    putAuth: (request) => axios.put(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data,
        {
            headers: { Authorization: request.token , "Source": "WEB" }
        }
    ),
    putOther: (request) => axios.put(
        URL[config.env].PROCTUR_API_URL + request.url,
        request.data,
        {
            headers: { ...request.headers, "Content-Type": "application/json"  , "Source": "WEB"}
        }
    )
}


export default api