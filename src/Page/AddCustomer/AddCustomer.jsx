import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, addSupplier } from '../../Slice/ClintData'

const AddCustomer = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    containerName: '',
    image: null
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.containerName) {
      alert('Please enter a container name')
      return
    }

    const data = {
      name: formData.name,
      mobile: formData.mobile,
      type: userType,
      image: formData.image
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
    setFormData({ name: '', mobile: '', containerName: '', image: null })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Handle suggestions for containerName
    if (name === 'containerName') {
      const newSuggestions = getContainerSuggestions(value)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">নতুন কাস্টমার/সাপ্লায়ার</h1>
      </div>

      {/* User Type Selection */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-4">
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
              className={`px-6 py-2 rounded-lg cursor-pointer transition-all duration-200
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
              className={`px-6 py-2 rounded-lg cursor-pointer transition-all duration-200
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
            className={`flex items-center gap-2 px-4 py-2 ${formData.image ? 'bg-green-50' : 'bg-gray-100'} rounded-lg relative`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke={formData.image ? 'rgb(22 163 74)' : 'currentColor'} 
              className="w-6 h-6"
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

      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-lg font-medium">ফেসবুক থেকে যোগ করি</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block mb-1">কনটেইনার নাম</label>
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
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Enter container name"
              autoComplete="off"
            />
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
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
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            নিশ্চিত
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCustomer
