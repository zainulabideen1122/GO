import axios from "axios";

const apiClient = (token)=>{
    return axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            'token': token
        }
    })
}

export default apiClient;