'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/hooks/useCheckAdmin';


const Page = () => {
  const isUserAdmin = isAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isUserAdmin) {
      router.push('/'); 
    } 
  }, [isUserAdmin, router]); // Add dependencies to ensure useEffect runs when isUserAdmin changes

  if (!isUserAdmin) {
    return <section className="flexCenter h-[80vh]">Access Denied.</section>; 
  }

  return (
    <section className="min-h-[80vh] flexCenter">
      <h2 className="text-center py-8">All products</h2>
    </section>
  );
};

export default Page;
