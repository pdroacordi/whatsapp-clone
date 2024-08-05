import { BASE_API_URL } from "../../Config/api"
import { UserRequest } from "../../Request/UserRequest";
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";


export const register = async(data : UserRequest) => {
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signup`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data.user)
        })
        const response = await res.json();
        return { type: REGISTER, payload: response };
    }catch(error){
        console.error(error)
    }
}

export const login = (data : UserRequest) => async(dispatch : any) => {
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signin`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data.user)
        })
        const response = await res.json();
        dispatch({type:LOGIN, payload:response});
    }catch(error){
        console.error(error)
    }
}

export const currentUser = (data : UserRequest) => async(dispatch : any) => {
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/`,{
            method: 'GET',
            headers:{
                "Authorization": `Bearer ${data.token}`
            },
        })
        const response = await res.json();
        dispatch({type:REQ_USER, payload:response});
    }catch(error){
        console.error(error)
    }
}

export const searchUser = (req : UserRequest) => async(dispatch : any) => {
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/search?value=${req.query}&p=${req.page}`,{
            method: 'GET',
            headers:{
                "Authorization": `Bearer ${req.token}`
            },
        })
        const response = await res.json();
        dispatch({type:SEARCH_USER, payload:response});
    }catch(error){
        console.error(error)
    }
}

export const updateUser = (req : UserRequest) => async(dispatch : any) => {
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/${req.user.id}`,{
            method: 'PUT',
            headers:{
                "Authorization": `Bearer ${req.token}`
            },
            body:JSON.stringify(req.user)
        })
        const response = await res.json();
        dispatch({type:UPDATE_USER, payload:response});
    }catch(error){
        console.error(error)
    }
}