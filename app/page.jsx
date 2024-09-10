"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import useUserStore from "@/lib/store";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ email, password }),
      });
      //  Parse the JSON response
      const data = await response.json();
      // console.log("response data → ", data);
      if (data.success) {
        setUser(email);
        router.push('/protected');
        toast.success("Login successfull!");
        setEmail("");
        setPassword("");
        // console.log("Login successful:", data.msg);
      }
      else {
        setEmail("");
        setPassword("");
        toast.error(`Login failed: ${data.msg}`)
        // console.log("Login failed:", data.msg);
      }
    }
    catch(err){
      // toast.error(err);
      console.log("error → ",err);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <section className="flexCenter flex-col h-[80vh]">
      {/* <h2>Main page</h2> */}
      <Link href="/protected" className=" text-blue-500">
        protected route
      </Link>

      <section className="mx-auto px-4 flexCenter flex-col gap-6">
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

        {/* <div className="text-sm text-[#9f9f9f] flex flex-col gap-2">
          <h2>Email → ok@ c.com</h2>
          <h2>Password → 123</h2>
        </div> */}

      </section>
    </section>
  );
}
