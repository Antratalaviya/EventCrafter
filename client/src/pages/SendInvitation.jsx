import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Invitation from '../component/Invitation/Invitation';
import Spinner from '../component/Spinner';

function SendInvitation() {
    const { eventId } = useParams();

    if (!eventId) {
        return <Spinner />
    }

    return (
        <div className='overflow-x-hidden h-screen'>
            <Invitation
                eventId={eventId}
            />
        </div>
    )
}

export default SendInvitation