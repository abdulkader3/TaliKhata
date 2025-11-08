import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const UserProfiles = () => {
  return (
    <>
    <div className="px-2 py-1 rounded-full shadow">
        <button className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img className="w-full h-full" src="photos/boy.png" alt="profile" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Al Amin</h2>

              {/* <p className="text-xs text-gray-500"> 1.15 (B.T.) </p> */}
            </div>
          </div>
          <div className="text-gray-600">
            <IoIosArrowDown />
          </div>
        </button>
      </div>
      
    </>
  )
}

export default UserProfiles
