import React from "react";
import { img } from "../../assets/assets";
import { DropDownIcon, LocationIcon } from "../../assets/svg/Icon";

function SponserEventCard({ src, add }) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div
          style={{
            backgroundImage: `linear-gradient(
             180deg,
             rgba(0, 0, 0, .8) 0%,
             rgba(255, 255, 255,.1) 100%
         ),url('${src}')`,
          }}
          className="w-full h-full bg-cover bg-no-repeat rounded-lg bg"
        >
          <div className="flex flex-col w-full h-full justify-between py-2">
            <div className="flex w-2/3 items-center px-2">
              <div className="px-3 py-1 flex flex-col flex-wrap items-center justify-center text-white text-sm rounded-full bg-black">
                30
                <p className="text-[.5rem] leading-3">Mar</p>
              </div>
              <p className="text-white p-2">Introductory Design workshop</p>
            </div>
            <div className="flex items-center justify-around">
              <div className='flex items-center gap-x-1 rounded-full text-sm text-black bg-white py-1 px-2'>
                <LocationIcon fill="black" className="w-4 h-4" />
                <p className="text-[12px] font-semibold text-icon-bg">{add.substring(0,16)}...</p>
              </div>
              <div className="relative flex">
                <div className="rounded-full overflow-hidden w-7 h-7 border border-white">
                  <img src={img.p1} alt="profile1" />
                </div>
                <div className="rounded-full overflow-hidden w-7 h-7 border border-white -translate-x-3 z-10">
                  <img src={img.p2} alt="profile1" />
                </div>
                <div className="rounded-full overflow-hidden w-7 h-7 bg-black text-white flex justify-center items-center border border-white -translate-x-6 z-10">
                  <p>3k</p>
                </div>
              </div>
              <div className="rounded-full overflow-hidden w-7 h-7 bg-white flex items-center justify-center">
                <DropDownIcon className="w-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SponserEventCard;
