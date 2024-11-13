import React, { useEffect, useRef, useState } from 'react'
import { AddCircleIcon, EmojiIcon, LinkIcon, SendMsgIcon } from '../../assets/svg/Icon'
import Input from '../Input';
import InputEmoji from "react-input-emoji";
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../api/api';

function MessageFooter() {
    // const fileInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const user = useSelector((state) => state.auth.userData);
    const recipient = useSelector((state) => state.chat.currentRecipient);
    const socketConnection = useSelector((state) => state.chat.socketConnection);

    async function handleOnEnter() {
        try {
            if (socketConnection) {
                socketConnection.emit("newMessage", ({
                    sender: user._id,
                    receiver: recipient._id,
                    text,
                    image
                }))
            }
            setText("");
            setImage("");
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='bg-[#161C23]/85 flex items-center gap-5 p-3 xl:p-5 w-full'>
            <label htmlFor='imageFile' className="flex bg-white/5 rounded-xl p-2">
                <AddCircleIcon className="fill-white stroke-[#161C23] stroke-2" />
            </label>
            <input
                type="file"
                name='imgFile'
                id='imageFile'
                onChange={(e) => console.log(e.target.files[0])}
                className='hidden'
            />
            <div className='bg-[#252A30] rounded-lg border border-gray w-full flex items-center pr-3 py-0'>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type Something.."
                    background='#ffffff00'
                    borderRadius={0}
                    borderColor='#ffffff00'
                    color='white'
                    fontFamily='Plus Jakarta Sans'
                    fontSize={14}
                />
                {/* <LinkIcon className="-rotate-45" fill="#9697a1" /> */}
            </div>
            {/* <Input
                placeholder="Type Something.."
                className="flex items-center flex-grow gap-5 px-3"
            >
                <LinkIcon className="-rotate-45" fill="#9697a1" />
                <EmojiIcon onClick={() => setOpen(!open)} />
                <EmojiPicker
                    open={open}
                />
            </Input> */}
            <div
                className="flex bg-primary rounded-md p-2"
                onClick={handleOnEnter}
            >
                <SendMsgIcon fill="white" />
            </div>
        </div>
    )
}

export default MessageFooter