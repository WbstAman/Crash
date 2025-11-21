import React from 'react'
 import CustomWallet from '../CustomWallet/CustomWallet'
import { IoSearchSharp } from 'react-icons/io5'
import { FaBell, FaUser } from 'react-icons/fa'
import profile from '../../assets/images/profile.jpg'
import CustomButton from '../UI/Buttons/CustomButton'

const Header = () => {
  return (
    <header className="px-4 py-3 flex items-center justify-between">
       
       <div className="flex justify-between items-center gap-2 max-w-[342px] w-full">
          <CustomButton title="Casino" onClick={()=>{}} size="200" />
          <CustomButton title="Sports" onClick={()=>{}} size="200" variant="primary" />
       </div>

       <div className="flex justify-between items-center gap-2 max-w-[342px] w-full">
            <CustomWallet/>
       </div>

       <div className="flex justify-between items-center gap-2 max-w-[188px] w-full">
            <div className="flex justify-between items-center w-full">
               <IoSearchSharp className="text-gray-dark text-[30px] cursor-pointer" />
               <FaUser className="text-gray-dark text-[30px] cursor-pointer" />
               <FaBell className="text-gray-dark text-[30px] cursor-pointer" />
            </div>

            <div className="border-l border-gray-light pl-4">
                  <img src={profile} alt={profile} className="w-[40px] h-auto  rounded-full object-cover" />
            </div>   

       </div>

       

    </header>  )
}

export default Header