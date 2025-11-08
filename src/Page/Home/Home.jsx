import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfiles from "../UserProfiles/UserProfiles.jsx";
import Button from "../Ui/Button.jsx";
import { useDispatch } from "react-redux";
import QuickActions from "../../Components/QuickActions.jsx";
import { useSelector } from "react-redux";
import { checkForDueNotifications } from "../../Slice/NotificationSlice";

const Home = () => {
  // Get data from Redux store
  const clientData = useSelector((state) => {
    console.log("Redux State:", state);
    return state.customerSupplier;
  });
  const { customers, suppliers } = clientData;
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  // Check for notifications every minute
  useEffect(() => {
    const checkNotifications = () => {
      dispatch(checkForDueNotifications({ customers, suppliers }));
    };

    // Check immediately
    checkNotifications();

    // Then check every minute
    const interval = setInterval(checkNotifications, 60000);

    return () => clearInterval(interval);
  }, [dispatch, customers, suppliers]);

  console.log("Customers:", customers);
  console.log("Suppliers:", suppliers);

  // Function to get payment status and color
  const getPaymentStatus = (returnDate, returnTime) => {
    if (!returnDate || !returnTime) return { color: 'bg-[#ffffff4d]', status: 'normal' };
    
    const dueDate = new Date(returnDate + 'T' + returnTime);
    const now = new Date();
    const timeDiff = dueDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (timeDiff < 0) {
      return { color: 'bg-red-200', status: 'overdue' };
    } else if (hoursDiff <= 24) {
      return { color: 'bg-yellow-100', status: 'due-soon' };
    }
    return { color: 'bg-[#ffffff4d]', status: 'normal' };
  };

  // Combine and format all clients data
  const allClients = useMemo(() => {
    const clientList = [];

    // Process customers
    if (filter === "all" || filter === "customer") {
      Object.values(customers).forEach((container) => {
        // Get all items from this container
        container.items.forEach((customer) => {
          const status = getPaymentStatus(customer.returnDate, customer.returnTime);
          clientList.push({
            ...customer,
            type: "customer",
            paymentStatus: status
          });
        });
      });
    }

    // Process suppliers
    if (filter === "all" || filter === "supplier") {
      Object.values(suppliers).forEach((container) => {
        container.items.forEach((supplier) => {
          const status = getPaymentStatus(supplier.returnDate, supplier.returnTime);
          clientList.push({
            ...supplier,
            type: "supplier",
            paymentStatus: status
          });
        });
      });
    }

    // Sort by payment status: overdue first, then due-soon, then normal
    clientList.sort((a, b) => {
      const statusPriority = { overdue: 0, 'due-soon': 1, normal: 2 };
      return statusPriority[a.paymentStatus.status] - statusPriority[b.paymentStatus.status];
    });

    return clientList;
  }, [customers, suppliers, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#96e0ff] via-[#359eff] to-[#0e22ff] pb-20">
      {/* User Profile Header */}
      <UserProfiles />
      {/* User Profile Header */}

      {/* Quick Actions Grid */}
      <QuickActions />

      {/* Customer / সাপ্লায়ার  Count */}

      <div className="mt-2 px-2 flex justify-center w-full items-center">
        <div className="w-full flex justify-center items-center p-1 rounded-lg shadow">
          <div className="w-full flex justify-center items-center text-center">
            <div className="text-xs text-gray-600 flex justify-center gap-2 items-center w-full">
              <button
                onClick={() => setFilter("customer")}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  filter === "customer"
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
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
                onClick={() => setFilter("supplier")}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  filter === "supplier"
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
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
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
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
      <div className="mt-1 px-2 relative">
        <div className="shadow rounded-lg h-[250px]">
          {/* This section will be used for displaying additional data */}
          <div className="p-2 h-full overflow-y-auto flex flex-col gap-2">
            {allClients.map((client, index) => (
              <div
                key={index}
                className={`row flex gap-2 items-center ${client.paymentStatus.color} rounded-lg p-2 relative`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      client.image ||
                      (client.type === "customer"
                        ? "/photos/boy.png"
                        : "/photos/woman.png")
                    }
                    alt={client.name}
                  />
                </div>

                <div className="flex-1">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-gray-600">
                    {client.containerName} • ৳{client.borrowedAmount || 0}
                  </div>
                </div>

                {client.returnDate && client.returnTime && (
                  <div className="text-right">
                    <div className="text-xs font-medium">
                      {new Date(client.returnDate + 'T' + client.returnTime).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(client.returnDate + 'T' + client.returnTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )}

                {client.paymentStatus.status === 'overdue' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
                {client.paymentStatus.status === 'due-soon' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />
                )}
              </div>
            ))}

            {allClients.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No customers or suppliers added yet
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Space for Additional Data */}

      {/* Add New Customer/Supplier Button */}
      <div className="absolute bottom-18 right-0">
        <Button />
      </div>
      {/* Add New Customer/Supplier Button */}
    </div>
  );
};

export default Home;
