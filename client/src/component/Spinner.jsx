import React from 'react'
import { img } from '../assets/assets'
import { twMerge } from 'tailwind-merge'

function Spinner({ className }) {
    return (
        <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible space-y-10">
            {/* <div className="flex justify-center">
                    <div className="w-16 h-16 border-4 border-primary
                  border-t-transperent rounded-full 
                  animate-spin">
                    </div>
                </div> */}
            <div className="flex justify-center space-x-5">
                <div
                    className="w-4 h-4 bg-primary rounded-full animate-bounce-slow"
                    style={{ animationDelay: '0s' }}
                ></div>
                <div
                    className="w-4 h-4 bg-primary rounded-full animate-bounce-slow"
                    style={{ animationDelay: '0.15s' }}
                ></div>
                <div
                    className="w-4 h-4 bg-primary rounded-full animate-bounce-slow"
                    style={{ animationDelay: '0.3s' }}
                ></div>
                <div
                    className="w-4 h-4 bg-primary rounded-full animate-bounce-slow"
                    style={{ animationDelay: '0.45s' }}
                ></div>
            </div>


        </div>

    )
}

export default Spinner