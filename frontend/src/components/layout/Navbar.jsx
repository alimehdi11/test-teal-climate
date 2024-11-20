import React, { useState } from 'react'
import Logo from '../ui/Logo'
import { deleteToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';

const Navbar = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();
 const handleLogout = () => {
    deleteToken();
    navigate("/");
  };

  if (isConfirm) {
    handleLogout();
  }


  return (
    <div className='flex justify-between p-5'>
          <Logo />
          <button className='font-semibold border-tc-green border rounded-full px-10 py-1' onClick={()=>setIsModalOpen(true)}>Log out</button>
        <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsConfirm={setIsConfirm}
        message="Are you sure you want to logout?"
      />
    </div>
  )
}

export default Navbar
