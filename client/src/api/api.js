import config from "../config/config";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem, removeItem, setItem } from "../utils/localStorageUtility";
import { CONSTS } from "../utils/consts";
import { authLogin } from "../store/AuthSlice";
import { postEvents } from "../store/EventSlice";

export const baseQueryIntercepter = (args) =>{
  const baseQuery = fetchBaseQuery(args);

  return async (args, api, options)=>{
    const result = await baseQuery(args, api, options);

    if(result?.error?.status === 401){
      removeItem(CONSTS.AUTH_TOKEN);
      location.replace('/sign-in');
    }
    return result
  }
}

export const api = createApi({
  reducerPath : "api",
  baseQuery : baseQueryIntercepter({ 
    baseUrl : `${config.apiUrl}`,
    prepareHeaders : (headers)=>{
      const token = getItem(CONSTS.AUTH_TOKEN);

      if(token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    },
  },
),
  tagTypes : ['Auth',"Notification"],
  endpoints : (builder)=>({
    register : builder.mutation({
      query : (userDetails) => ({ 
        url : "/auth/sign-up", 
        method : 'POST', 
        body : userDetails 
      }),
    }),
    login : builder.mutation({
      query : ({email, password}) => ({ 
        url : "/auth/sign-in", 
        method : "POST", 
        body : {email, password}
      }),
      onQueryStarted : async (args, {dispatch, queryFulfilled} )=>{
       try {
        const {data} = await queryFulfilled;
        setItem(CONSTS.AUTH_TOKEN, data.data.accessToken);
        dispatch(authLogin())
       } catch (error) {
        console.log("Login failed !! ", error);
       }
      },
      invalidatesTags : ['Auth'],
      providesTags:["Notification"]
    }),
    getUser : builder.query({
      query : ()=>({
        url : "/user/profile",
        method : "GET"
      }),
      onQueryStarted : async (args, {dispatch,  queryFulfilled} )=>{
        try {
         const {data} = await queryFulfilled;
          dispatch(authLogin({...data.data}))
        } catch (error) {
         console.log("user retrieve failed !! ", error);
        }
       },
      providesTags : ['Auth']
    }),
    getAllNotification : builder.query({
      query : ()=> ({
        url :"/user/notifications",
        method : "GET"
      }),
      invalidatesTags: ["Notification"],
    }),
    getAllEvents : builder.query({
      query : ({keyword, filter})=>{
        let queryString = '';

        if (keyword) {
          queryString += `keyword=${keyword}`;
        }

        if (filter) {
          Object.keys(filter).forEach((key) => {
            const value = filter[key];
            if (value) {
              queryString += `&${key}=${value}`;
            }
          });
        }

        return `/event?${queryString}`;
      },
       providesTags : ['Auth']
    }),
    getAllOwnEvents : builder.query({
      query : ({keyword, filter})=>{
        let queryString = '';

        if (keyword) {
          queryString += `keyword=${keyword}`;
        }

        if (filter) {
          Object.keys(filter).forEach((key) => {
            const value = filter[key];
            if (value) {
              queryString += `&${key}=${value}`;
            }
          });
        }

        return `/event/own?${queryString}`;
      },
      onQueryStarted : async (args, {dispatch,  queryFulfilled} )=>{
        try {
         const {data} = await queryFulfilled;
          dispatch(postEvents(data.data))
        } catch (error) {
         console.log("event retrieve failed !! ", error);
        }
       },
    }),
    likeEvent : builder.mutation({
      query : (eventId)=> ({
        url : `/event/like/${eventId}`,
        method : "POST"
      })
    }),
    saveEvent : builder.mutation({
      query : (eventId)=> ({
        url : `/event/save/${eventId}`,
        method : "POST"
      }),
   
    })
  })
})

export const { 
  useRegisterMutation, 
  useLoginMutation,
  useGetUserQuery,
  useGetAllEventsQuery,
  useLikeEventMutation,
  useSaveEventMutation,
  useGetAllNotificationQuery,
  useGetAllOwnEventsQuery,
} = api;

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
