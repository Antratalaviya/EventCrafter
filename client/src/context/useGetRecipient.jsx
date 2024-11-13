import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../api/api";

export function useGetRecipient(chat, user) {
    const [recipient, setRecipient] = useState();

    const recipientId = chat.sender === user._id ? chat.receiver : chat.sender

    const { data: recipientUser, isSuccess } = useGetUserByIdQuery(recipientId, { skip: !recipientId })

    useEffect(() => {
        if (isSuccess) {
            setRecipient(recipientUser.data);
        }
    }, [recipientId, recipientUser]);

    return recipient;
}