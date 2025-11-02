import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <>

    <div className="w-full px-4 flex justify-end">
            <Link to="/add-customer" className="inline-block">
              <button className="flex items-center gap-5 px-5 bg-red-600 text-white py-3 rounded-full font-medium text-sm">
                <IoPersonAddSharp className="text-[30px]" />
                <span>নতুন কাস্টমার / সাপ্লায়ার</span>
              </button>
            </Link>
          </div>
      
    </>
  )
}

export default Button
