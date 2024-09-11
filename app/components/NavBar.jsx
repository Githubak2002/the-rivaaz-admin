"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("LogOut successfull");
    router.push("/");
  };

  const isAdmin = user?.emailAddresses.some(
    (email) => email.emailAddress === adminEmail
  );

  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className=" text-lg font-semibold">
          Rivaaz
        </Link>
        <div className="space-x-4">
          {!user ? (
            <Link href="/sign-in" className="">
              SignIn
            </Link>
          ) : (
            <>
              {isAdmin ? (
                <main className="flexCenter gap-x-5 ">
                  <Link href="/addproduct" className="">
                    Add Product
                  </Link>
                  <Link href="/allproducts" className="">
                    All Products
                  </Link>
                  <button onClick={handleLogout} className="">
                    Logout
                  </button>
                </main>
              ) : (
                <button onClick={handleLogout} className="">
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
