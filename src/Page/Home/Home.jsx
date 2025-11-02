import React, { useMemo, useState } from "react";
import { IoCashOutline, IoPersonAddSharp, IoQrCode } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserProfiles from "../UserProfiles/UserProfiles.jsx";
import Button from "../Ui/Button.jsx";
import { MdLibraryBooks, MdOutlineCloudUpload } from "react-icons/md";
import { GiCash, GiPayMoney } from "react-icons/gi";
import { FaPhone, FaPhoneVolume } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux';

const Home = () => {
  // Get data from Redux store
  const clientData = useSelector(state => {
    console.log('Redux State:', state);
    return state.customerSupplier
  });
  const { customers, suppliers } = clientData;
  const [filter, setFilter] = useState('all');

  console.log('Customers:', customers);
  console.log('Suppliers:', suppliers);

  // Combine and format all clients data
  const allClients = useMemo(() => {
    const clientList = [];
    
    // Process customers
    if (filter === 'all' || filter === 'customer') {
      Object.values(customers).forEach(container => {
        // Get all items from this container
        container.items.forEach(customer => {
          clientList.push({
            ...customer,  // This includes name, mobile, containerName, id, etc.
            type: 'customer'
          });
        });
      });
    }

    // Process suppliers
    if (filter === 'all' || filter === 'supplier') {
      Object.values(suppliers).forEach(container => {
        container.items.forEach(supplier => {
          clientList.push({
            ...supplier,  // This includes name, mobile, containerName, id, etc.
            type: 'supplier'
          });
        });
      });
    }

    return clientList;
  }, [customers, suppliers, filter]);
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
        <div className="w-full flex justify-center items-center p-2 rounded-lg shadow">
          <div className="w-full flex justify-center items-center text-center">
            <div className="text-sm text-gray-600 flex justify-center gap-4 items-center w-full">
              <button
                onClick={() => setFilter('customer')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'customer' 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                কাস্টমার{" "}
                <span className="ml-1 px-2 py-1 bg-white bg-opacity-20 rounded">
                  {Object.values(customers).reduce(
                    (total, container) => total + container.items.length,
                    0
                  )}
                </span>
              </button>
              <button
                onClick={() => setFilter('supplier')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'supplier' 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                সাপ্লায়ার{" "}
                <span className="ml-1 px-2 py-1 bg-white bg-opacity-20 rounded">
                  {Object.values(suppliers).reduce(
                    (total, container) => total + container.items.length,
                    0
                  )}
                </span>
              </button>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  সব দেখুন
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer / সাপ্লায়ার  Count */}

      {/* Space for Additional Data */}
      <div className="mt-1 px-4 relative">
        <div className="shadow rounded-lg h-[290px]">
          {/* This section will be used for displaying additional data */}
          <div className="p-4 h-full overflow-y-auto flex flex-col gap-4">
            {allClients.map((client, index) => (
              <div key={index} className="row flex gap-5 items-center bg-[#ffffff4d] rounded-full p-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={client.image || (client.type === 'customer' ? '/photos/boy.png' : '/photos/woman.png')}
                    alt={client.name}
                  />
                </div>

                <div className="flex-1">{client.name}</div>
                
                <div className="text-sm opacity-75">
                  {client.containerName}
                </div>
              </div>
            ))}

            {allClients.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No customers or suppliers added yet
              </div>
            )}
          </div>

          {/* Add New Customer/Supplier Button */}
          <div className="absolute bottom-5 right-0">
            <Button />
          </div>
          {/* Add New Customer/Supplier Button */}
        </div>
      </div>
      {/* Space for Additional Data */}
    </div>
  );
};

export default Home;
