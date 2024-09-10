"use client"
import { useState,useEffect } from 'react'
import Link from 'next/link'
import useUserStore from '@/lib/store'
import toast from 'react-hot-toast'

const LinkCss = "text-blue-500 text-md font-bold";

const NavBar = () => {

  
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  // const [admin,setAdmin] = useState(null);
  
  const handleLogout = () => {
    setUser(null);
    toast.success("LogOut successfull");
  }
  
  // useEffect(() => {
  //    setUser(user);
  // },[handleLogout])


  return (
    <nav className="flexBetween px-8 py-6">
      <Link href="/" className="text-blue-500 text-lg font-bold">The rivaaz</Link>


      {
        user ? (
          <div className={`flexCenter gap-x-6 ${LinkCss}`}>
            <Link href="/allproducts">All Products</Link>
            <Link href="/addproduct">Add Product</Link>
            <button  onClick={() => handleLogout()}>LogOut</button>
          </div>) : (
          <div className={`flexCenter gap-x-6 ${LinkCss}`}>
            <Link  href="/">Login</Link>
          </div>)
      }

    </nav>
  )
}

export default NavBar