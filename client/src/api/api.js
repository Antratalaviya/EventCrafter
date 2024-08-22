import config from "../config/config";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem, setItem } from "../utils/localStorageUtility";
import { CONSTS } from "../utils/consts";
import { authLogin } from "../store/AuthSlice";

export const api = createApi({
  reducerPath : "api",
  baseQuery : fetchBaseQuery({ 
    baseUrl : `${config.apiUrl}`,
    prepareHeaders : (headers)=>{
      const token = getItem(CONSTS.AUTH_TOKEN);

      if(token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    }
  },
),
  tagTypes : ['Auth'],
  endpoints : (builder)=>({
    register : builder.mutation({
      query : (userDetails) => ({ 
        url : "/sign-up", 
        method : 'POST', 
        body : userDetails 
      }),
    }),
    login : builder.mutation({
      query : ({email, password}) => ({ 
        url : "/sign-in", 
        method : "POST", 
        body : {email, password}
      }),
      onQueryStarted : async (args, {dispatch, queryFulfilled} )=>{
       try {
        const {data} = await queryFulfilled;
        setItem(CONSTS.AUTH_TOKEN, data.token);

        dispatch(authLogin({email}))
       } catch (error) {
        console.log("Login failed !! ", error);
       }
      },
      invalidatesTags : ['Auth']
    }),
    getUser : builder.query({
      query : ()=>({
        url : "/user",
        method : "GET"
      }),
      providesTags : ['Auth']
    })
  })
})

export const { useRegisterMutation, useLoginMutation} = api;

// class AuthService {
//   constructor() {
//     this.client = axios.create({
//       baseURL: `${config.apiUrl}/auth`,
//     });
//   }

//   async register({ email, name, dob, orgType, password, surname }) {
//     try {
//       let userData = await this.client.post("/sign-up", {
//         email,
//         name,
//         dob,
//         orgType,
//         password,
//         surname,
//       });
//       if (userData.data.success) {
//         await this.login({ email, password });
//       }
//       return userData.data.success;
//     } catch (error) {
//       return error;
//     }
//   }

//   async login({ email, password }) {
//     try {
//       let usertokes = await this.client.post("/sign-in", { email, password });
//       let token = usertokes.data.data;
//       if (token) {
//         localStorage.setItem("token", JSON.stringify(token));
//         axios.defaults.headers.common.Authorization = `Bearer ${token?.accessToken}`;
//       }

//       return; 
//     } catch (error) {
//       return error;
//     }
//   }

//   async getCurrentUser(){
//     try {
        
//     } catch (error) {
        
//     }
//   }
// }

// let authService = new AuthService();

// export default authService;
