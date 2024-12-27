import axios from 'axios'
import config from '../config'
import URL from './url'

const api = {
    get: (requestData) => axios.get(URL[config.env].PROCTUR_API_URL+requestData.url),
    getAuth: (requestData) => axios.get(
        URL[config.env].PROCTUR_API_URL+requestData.url, 
        {
            headers: requestData.headers
        }
        
    ),
    post: (requestData) => axios.post(
        URL[config.env].PROCTUR_API_URL+requestData.url, 
        requestData.post
    ),
    postAuthHeader: (requestData) => axios.post(
        URL[config.env].PROCTUR_API_URL+requestData.url, 
        requestData.post, {...requestData.headers}
    ),
    postAuth: (requestData) => axios.post(
        URL[config.env].PROCTUR_API_URL+requestData.url, 
        requestData.post, 
        {
            headers: requestData.headers
        }
    )
}


export default api