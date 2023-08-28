import axios from "axios";

const request  = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3/',

    params:{
        key:"AIzaSyAVha1YR7Nrq_nr7qRZtQ5e94E-LMkD4yo",
    },

})

export default request;