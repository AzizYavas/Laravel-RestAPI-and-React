import axios from "axios";

export default axios.create({
    baseURL : "http://api.lara.test",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data'
      },
    withCredentials: true,
})