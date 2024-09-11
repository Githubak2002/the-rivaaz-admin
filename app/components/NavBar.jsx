// "use client"
// import { useState,useEffect } from 'react';
// import Link from 'next/link';
// // import useUserStore from '@/lib/store'
// import toast from 'react-hot-toast'

// import { useAuth } from '@clerk/nextjs'
// import { useClerk } from '@clerk/nextjs'

// const LinkCss = "text-blue-500 text-md font-bold";

// const NavBar = () => {

//   const { isLoaded, userId, sessionId, getToken } = useAuth();
//   const auth = useAuth();
//   const { signOut } = useClerk()

//   const handleLogout = () => {
//     // setUser(null);
//     signOut({ redirectUrl: '/sign-in' })
//     toast.success("LogOut successfull");
//   }

//   return (
//     <nav className="flexBetween px-8 py-2 ">
//       <Link href="/" className="text-blue-500 text-lg font-bold">The rivaaz</Link>

//       {
//         userId ? (
//           <div className={`flexCenter gap-x-6 ${LinkCss}`}>
//             <Link href="/allproducts">All Products</Link>
//             <Link href="/addproduct">Add Product</Link>
//             <button  onClick={() => handleLogout()}>LogOut</button>
//           </div>) : (
//           <div className={`flexCenter gap-x-6 ${LinkCss}`}>
//             <Link  href="/sign-in">LogIn</Link>
//           </div>)
//       }

//     </nav>
//   )
// }

// export default NavBar

"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const isAdmin = user?.emailAddresses.some(
    (email) => email.emailAddress === adminEmail
  );

  return (
    <nav className="bg-gray-800 p-4">

      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold">
          MyApp
        </Link>
        <div className="space-x-4">
          {!user ? (
            <Link href="/sign-in" className="text-white">
              Login
            </Link>
          ) : (
            <>
              {isAdmin ? (
                <main>
                  <Link href="/addproduct" className="text-white">
                    Add Product
                  </Link>
                  <Link href="/allproducts" className="text-white">
                    All Products
                  </Link>
                </main>
              ) : (
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              )}
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
