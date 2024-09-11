"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
// import useUserStore from "@/lib/store";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuth } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'


export default function Home() {

  const { userId } = useAuth();

  // if (userId) {
  //   console.log("user_id → ",userId);
  // }

  const { isLoaded, isSignedIn, user } = useUser()
  // console.log("User details → ",user);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const user = useUserStore((state) => state.user);
  // const setUser = useUserStore((state) => state.setUser);
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     toast.success("User logged in successfully", {
  //       position: "bottom-center",
  //       className: "text-xs"
  //     });
  //     navigate("/profile");
  //   } catch (error) {
  //     toast.error(error.message, { position: "bottom-center", className: "text-xs" });
  //     // console.error("Login error:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <section className="flexCenter flex-col h-[80vh]">
      {/* <h2>Main page</h2> */}

      <section className="mx-auto px-4 flex flex-col gap-6 sm:text-4xl text-2xl font-bold">


        <h2>Style with Rivaaz</h2>
        {/* <p>The Rivaaz</p> */}
        <Link href="/sign-in" className="sm:text-xl text-lg text-blue-500">Sign In →</Link>
        {/* 
        <main className="sm:min-w-[340px] min-w-full shadow-2xl py-6 px-10 border-2 border-gray-300 mt-[5vh] rounded-xl font-bold text-sm">
          <form 
          onSubmit={handleSubmit}
          >
            <h3 className="text-center text-2xl pb-5 font-semibold text-blue-400">
              Login
            </h3>

            <div className="flex flex-col gap-y-3">
              <input
                type="email"
                className="border p-2 rounded-lg h-9"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-y-3 mt-4">
              <input
                type="password"
                className="border p-2 rounded-lg h-9"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`border border-black bg-blue-400 rounded-lg p-2 mt-4 mx-auto w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Continue"}
            </button>

          
          </form>
        </main>
         */}

      </section>
    </section>
  );
}
