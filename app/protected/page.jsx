"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/lib/store';

const Page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user); // Correctly fetch user from the Zustand store

  useEffect(() => {
    console.log("User email: ", user);
    if (user === null) {
      router.push('/'); 
    }
  }, [user, router]);

  if (user === null) {
    return <div className=" h-screen flexCenter">Loading...</div>; 
  }

  return (
    <div>
      Protected content goes here
    </div>
  );
};

export default Page;
