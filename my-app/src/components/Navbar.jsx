'use client'
import { UserAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";


const NavBar = () => {
  const {user, googleSignIn, logOut} = UserAuth()
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    }
    catch (error){
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    }
    catch (error){
      console.log(error)
    }
  }

  useEffect (() => {
    const checkAuthentication  = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false)
    };
    checkAuthentication()
  }, [user]);
    
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">name</div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/order" className="text-white hover:text-gray-300">Order</a>
            </li>
            <li>
              <a href="/announcement" className="text-white hover:text-gray-300">Announcement</a>
            </li>
            <li>
              <a href="/profile" className="text-white hover:text-gray-300">profile</a>
            </li>
          </ul>

          {loading ? null :   !user ? (<ul className="flex space-x-4">
            <li onClick={handleSignIn} className="text-white p-2 cursor-pointer">
              Login
            </li>
            <li onClick={handleSignIn} className="text-white p-2 cursor-pointer">
              sign up
            </li>
          </ul>) :
            <div>
              <p>Welcome {user.displayName}</p>
              <p  className = "text-white p-2 cursor-pointer" onClick={handleSignOut}>Sign Out</p>
            </div>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;