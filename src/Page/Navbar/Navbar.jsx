import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaBars, FaBook, FaInbox } from 'react-icons/fa'
import { GiWallet } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="fixed bottom-2 left-0 w-full bg-white rounded-full shadow-2xl ">
        
        <div className="max-w-screen-xl mx-auto px-4">

          <div className="flex justify-around items-center h-12 text-2xl text-white">

            <Link to="/" className="flex flex-col items-center text-black w-16">
              <FaBook className="text-2xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>

            <Link to="/inbox" className="flex flex-col items-center text-black w-16 relative">
              <div className="relative">
                <FaInbox className="text-2xl" />
                {useSelector(state => state.notifications?.unreadCount > 0) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
              <span className="text-xs mt-1">Inbox</span>
            </Link>

            <Link to="/wallet" className="flex flex-col items-center text-black w-16">
              <GiWallet className="text-2xl" />
              <span className="text-xs mt-1">Wallet</span>
            </Link>

            <Link to="/profile" className="flex flex-col items-center text-black w-16">
              <FaBars className="text-2xl" />
              <span className="text-xs mt-1">Menu</span>
            </Link>

          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar
