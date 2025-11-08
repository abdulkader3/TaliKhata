import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <>

    <div className="w-full px-2 flex justify-end">
            <Link to="/add-customer" className="inline-block">
              <button className="flex items-center gap-2 px-5 bg-red-600 text-white py-3 rounded-full font-medium text-xs">
                <IoPersonAddSharp className="text-[20px]" />
                
              </button>
            </Link>
          </div>
      
    </>
  )
}

export default Button
