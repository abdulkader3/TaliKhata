import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, addSupplier } from '../../Slice/ClintData'

const AddCustomer = () => {
  const dispatch = useDispatch()
  
  // Convert YYYY-MM-DD to DD-MM-YYYY for display
  const toDisplayFormat = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  // Convert DD-MM-YYYY to YYYY-MM-DD for storage
  const toStorageFormat = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  // Get current date in DD-MM-YYYY format
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Initialize state with current date in display format
  const [displayDate, setDisplayDate] = useState(getCurrentDate());

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    containerName: '',
    image: null,
    borrowedAmount: '',
    returnDate: toStorageFormat(getCurrentDate()), // Convert display format to storage format
    returnTime: getCurrentTime(),
    note: ''
  })
  const [userType, setUserType] = useState('customer')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const fileInputRef = React.useRef()

  // Get all containers from Redux store
  const customerContainers = useSelector(state => state.customerSupplier.customers)
  const supplierContainers = useSelector(state => state.customerSupplier.suppliers)

  // Get unique container names based on userType
  const getContainerSuggestions = (input) => {
    const containers = userType === 'customer' ? customerContainers : supplierContainers
    const containerNames = Object.keys(containers)
    
    if (!input) return containerNames

    return containerNames.filter(name => 
      name.toLowerCase().includes(input.toLowerCase())
    )
  }

  // Update suggestions when userType changes
  useEffect(() => {
    // Clear container name when switching types
    setFormData(prev => ({ ...prev, containerName: '' }))
    setSuggestions(getContainerSuggestions(''))
  }, [userType])

  // Normalize date to ISO format regardless of input format
  const normalizeDateAndTime = (date, time) => {
    if (!date || !time) return { normalizedDate: null, normalizedTime: null };
    
    try {
      // Create a date object from the input
      const dateObj = new Date(date + 'T' + time);
      
      // Format date as YYYY-MM-DD
      const normalizedDate = dateObj.toISOString().split('T')[0];
      
      // Format time as HH:mm
      const normalizedTime = dateObj.toTimeString().slice(0, 5);
      
      return { normalizedDate, normalizedTime };
    } catch (error) {
      console.error('Date normalization failed:', error);
      return { normalizedDate: null, normalizedTime: null };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.containerName) {
      alert('Please enter a container name')
      return
    }

    // Normalize the date and time
    const { normalizedDate, normalizedTime } = normalizeDateAndTime(
      formData.returnDate,
      formData.returnTime
    );

    const data = {
      name: formData.name,
      mobile: formData.mobile,
      type: userType,
      image: formData.image,
      borrowedAmount: parseFloat(formData.borrowedAmount) || 0,
      returnDate: normalizedDate,
      returnTime: normalizedTime,
      note: formData.note || ''
    }
    
    // Dispatch to Redux store based on user type with container name
    if (userType === 'customer') {
      dispatch(addCustomer({
        containerName: formData.containerName,
        data
      }))
    } else {
      dispatch(addSupplier({
        containerName: formData.containerName,
        data
      }))
    }
    
    // Reset form
    setFormData({
      name: '',
      mobile: '',
      containerName: '',
      image: null,
      borrowedAmount: '',
      returnDate: getCurrentDate(),
      returnTime: getCurrentTime(),
      note: ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for date inputs to ensure consistent format
    if (name === 'returnDate') {
      const formattedDate = formatInputDate(value)
      setFormData(prev => ({
        ...prev,
        [name]: formattedDate || value // fallback to original value if formatting fails
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Handle suggestions for containerName
    if (name === 'containerName') {
      const newSuggestions = getContainerSuggestions(value)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-2 pb-16 min-w-[320px]">
      {/* Header */}
      <div className="flex items-center mb-3">
        <Link to="/" className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold">নতুন কাস্টমার/সাপ্লায়ার</h1>
      </div>

      {/* User Type Selection */}
      <div className="flex gap-2 mb-4">
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="radio"
              id="customer"
              name="userType"
              value="customer"
              checked={userType === 'customer'}
              onChange={(e) => setUserType(e.target.value)}
              className="sr-only peer"
            />
            <label
              htmlFor="customer"
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 text-sm
                ${userType === 'customer' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
            >
              Customer
            </label>
          </div>
          <div className="relative">
            <input
              type="radio"
              id="supplier"
              name="userType"
              value="supplier"
              checked={userType === 'supplier'}
              onChange={(e) => setUserType(e.target.value)}
              className="sr-only peer"
            />
            <label
              htmlFor="supplier"
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 text-sm
                ${userType === 'supplier' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
            >
              Supplier
            </label>
          </div>
        </div>
        <div className="ml-auto relative">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // Convert image to base64 string for storage
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData(prev => ({
                    ...prev,
                    image: reader.result
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center gap-1 px-2 py-1.5 ${formData.image ? 'bg-green-50' : 'bg-gray-100'} rounded-lg relative`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke={formData.image ? 'rgb(22 163 74)' : 'currentColor'} 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </button>
          {formData.image && (
            <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img 
                src={formData.image} 
                alt="Selected"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="text-center mb-3">
          {/* <h2 className="text-base font-medium">ফেসবুক থেকে যোগ করি</h2> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <label className="block mb-1"> Business name </label>
            <input
              type="text"
              name="containerName"
              value={formData.containerName}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow click events
                setTimeout(() => setShowSuggestions(false), 200)
              }}
              className="w-full px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Enter container name"
              autoComplete="off"
            />
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, containerName: suggestion }))
                      setShowSuggestions(false)
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1">নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">মোবাইল নম্বর</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Borrowed Amount (টাকা)</label>
            <input
              type="number"
              name="borrowedAmount"
              value={formData.borrowedAmount}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter amount"
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1">Promise Return Date & Time</label>
            <div className="flex gap-2">
              <input
                type="text" // Changed to text input for custom format
                name="returnDate"
                placeholder="DD-MM-YYYY"
                value={displayDate}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  console.log('Input date:', inputValue);
                  
                  // Allow typing of numbers and hyphens only
                  if (!/^[\d-]*$/.test(inputValue)) return;
                  
                  setDisplayDate(inputValue);
                  
                  // If we have a complete date
                  if (inputValue.split('-').length === 3) {
                    const storageFormat = toStorageFormat(inputValue);
                    console.log('Storage format:', storageFormat);
                    
                    setFormData(prev => ({
                      ...prev,
                      returnDate: storageFormat
                    }));
                  }
                }}
                onBlur={(e) => {
                  // Format on blur for consistency
                  const parts = e.target.value.split(/[-/.]/).filter(p => p);
                  if (parts.length === 3) {
                    const day = parts[0].padStart(2, '0');
                    const month = parts[1].padStart(2, '0');
                    const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
                    const formattedDisplay = `${day}-${month}-${year}`;
                    setDisplayDate(formattedDisplay);
                    
                    // Update storage format
                    const storageFormat = `${year}-${month}-${day}`;
                    setFormData(prev => ({
                      ...prev,
                      returnDate: storageFormat
                    }));
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="time"
                name="returnTime"
                value={formData.returnTime}
                onChange={handleChange}
                className="w-32 px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Note (Optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Add any additional notes"
              rows="2"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-2 text-sm rounded-lg hover:bg-red-700 transition duration-200"
          >
            নিশ্চিত
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCustomer
