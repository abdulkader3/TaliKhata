import React from 'react';
import { Link } from 'react-router-dom';
import { IoCashOutline, IoQrCode } from "react-icons/io5";
import { MdLibraryBooks, MdOutlineCloudUpload } from "react-icons/md";
import { GiCash, GiPayMoney } from "react-icons/gi";
import { FaPhone } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const quickActionData = [
  {
    id: 1,
    title: "স্মার্ট ব্যাংকিং",
    path: "/smart-banking",
    icon: MdLibraryBooks,
    bgColor: "bg-green-100"
  },
  {
    id: 2,
    title: "ক্যাশ হিসাব",
    path: "/cash-account",
    icon: IoCashOutline,
    bgColor: "bg-red-100"
  },
  {
    id: 3,
    title: "পেমেন্ট",
    path: "/payment",
    icon: GiPayMoney,
    bgColor: "bg-orange-100"
  },
  {
    id: 4,
    title: "কুইক ডায়াল",
    path: "/quick-dial",
    icon: FaPhone,
    bgColor: "bg-green-100"
  },
  {
    id: 5,
    title: "সুপার QR",
    path: "/super-qr",
    icon: IoQrCode,
    bgColor: "bg-gray-100"
  },
  {
    id: 6,
    title: "ডাটা ব্যাকআপ",
    path: "/data-backup",
    icon: MdOutlineCloudUpload,
    bgColor: "bg-green-100"
  },
  {
    id: 7,
    title: "টালি-মেসেজ",
    path: "/messages",
    icon: TiMessages,
    bgColor: "bg-blue-100"
  },
  {
    id: 8,
    title: "ক্যাপসলক",
    path: "/cash-box",
    icon: GiCash,
    bgColor: "bg-purple-100"
  }
];

const QuickActionButton = ({ title, path, Icon, bgColor }) => (
  <Link to={path} className="p-1.5 rounded-lg shadow text-center w-[72px]">
    <div className={`w-8 h-8 mx-auto mb-1 ${bgColor} rounded-full flex items-center justify-center`}>
      <Icon className="text-base" />
    </div>
    <span className="text-[10px] font-medium block w-full text-center whitespace-nowrap overflow-hidden text-ellipsis px-0.5">{title}</span>
  </Link>
);

const QuickActions = () => {
  const firstRow = quickActionData.slice(0, 4);
  const secondRow = quickActionData.slice(4);

  return (
    <div className="mt-1 px-2">
      <div className="flex justify-between gap-1 mb-1">
        {firstRow.map((action) => (
          <QuickActionButton
            key={action.id}
            title={action.title}
            path={action.path}
            Icon={action.icon}
            bgColor={action.bgColor}
          />
        ))}
      </div>
      <div className="flex justify-between gap-1">
        {secondRow.map((action) => (
          <QuickActionButton
            key={action.id}
            title={action.title}
            path={action.path}
            Icon={action.icon}
            bgColor={action.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;