import config from "../config/config";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem, removeItem, setItem } from "../utils/localStorageUtility";
import { CONSTS } from "../utils/consts";
import { authLogin, authLogout } from "../store/AuthSlice";
import { setClientSecret } from "../store/GlobalSlice";
import { setSocketConnection } from "../store/ChatSlice";

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
  tagTypes: ['Auth', "Notification", "Refresh", "EventUpdate", "Invitation", "Connection", "Users", "Message", "Chat"],
  endpoints: (builder) => ({
    /************************************************************* Auth APIs ************************************************************** */
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
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setSocketConnection(""))
        } catch (error) {
          console.log("Login failed !! ", error);
        }
      },
    }),
    sendOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { email }
      })
    }),
    verifyOtp: builder.mutation({
      query: ({ otp, email }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { otp, email }
      })
    }),
    /************************************************************* User APIs ************************************************************** */
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
    getUserById: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET"
      }),
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
    readNotification: builder.mutation({
      query: () => ({
        url: "/user/notifications/read",
        method: "POST"
      }),
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
    updateAvatar: builder.mutation({
      query: ({ avatar }) => ({
        url: "/user/edit/avatar",
        method: "PUT",
        body: {
          avatar
        }
      }),
      invalidatesTags: ["Auth"]
    }),
    updateProfileImage: builder.mutation({
      query: ({ profileImg }) => ({
        url: "/user/edit/profile-image",
        method: "PUT",
        body: {
          profileImg
        }
      }),
      invalidatesTags: ["Auth"]
    }),
    updateProfile: builder.mutation({
      query: ({ name, surname, postcode, orgName, dob }) => ({
        url: "/user/edit/profile",
        method: "PUT",
        body: {
          name,
          surname,
          postcode,
          orgName,
          dob
        }
      }),
      invalidatesTags: ["Auth"]
    }),
    updateEmail: builder.mutation({
      query: ({ email }) => ({
        url: "/user/edit/email",
        method: "PUT",
        body: {
          email
        }
      }),
      invalidatesTags: ["Auth"]
    }),
    deleteAccount: builder.query({
      query: () => ({
        url: "/user/delete/account",
        method: "DELETE"
      }),
    }),
    getAllFriends: builder.query({
      query: () => ({
        url: "/user/friends",
        method: "GET"
      }),
    }),
    getEventParticipants: builder.query({
      query: (eventId) => ({
        url: `/user/participants/${eventId}`,
        method: "GET"
      }),
    }),
    /************************************************** Event APIs *********************************************************** */
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
    getOwnPublicEvents: builder.query({
      query: ({ filter, userId }) => {
        let queryString = '';

        if (filter) {
          Object.keys(filter).forEach((key) => {
            const value = filter[key];
            if (value) {
              queryString += `${key}=${value}&`;
            }
          });
        }

        return `/event/own/public/${userId}?${queryString}`;
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
    updateEventStatus: builder.mutation({
      query: ({ eventId, status }) => ({
        url: `/event/status/${eventId}`,
        method: "PUT",
        body: {
          eventStatus: status
        }
      }),
      invalidatesTags: ["EventUpdate"]
    }),
    cancelEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `/event/cancel/${eventId}`,
        method: "POST",
      }),
      invalidatesTags: ["EventUpdate"]
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, event }) => ({
        url: `/event/${eventId}`,
        method: "PUT",
        body: event
      }),
      invalidatesTags: ["EventUpdate"]
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
    /****************************************************** Invitatio APIs************************************************* */

    sendInvitation: builder.mutation({
      query: ({ eventId, userId }) => ({
        url: '/invitation/send',
        method: 'POST',
        body: {
          eventId,
          recipientId: userId
        }
      }),
      invalidatesTags: ["Users"]
    }),
    getAllSendParticipants: builder.query({
      query: (eventId) => ({
        url: `/invitation/sent/${eventId}`,
        method: "GET"
      }),
      providesTags: ["Users"]
    }),
    getAllInvitations: builder.query({
      query: () => ({
        url: `/invitation`,
        method: "GET"
      }),
      providesTags: ["Invitation"]
    }),
    getAllSentInvitations: builder.query({
      query: () => ({
        url: `/invitation/sent`,
        method: "GET"
      }),
      providesTags: ["Invitation"]
    }),
    getAllReceivedInvitations: builder.query({
      query: () => ({
        url: `/invitation/received`,
        method: "GET"
      }),
      providesTags: ["Invitation"]
    }),
    acceptInvitations: builder.mutation({
      query: ({ invitationId }) => ({
        url: `/invitation/accept/${invitationId}`,
        method: "POST"
      }),
      invalidatesTags: ["Invitation"]
    }),
    rejectInvitations: builder.mutation({
      query: ({ invitationId }) => ({
        url: `/invitation/reject/${invitationId}`,
        method: "POST"
      }),
      invalidatesTags: ["Invitation"]
    }),
    /************************************************************* Connection APIs ************************************************************** */
    sendConnectionRequest: builder.mutation({
      query: ({ recipientId }) => ({
        url: `/connection/send/${recipientId}`,
        method: 'POST',
      })
    }),
    getAllConnectionRequest: builder.query({
      query: () => ({
        url: `/connection`,
        method: "GET"
      }),
      providesTags: ["Connection"]
    }),
    getConnectionExist: builder.query({
      query: (recipientId) => ({
        url: `/connection/exist/${recipientId}`,
        method: "GET"
      }),
      providesTags: ["Connection"]
    }),
    acceptConnectionRequest: builder.mutation({
      query: ({ connectionId }) => ({
        url: `/connection/accept/${connectionId}`,
        method: "POST"
      }),
      invalidatesTags: ["Connection"]
    }),
    rejectConnectionRequest: builder.mutation({
      query: ({ connectionId }) => ({
        url: `/connection/reject/${connectionId}`,
        method: "POST"
      }),
      invalidatesTags: ["Connection"]
    }),
    /************************************************* Avatar API ******************************************************** */
    getAllAvatars: builder.query({
      query: () => ({
        url: "/avatar",
        method: "GET"
      })
    }),
    /************************************************ Payment APIs *********************************************** */
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
    createOrder: builder.mutation({
      query: ({ session, userId }) => ({
        url: `/payment/orders/${userId}`,
        method: 'POST',
        body: {
          session
        }
      })
    }),
    /************************************************ Chat APIs *********************************************** */
    sendMessage: builder.mutation({
      query: ({ chatId, text }) => ({
        url: `/message`,
        method: 'POST',
        body: {
          chatId,
          text
        }
      }),
      invalidatesTags: ["Message", "Chat"]
    }),
    getMessage: builder.query({
      query: (chatId) => ({
        url: `/message/${chatId}`,
        method: 'GET',
      }),
      providesTags: ["Message"]
    }),
    getUserChats: builder.query({
      query: () => ({
        url: `/chat`,
        method: 'GET',
      }),
      providesTags: ["Chat"]
    }),
    createChat: builder.mutation({
      query: ({ secondId }) => ({
        url: `/chat/${secondId}`,
        method: 'POST',
      }),
      invalidatesTags: ["Chat"],
    }),
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,

  useGetUserQuery,
  useGetAllNotificationQuery,
  useGetAllUserQuery,
  useGetSavedEventsQuery,
  useGetLikedEventsQuery,
  useReadNotificationMutation,
  useUpdateAvatarMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useUpdateEmailMutation,
  useDeleteAccountMutation,
  useGetAllFriendsQuery,
  useGetEventParticipantsQuery,
  useGetUserByIdQuery,

  useGetAllEventsQuery,
  useSaveEventMutation,
  useLikeEventMutation,
  useGetAllOwnEventsQuery,
  useGetFullEventQuery,
  useCreateEventMutation,
  useUpdateEventStatusMutation,
  useGetOwnPublicEventsQuery,
  useCancelEventMutation,
  useUpdateEventMutation,

  useGetAllSendParticipantsQuery,
  useSendInvitationMutation,
  useGetAllInvitationsQuery,
  useGetAllSentInvitationsQuery,
  useGetAllReceivedInvitationsQuery,
  useAcceptInvitationsMutation,
  useRejectInvitationsMutation,

  useSendConnectionRequestMutation,
  useGetAllConnectionRequestQuery,
  useAcceptConnectionRequestMutation,
  useRejectConnectionRequestMutation,
  useGetConnectionExistQuery,

  useGetAllAvatarsQuery,

  useCreateCheckoutSessionMutation,
  useSessionStatusMutation,
  useCreateOrderMutation,

  useSendMessageMutation,
  useGetMessageQuery,
  useGetUserChatsQuery,
  useCreateChatMutation
} = api;
