import axios from "axios";
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 export async function LoginUser({email,password}){
    try {
        const response = await axios.post(`${API_BASE_URL}/login`,{
            email,
            password
        })

     return response.data
    }
    catch (error){
       console.error('There was an error login in',error)
    }
   
 }

 export async function FetchUsers(currentPage){
        const cacheddata = localStorage.getItem(`users_page_${currentPage}`)
        if(cacheddata){
            return JSON.parse(cacheddata)
        }
        const response = await axios.get(`${API_BASE_URL}/users?page=${currentPage}`)
        localStorage.setItem(`users_page_${currentPage}`,JSON.stringify(response.data))
        return response.data
}
export async function DeleteUser(id){
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`)
    return response.data
}
export async function UpdateUser({id,first_name,last_name,email}) {
    try {
        console.log('updating user',id,first_name,last_name,email)
        const response = await axios.put(`${API_BASE_URL}/users/${id}`,
            {
                first_name,
                last_name,
                email
            }
    
        );
        console.log('api response',response.data)
        return {id,...response.data}
    }
    catch(error){
        console.error('Error updating user',error.response?.data || error.message)
        throw new error
    }
    
}