import axios from "axios";
class Api{
     static async apiCall(url, data = '', reqMethod ='get', auth = false){
        const token = localStorage.getItem('token')

        const headers = {
            'Content-Type': 'application/json', // Example content type
          };
          if(auth){
            headers.Authorization = `Bearer ${token}` // Example authorization token
          }

          const instance = axios.create({
            headers: headers,
          })
          const res = await instance.put(url, data)
          return res
    }
}
export default Api