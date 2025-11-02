import React, { useState } from 'react'
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
      <nav className="fixed bottom-2 left-0 w-full">
        <div className="max-w-screen-xl mx-auto px-4">

          <div className="flex justify-around items-center h-16 text-3xl text-white ">

            <Link to="/" className="flex flex-col items-center">
              
              <FaBook />
              <span className="text-xs mt-1">Home</span>
            </Link>

            <Link to="/inbox" className="flex flex-col items-center">
              <FaInbox />
              <span className="text-xs mt-1">Inbox</span>
            </Link>

            <Link to="/wallet" className="flex flex-col items-center">
              <GiWallet />
              <span className="text-xs mt-1">Wallet</span>
            </Link>

            <Link to="/profile" className="flex flex-col items-center">
              <FaBars />
              <span className="text-xs mt-1">Menu</span>
            </Link>

          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar
