import React from 'react'
import { SecurityModeIcon } from '../../assets/svg/Icon'

function SecurityMode() {
  return (
    <div className='flex flex-col items-center justify-center p-5'>
      <SecurityModeIcon />
      <p className='text-white'>Security Mood</p>
    </div>
  )
}

export default SecurityMode
