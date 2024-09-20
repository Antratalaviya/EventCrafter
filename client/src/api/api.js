import config from "../config/config";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem, removeItem, setItem } from "../utils/localStorageUtility";
import { CONSTS } from "../utils/consts";
import { authLogin, authLogout } from "../store/AuthSlice";
import { setClientSecret } from "../store/GlobalSlice";

export const baseQueryIntercepter = (args) => {
  const baseQuery = fetchBaseQuery(args);

  return async (args, api, extraOptions) => {
    let result;

    try {
      result = await baseQuery(args, api, extraOptions);

      if (result?.error?.status === 401) {
        const refreshToken = getItem(CONSTS.REFRESH_TOKEN);

        if (!refreshToken) {
          api.dispatch(authLogout());
          location.replace('/sign-in');
          return result;
        }
        const refreshResult = await baseQuery(
          {
            url: `/auth/refresh`,
            method: 'POST',
            body: { refreshToken }
          },
          api,
          extraOptions
        );

        console.log('Refresh Result:', refreshResult);

        if (refreshResult?.data) {
          setItem(CONSTS.ACCESS_TOKEN, refreshResult.data.data.accessToken);
          setItem(CONSTS.REFRESH_TOKEN, refreshResult.data.data.refreshToken);

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authLogout());
          location.replace('/sign-in');
        }
      }
    } catch (error) {
      console.error('Error in baseQueryIntercepter:', error);
    }
    return result;
  };
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryIntercepter({
    baseUrl: `${config.apiUrl}`,
    prepareHeaders: (headers) => {
      const token = getItem(CONSTS.ACCESS_TOKEN);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    },
  },
  ),
  tagTypes: ['Auth', "Notification", "Refresh", "EventUpdate"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/sign-up",
        method: 'POST',
        body: userDetails
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { email, password }
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          setItem(CONSTS.ACCESS_TOKEN, data.data.accessToken);
          setItem(CONSTS.REFRESH_TOKEN, data.data.refreshToken);
          dispatch(authLogin())
        } catch (error) {
          console.log("Login failed !! ", error);
        }
      },
      invalidatesTags: ['Auth', "Notification"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "PATCH"
      })
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET"
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(authLogin({ ...data.data }))
        } catch (error) {
          console.log("user retrieve failed !! ", error);
        }
      },
      providesTags: ['Auth']
    }),
    getAllUser: builder.query({
      query: ({ keyword }) => {
        let queryString = '';

        if (keyword) {
          queryString += `?keyword=${keyword}`;
        }
        return `/user${queryString}`;
      },
    }),
    getAllNotification: builder.query({
      query: () => ({
        url: "/user/notifications",
        method: "GET"
      }),
      providesTags: ["Notification"],
    }),
    getAllEvents: builder.query({
      query: ({ keyword, filter }) => {
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
      providesTags: ['Auth', "EventUpdate"]
    }),
    getFullEvent: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}`,
        method: 'GET'
      })
    }),
    getAllOwnEvents: builder.query({
      query: ({ keyword, filter }) => {
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
      providesTags: ["EventUpdate"]
    }),
    likeEvent: builder.mutation({
      query: (eventId) => ({
        url: `/event/like/${eventId}`,
        method: "POST"
      }),
      invalidatesTags: ["EventUpdate"]
    }),
    saveEvent: builder.mutation({
      query: (eventId) => ({
        url: `/event/save/${eventId}`,
        method: "POST"
      }),
      invalidatesTags: ["EventUpdate"]
    }),
    getAllSendParticipants: builder.query({
      query: (eventId) => ({
        url: `/event/send/invitations/${eventId}`,
        method: "GET"
      }),
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/event",
        method: "POST",
        body
      }),
    }),
    getFullEvent: builder.query({
      query: (eventId) => ({
        url: `/event/${eventId}`,
        method: "GET"
      }),
    }),
    sendInvitation: builder.mutation({
      query: ({ eventId, userId }) => ({
        url: '/event/invite',
        method: 'POST',
        body: {
          eventId,
          recipientId: userId
        }
      })
    }),
    getAllAvatars: builder.query({
      query: () => ({
        url: "/avatar",
        method: "GET"
      })
    }),
    getSavedEvents: builder.query({
      query: () => ({
        url: "/user/saved",
        method: "GET"
      }),
      providesTags: ["EventUpdate"]
    }),
    getLikedEvents: builder.query({
      query: () => ({
        url: "/user/liked",
        method: "GET"
      }),
      providesTags: ["EventUpdate"]
    }),
    createCheckoutSession: builder.mutation({
      query: ({ amount, description, quantity, name }) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: {
          amount: amount,
          description: description,
          quantity: quantity,
          name: name,
        }
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("data", data)
          dispatch(setClientSecret(data.data.client_secret))
        } catch (error) {
          console.log("client secret failed !! ", error);
        }
      },
    }),
    sessionStatus: builder.mutation({
      query: ({ session_id }) => ({
        url: `/payment/session-status?session_id=${session_id}`,
        method: 'GET'
      })
    }),
  })
})
// /send/invitations/:eventId
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useGetAllEventsQuery,
  useLikeEventMutation,
  useSaveEventMutation,
  useGetAllNotificationQuery,
  useGetAllOwnEventsQuery,
  useGetFullEventQuery,
  useGetAllUserQuery,
  useGetAllSendParticipantsQuery,
  useCreateEventMutation,
  useSendInvitationMutation,
  useGetAllAvatarsQuery,
  useGetSavedEventsQuery,
  useGetLikedEventsQuery,
  useLogoutMutation,
  useCreateCheckoutSessionMutation,
  useSessionStatusMutation,
} = api;
