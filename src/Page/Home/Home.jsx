import React from "react";
import { IoCashOutline, IoPersonAddSharp, IoQrCode } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserProfiles from "../UserProfiles/UserProfiles.jsx";
import Button from "../Ui/Button.jsx";
import { MdLibraryBooks, MdOutlineCloudUpload } from "react-icons/md";
import { GiCash, GiPayMoney } from "react-icons/gi";
import { FaPhone, FaPhoneVolume } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 pb-20">
      {/* User Profile Header */}
      <UserProfiles />
      {/* User Profile Header */}

      {/* Quick Actions Grid */}
      <div className="mt-2 px-4">
        <div className=" flex justify-between ">
          {/* Smart Banking */}
          <Link
            to="/smart-banking"
            className=" p-2 rounded-lg shadow text-center"
          >
            <div className="w-8 h-8 mx-auto mb-1 bg-green-100 rounded-full flex items-center justify-center">
              <MdLibraryBooks />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">
              স্মার্ট ব্যাংকিং
            </span>
          </Link>

          {/* Cash Account */}
          <Link
            to="/cash-account"
            className=" p-2 rounded-lg shadow text-center"
          >
            <div className="w-8 h-8 mx-auto mb-1 bg-red-100 rounded-full flex items-center justify-center">
              <IoCashOutline />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">
              ক্যাশ হিসাব
            </span>
          </Link>

          {/* Payment */}
          <Link to="/payment" className=" p-2 rounded-lg shadow text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-orange-100 rounded-full flex items-center justify-center">
              <GiPayMoney />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">পেমেন্ট</span>
          </Link>

          {/* Quick Dial */}
          <Link to="/quick-dial" className=" p-2 rounded-lg shadow text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-green-100 rounded-full flex items-center justify-center">
              <FaPhone />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">
              কুইক ডায়াল
            </span>
          </Link>
        </div>

        {/* Second Row Grid */}
        <div className="flex justify-between">
          {/* Super QR */}
          <Link to="/super-qr" className=" p-2 rounded-lg shadow text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded-full flex items-center justify-center">
              <IoQrCode />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">সুপার QR</span>
          </Link>

          {/* Data Backup */}
          <Link
            to="/data-backup"
            className=" p-2 rounded-lg shadow text-center"
          >
            <div className="w-8 h-8 mx-auto mb-1 bg-green-100 rounded-full flex items-center justify-center">
              <MdOutlineCloudUpload />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">
              ডাটা ব্যাকআপ
            </span>
          </Link>

          {/* Message */}
          <Link to="/messages" className=" p-2 rounded-lg shadow text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-blue-100 rounded-full flex items-center justify-center">
              <TiMessages />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">
              টালি-মেসেজ
            </span>
          </Link>

          {/* Capslock */}
          <Link to="/cash-box" className=" p-2 rounded-lg shadow text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-purple-100 rounded-full flex items-center justify-center">
              <GiCash />
            </div>
            <span className=" text-[9px] font-medium shrink-0 ">ক্যাপসলক</span>
          </Link>
        </div>
      </div>

      {/* Customer / সাপ্লায়ার  Count */}

      <div className="mt-4 px-4 flex justify-center w-full items-center ">
        <div className=" w-full flex justify-center items-center p-2 rounded-lg shadow">
          <div className=" w-full flex justify-center items-center text-center">
            <p className="text-sm text-gray-600 flex justify-center gap-10 items-center w-full">
              <Link to={"/add-customer"}>
                {" "}
                Add কাস্টমার <span> 0 </span>{" "}
              </Link>
              <Link to={"/add-customer"}>
                {" "}
                Add সাপ্লায়ার <span> 0 </span>{" "}
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Customer / সাপ্লায়ার  Count */}

      {/* Space for Additional Data */}
      <div className="mt-1 px-4 relative">
        <div className=" shadow rounded-lg  h-[290px]">
          {/* This section will be used for displaying additional data */}

          <div className="p-4 h-full overflow-y-auto flex flex-col gap-10">
            {/* Additional data will be rendered here */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/boy.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}

            {/* row */}
            <div className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full ">
              {/* image */}
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="photos/woman.png"
                  alt="profile"
                />
              </div>

              {/* image */}

              <div className="">Abdul Kader</div>

              <div className="amount flex gap-5">
                <span className="text-red-300">00.00TK</span>
                <span className="text-green-300">00.00TK</span>
              </div>
            </div>
            {/* row */}
          </div>

          {/* Add New Customer/Supplier Button */}
          <div className=" absolute bottom-5 right-0 ">
            {" "}
            <Button />
            {" "}
          </div>
          {/* Add New Customer/Supplier Button */}

        </div>
      </div>
      {/* Space for Additional Data */}
    </div>
  );
};

export default Home;
