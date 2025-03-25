import axios from "axios";

const commonAPI = async(httpMethod,url,reqbody,reqHeader)=>{
       const reqConfig ={
           method:httpMethod,
           url,
           data:reqbody,
           headers:reqHeader? reqHeader:{"Content-Type":"application/json"}
       }
       return axios(reqConfig).then(res=>{
        return res
       }).catch(error=>{
        return error
       })

}
export default commonAPI